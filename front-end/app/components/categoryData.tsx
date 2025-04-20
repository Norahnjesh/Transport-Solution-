// frontend/app/components/categoryData.tsx

export type CategoryType = "perishable" | "durable" | "unsure";

export const itemOptions: Record<CategoryType, string[]> = {
  perishable: [
    "Fruits & Vegetables",
    "Dairy",
    "Meat & Fish",
    "Baked Goods",
    "Flowers",
    "Eggs",
    "Juices",
    "Frozen Items",
    "Pharmaceuticals",
  ],
  durable: [
    "Furniture",
    "Electronics",
    "Clothing",
    "Construction Materials",
    "Books",
    "Appliances",
    "Personal Items",
    "Tools",
  ],
  unsure: [],
};
