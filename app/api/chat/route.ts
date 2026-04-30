import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { getInventoryFromSource, formatInventoryForPrompt } from '@/lib/inventory';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { messages } = await req.json();

  let inventoryBlock = 'Sin productos disponibles.';
  let inventoryStatus = '';

  try {
    const items = await getInventoryFromSource();
    if (items.length === 0) {
      inventoryStatus =
        process.env.GOOGLE_SHEET_ID
          ? '⚠️ Google Sheet vacío. Fila 1 debe tener: id | category | name | brand | price | stock | description'
          : '⚠️ Inventario local vacío.';
    } else {
      inventoryBlock = formatInventoryForPrompt(items);
      inventoryStatus = `✅ ${items.length} productos en stock`;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    inventoryStatus = `❌ Error inventario: ${msg}`;
  }

  const result = streamText({
    model: google('gemini-3.1-pro-preview'),

    system: `Eres PCBot, el configurador de PCs de TechPC Store.
Tu único objetivo: armar la mejor PC posible con los componentes del inventario y mostrar un **invoice** (presupuesto detallado).

## INVENTARIO DISPONIBLE (stock > 0)
${inventoryStatus}
${inventoryBlock}

## COMPORTAMIENTO — SEGUÍ ESTO ESTRICTAMENTE

**Si el usuario especifica componentes, uso o presupuesto** → armá la PC INMEDIATAMENTE y mostrá el invoice sin preguntar más.

**Si el mensaje es completamente vago** (ej: "quiero una PC") → hacé exactamente UNA pregunta: "¿Para qué la usarás y cuál es tu presupuesto en USD?" — y en la próxima respuesta mostrá el invoice directo.

**Nunca** escribás más de 1 oración antes del invoice.
**Nunca** uses elogios, marketing ni relleno.
**Siempre** completá todos los componentes para que la PC funcione.

## FORMATO DEL INVOICE — SIEMPRE usá exactamente este formato

---
### 🖥️ [Descripción del build en 4 palabras]

| Componente | Modelo | Precio |
|---|---|---|
| CPU | [brand + name] | $X.XX |
| GPU | [brand + name] | $X.XX |
| Placa Base | [brand + name] | $X.XX |
| RAM | [brand + name] | $X.XX |
| Almacenamiento | [brand + name] | $X.XX |
| Fuente | [brand + name] | $X.XX |
| Gabinete | [brand + name] | $X.XX |
| Cooler | [brand + name] | $X.XX |
| **TOTAL** | | **$X,XXX.XX** |

✅ Todos los componentes en stock · Compatible garantizado

---

Si hay que omitir un componente porque no hay stock, indicálo en la tabla con "Sin stock disponible".

## REGLAS DE COMPATIBILIDAD
- Intel 14th Gen (i5/i7/i9-14xxx) → socket LGA1700 → placa Z790 o B760 → RAM DDR5
- AMD Ryzen 7000 (7xxxX) → socket AM5 → placa B650 o X670 → RAM DDR5
- PSU mínima: TDP CPU + TDP GPU + 150W. Con RTX 4090 + i9 usar RM1000x.
- Si el usuario pide "el más barato" de un componente → elegí el de menor precio en stock de esa categoría.
- Si el usuario pide "el mejor" → elegí el de mayor precio/rendimiento en stock.

## CAMBIOS Y AJUSTES
Si el usuario pide modificar la build → mostrá el invoice completo actualizado con el cambio aplicado.`,

    messages,

    tools: {
      getInventory: tool({
        description: 'Refresca el inventario desde Google Sheets. Usar si el usuario pregunta por stock actualizado.',
        parameters: z.object({
          category: z.string().optional().describe('Categoría a filtrar. Omitir para todo.'),
        }),
        execute: async ({ category }) => {
          try {
            const items = await getInventoryFromSource();
            const filtered = category
              ? items.filter(i =>
                  i.category.toLowerCase().includes(category.toLowerCase()) ||
                  i.name.toLowerCase().includes(category.toLowerCase()),
                )
              : items;
            return { success: true, total: filtered.length, items: filtered };
          } catch (err) {
            return { success: false, error: err instanceof Error ? err.message : String(err), items: [] };
          }
        },
      }),
    },

    maxSteps: 3,
  });

  return result.toDataStreamResponse();
}
