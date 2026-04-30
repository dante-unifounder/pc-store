import fs from 'fs';
import path from 'path';

export interface InventoryItem {
  id: number;
  category: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  description?: string;
}

/**
 * Main entry point — called by the AI tool at runtime.
 *
 * Priority:
 *  1. Google Sheets API  (when GOOGLE_SHEET_ID + GOOGLE_SHEETS_API_KEY are set)
 *  2. Local JSON mock    (data/inventory.json — fallback / development)
 *
 * Items with stock = 0 are ALWAYS filtered here.
 * The AI agent never sees out-of-stock products.
 *
 * Google Sheet layout (row 1 = headers, data from row 2):
 *   A: id | B: category | C: name | D: brand | E: price | F: stock | G: description
 */
export async function getInventoryFromSource(): Promise<InventoryItem[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (sheetId && apiKey) {
    try {
      return await fetchFromGoogleSheets(sheetId, apiKey);
    } catch (err) {
      console.error('[PCBot] Google Sheets fetch failed — falling back to local JSON:', err);
    }
  }

  return readLocalJSON();
}

async function fetchFromGoogleSheets(
  sheetId: string,
  apiKey: string,
): Promise<InventoryItem[]> {
  const range = encodeURIComponent('Sheet1!A2:G');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Sheets API responded ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const rows: string[][] = json.values ?? [];

  return rows
    .filter((row) => row.length >= 6)
    .map((row, i) => ({
      id:          parseInt(row[0], 10) || i + 1,
      category:    row[1]?.trim() ?? '',
      name:        row[2]?.trim() ?? '',
      brand:       row[3]?.trim() ?? '',
      price:       parseFloat(row[4])   || 0,
      stock:       parseInt(row[5], 10) || 0,
      description: row[6]?.trim() ?? '',
    }))
    .filter((item) => item.name && item.stock > 0);
}

function readLocalJSON(): InventoryItem[] {
  const filePath = path.join(process.cwd(), 'data', 'inventory.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const all: InventoryItem[] = JSON.parse(raw);
  return all.filter((item) => item.stock > 0);
}

export function getAvailableInventory(): InventoryItem[] {
  return readLocalJSON();
}

export function formatInventoryForPrompt(items: InventoryItem[]): string {
  const byCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  let text = '';
  for (const [category, categoryItems] of Object.entries(byCategory)) {
    text += `\n### ${category}\n`;
    for (const item of categoryItems) {
      text += `- ${item.brand} ${item.name}: $${item.price.toFixed(2)} USD | Stock: ${item.stock} uds. | ${item.description ?? ''}\n`;
    }
  }
  return text;
}