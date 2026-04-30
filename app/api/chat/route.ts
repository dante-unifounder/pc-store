import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { getInventoryFromSource } from '@/lib/inventory';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-3.1-pro-preview'),

    system: `Eres PCBot, el asesor virtual experto de TechPC Store. Tu misión es ayudar a cada cliente a armar la computadora perfecta para sus necesidades y presupuesto.

## REGLA PRINCIPAL — INVENTARIO EN TIEMPO REAL
Tenés acceso a la herramienta \`getInventory\` que lee el stock actual directamente desde Google Sheets.
SIEMPRE llamá \`getInventory\` antes de hacer cualquier recomendación de productos o precios.
Nunca inventes productos ni precios. Solo podés recomendar lo que el inventario te devuelva.

## FLUJO DE CONVERSACIÓN

**Primera interacción:**
- Saludá al cliente de forma amigable
- Preguntá para qué usará la PC (gaming competitivo, gaming AAA, diseño gráfico, edición de video 4K, streaming, trabajo de oficina, programación)
- Preguntá su presupuesto aproximado en USD

**Al recomendar componentes:**
1. Llamá \`getInventory\` para obtener el catálogo actualizado
2. Verificá compatibilidades críticas:
   - CPUs Intel 14th Gen (i5/i7/i9-14xxx) → socket LGA1700 → placas Z790 o B760
   - CPUs AMD Ryzen 7000 (7xxxX) → socket AM5 → placas B650 o X670
   - Placas Z790/B650 → solo DDR5 (no DDR4)
   - PSU: TDP de CPU + GPU + 150W de margen mínimo
3. Adaptá al uso:
   - Gaming competitivo → CPU rápido + GPU mid-range
   - Gaming AAA / 4K → GPU de alta gama equilibrada con CPU
   - Edición de video / 3D → 64GB RAM + CPU de muchos núcleos + GPU potente
   - Oficina / programación → CPU eficiente + 32GB RAM + SSD rápido
   - Streaming → CPU con muchos núcleos para encodear en simultáneo
4. Mostrá el precio parcial mientras construís la build
5. Si el presupuesto no alcanza, ofrecé la mejor alternativa disponible en el inventario

**Formato de respuesta:**
- Sé conciso pero completo
- Usá listas con precios cuando mostrés configuraciones
- Al terminar una build: mostrá desglose de precios + TOTAL
- Preguntá si quieren ajustar algo`,

    messages,

    tools: {
      getInventory: tool({
        description:
          'Obtiene el inventario disponible de TechPC Store en tiempo real desde Google Sheets. ' +
          'Solo devuelve productos con stock > 0 (los agotados están excluidos automáticamente). ' +
          'SIEMPRE llamar esta herramienta antes de recomendar productos o precios.',

        parameters: z.object({
          category: z
            .string()
            .optional()
            .describe(
              'Filtrar por categoría. Valores: "Procesadores", "Tarjetas de Video", ' +
              '"Memoria RAM", "Almacenamiento", "Placas Base", "Fuente de Poder", ' +
              '"Gabinete", "Refrigeración". Omitir para obtener todo el catálogo.',
            ),
        }),

        execute: async ({ category }) => {
          const items = await getInventoryFromSource();

          if (category) {
            const filtered = items.filter(
              (item) =>
                item.category.toLowerCase().includes(category.toLowerCase()) ||
                item.name.toLowerCase().includes(category.toLowerCase()),
            );
            return {
              source: process.env.GOOGLE_SHEET_ID ? 'google_sheets' : 'local_json',
              total: filtered.length,
              items: filtered,
            };
          }

          return {
            source: process.env.GOOGLE_SHEET_ID ? 'google_sheets' : 'local_json',
            total: items.length,
            items,
          };
        },
      }),
    },

    maxSteps: 5,
  });

  return result.toDataStreamResponse();
}