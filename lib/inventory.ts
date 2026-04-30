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

export function getAvailableInventory(): InventoryItem[] {
  const filePath = path.join(process.cwd(), 'data', 'inventory.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const allItems: InventoryItem[] = JSON.parse(raw);
  return allItems.filter((item) => item.stock > 0);
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
