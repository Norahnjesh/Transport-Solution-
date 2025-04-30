export type CategoryType = "liquid" | "perishable" | "durable" | "unsure";

export type ItemGroup = {
  label: string;
  items: string[];
};

// Delivery Item Options
export const itemOptions: Record<CategoryType, ItemGroup[]> = {
  perishable: [
    {
      label: "Perishable Items",
      items: [
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
    },
  ],
  durable: [
    {
      label: "Fragile",
      items: [
        "Electronics (Phones, TVs, Laptops)",
        "Glassware / Mirrors",
        "Art / Sculptures",
        "Lab Equipment",
        "Musical Instruments",
      ],
    },
    {
      label: "Non-Fragile",
      items: [
        "Construction Materials",
        "Furniture",
        "Clothing and Shoes",
        "Books & Stationery",
        "Equipment / Machinery",
        "Home Appliances",
        "Personal Items (Suitcases etc.)",
      ],
    },
  ],
  liquid: [
    {
      label: "Beverages",
      items: ["Water", "Milk", "Juice", "Soda"],
    },
    {
      label: "Industrial & Cleaning",
      items: ["Cleaning Products", "Detergents", "Paint", "Chemicals"],
    },
    {
      label: "Fuel & Oils",
      items: ["Fuel", "Oil", "Kerosene"],
    },
  ],
  unsure: [],
};

// Room Types
export const roomTypes: Record<"home" | "office", string[]> = {
    home: [
      "Bedroom",
      "Living Room",
      "Kitchen",
      "Bathroom",
      "Garage",
      "Store", 
      "Workstation",
    ],
    office: [
      "Study / Office",
      "Meeting Room",
      "Reception",
      "Storage",
      "Workstation",
      "Server Room", 
    ],
  };
  
// Floor Numbers (0–10)
export const floorOptions = Array.from({ length: 11 }, (_, i) => i);

// Furniture Options
export const furnitureTypes: Record<"home" | "office", string[]> = {
  home: [
    "Beds",
    "Sofas",
    "Desks",
    "Chairs",
    "Tables",
    "Cabinets",
    "Wardrobes",
    "Bookshelves",
  ],
  office: [
    "Desks",
    "Chairs",
    "Tables",
    "Cabinets",
    "Wardrobes",
    "Bookshelves",
  ],
};

// Appliances
export const applianceOptions = [
  "Fridge",
  "Microwave",
  "Washing Machine",
  "Dishwasher",
  "Television",
];

// Access Options
export const accessOptions = ["Elevator", "Stairs"];

// Notes placeholder
export const relocationNotePlaceholder =
  "e.g., Elevator access only, narrow staircase, fragile items, etc.";
