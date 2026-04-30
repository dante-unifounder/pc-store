import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { getInventoryFromSource, formatInventoryForPrompt } from '@/lib/inventory';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // ── Always pre-fetch inventory and inject into system prompt ──────────────────
  // This guarantees the model ALWAYS has inventory context and ALWAYS responds,
  // even if the getInventory tool call fails or the model skips it.
  let inventoryBlock = '';
  let inventoryStatus = '';

  try {
    const items = await getInventoryFromSource();

    if (items.length === 0) {
      inventoryStatus =
        process.env.GOOGLE_SHEET_ID
          ? '⚠️  El Google Sheet está vacío o sin formato correcto.\n' +
            'La fila 1 debe tener: id | category | name | brand | price | stock | description\n' +
            'Los productos deben estar desde la fila 2 en adelante.'
          : '⚠️  El inventario local (data/inventory.json) está vacío.';
    } else {
      inventoryBlock = formatInventoryForPrompt(items);
      inventoryStatus = `✅ ${items.length} productos disponibles (stock > 0) cargados desde ${
        process.env.GOOGLE_SHEET_ID ? 'Google Sheets' : 'inventario local'
      }.`;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    inventoryStatus =
      `❌ Error al cargar el inventario: ${msg}\n` +
      (process.env.GOOGLE_SHEET_ID
        ? 'Verificá que el Sheet sea público y que GOOGLE_SHEETS_API_KEY tenga Sheets API habilitada.'
        : 'Error leyendo data/inventory.json.');
  }

  const result = streamText({
    model: google('gemini-3.1-pro-preview'),

    system: `Eres PCBot, el asesor virtual experto de TechPC Store. Ayudás a los clientes a armar su PC ideal según necesidades y presupuesto.

## ESTADO DEL INVENTARIO
${inventoryStatus}

## INVENTARIO DISPONIBLE (stock > 0 — datos en tiempo real)
${inventoryBlock || 'Sin productos disponibles.'}

## REGLAS CRÍTICAS
1. SOLO podés recomendar productos que aparezcan en el inventario de arriba.
2. Si el inventario está vacío o con error, informá al usuario claramente con el motivo.
3. SIEMPRE respondé con texto. Nunca dejes la conversación sin respuesta.
4. Podés usar la herramienta \`getInventory\` si necesitás filtrar por categoría o refrescar el stock durante la conversación.

## COMPATIBILIDADES
- Intel 14th Gen (i5/i7/i9-14xxx) → socket LGA1700 → placas Z790 o B760
- AMD Ryzen 7000 (7xxxX) → socket AM5 → placas B650 o X670
- Placas Z790/B650 → solo DDR5
- PSU: TDP CPU + GPU + 150W de margen mínimo

## FLUJO
- Preguntá para qué usará la PC y su presupuesto en USD
- Recomendá componentes compatibles del inventario
- Mostrá precio parcial al ir sumando
- Terminá con desglose + TOTAL

## SI EL USUARIO PREGUNTA QUÉ HAY EN STOCK
Listá todo el inventario de arriba organizado por categoría con precios.`,

    messages,

    tools: {
      getInventory: tool({
        description:
          'Refresca el inventario desde Google Sheets y filtra por categoría. ' +
          'Usar cuando el usuario pide ver una categoría específica o quiere actualizar el stock.',
        parameters: z.object({
          category: z
            .string()
            .optional()
            .describe(
              'Categoría a filtrar: "Procesadores", "Tarjetas de Video", "Memoria RAM", ' +
              '"Almacenamiento", "Placas Base", "Fuente de Poder", "Gabinete", "Refrigeración". ' +
              'Omitir para todo el catálogo.',
            ),
        }),
        execute: async ({ category }) => {
          try {
            const items = await getInventoryFromSource();
            const filtered = category
              ? items.filter(
                  (i) =>
                    i.category.toLowerCase().includes(category.toLowerCase()) ||
                    i.name.toLowerCase().includes(category.toLowerCase()),
                )
              : items;

            return {
              success: true,
              source: process.env.GOOGLE_SHEET_ID ? 'google_sheets' : 'local_json',
              total: filtered.length,
              items: filtered,
            };
          } catch (err) {
            return {
              success: false,
              error: err instanceof Error ? err.message : String(err),
              items: [],
            };
          }
        },
      }),
    },

    maxSteps: 3,
  });

  return result.toDataStreamResponse();
}
