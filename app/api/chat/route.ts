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

## REGLA CRÍTICA — INVENTARIO EN TIEMPO REAL
Tenés acceso a la herramienta \`getInventory\` que lee el stock actual directamente desde Google Sheets.
SIEMPRE llamá \`getInventory\` antes de hacer cualquier recomendación de productos o precios.
Nunca inventes productos ni precios. Solo podés recomendar lo que el inventario te devuelva.
SIEMPRE generá una respuesta de texto al usuario después de llamar \`getInventory\`, nunca dejes la conversación vacía.

## MANEJO DE ERRORES DEL INVENTARIO
Si \`getInventory\` devuelve un error o inventario vacío:
- Informá al usuario que hubo un problema cargando el inventario
- Indicá si el sheet puede estar vacío o mal configurado
- Igual podés darle consejos generales sobre armado de PC

## MANEJO DE INVENTARIO VACÍO DEL SHEET
Si el sheet está vacío, decile al usuario:
"Parece que el Google Sheet aún no tiene productos cargados. Para agregar productos, el Sheet debe tener en la fila 1 los títulos: id | category | name | brand | price | stock | description, y los productos desde la fila 2."

## FLUJO DE CONVERSACIÓN

**Primera interacción:**
- Saludá al cliente de forma amigable
- Preguntá para qué usará la PC (gaming, diseño, edición de video, oficina, etc.)
- Preguntá su presupuesto aproximado en USD

**Al recomendar componentes:**
1. Llamá \`getInventory\` para obtener el catálogo actualizado
2. Verificá compatibilidades:
   - Intel 14th Gen → socket LGA1700 → placas Z790/B760
   - AMD Ryzen 7000 → socket AM5 → placas B650/X670
   - Z790/B650 → solo DDR5
   - PSU: TDP CPU + GPU + 150W margen
3. Mostrá precio parcial mientras construís la build
4. Desglose final con TOTAL

**Si el usuario pregunta qué hay en stock:**
Llamá \`getInventory\` sin filtro de categoría y mostrá el catálogo completo organizado por categoría.`,

    messages,

    tools: {
      getInventory: tool({
        description:
          'Obtiene el inventario disponible de TechPC Store en tiempo real desde Google Sheets. ' +
          'Solo devuelve productos con stock > 0. Llamar SIEMPRE antes de recomendar productos. ' +
          'También usar cuando el usuario pregunta qué hay disponible o quiere explorar el catálogo.',

        parameters: z.object({
          category: z
            .string()
            .optional()
            .describe(
              'Filtrar por categoría. Ej: "Procesadores", "Tarjetas de Video", "Memoria RAM", ' +
              '"Almacenamiento", "Placas Base", "Fuente de Poder", "Gabinete", "Refrigeración". ' +
              'Omitir para obtener todo el catálogo completo.',
            ),
        }),

        execute: async ({ category }) => {
          let items: Awaited<ReturnType<typeof getInventoryFromSource>> = [];
          let source = 'unknown';
          let fetchError: string | null = null;

          try {
            items = await getInventoryFromSource();
            source = process.env.GOOGLE_SHEET_ID ? 'google_sheets' : 'local_json';
          } catch (err) {
            fetchError = err instanceof Error ? err.message : String(err);
            source = 'error';
          }

          if (!fetchError && items.length === 0) {
            return {
              success: false,
              source,
              error: 'El inventario está vacío.',
              hint:
                process.env.GOOGLE_SHEET_ID
                  ? 'El Google Sheet parece estar vacío o sin el formato correcto. ' +
                    'Aseguráte de que la fila 1 tenga los títulos: id | category | name | brand | price | stock | description, ' +
                    'y que los productos estén desde la fila 2 en adelante.'
                  : 'El archivo de inventario local no tiene productos.',
              total: 0,
              items: [],
            };
          }

          if (fetchError) {
            return {
              success: false,
              source,
              error: `Error al leer el inventario: ${fetchError}`,
              hint:
                process.env.GOOGLE_SHEET_ID
                  ? 'Verificá que: (1) el Sheet sea público, (2) el GOOGLE_SHEETS_API_KEY tenga permisos de Google Sheets API, ' +
                    '(3) el GOOGLE_SHEET_ID sea correcto.'
                  : 'Error leyendo el archivo de inventario local.',
              total: 0,
              items: [],
            };
          }

          const filtered = category
            ? items.filter(
                (item) =>
                  item.category.toLowerCase().includes(category.toLowerCase()) ||
                  item.name.toLowerCase().includes(category.toLowerCase()),
              )
            : items;

          const byCategory = filtered.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
          }, {} as Record<string, typeof filtered>);

          return {
            success: true,
            source,
            total: filtered.length,
            categories: Object.keys(byCategory),
            items: filtered,
            byCategory,
          };
        },
      }),
    },

    maxSteps: 5,
  });

  return result.toDataStreamResponse();
}
