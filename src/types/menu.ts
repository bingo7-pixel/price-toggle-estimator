export interface Ingredient {
  name: string;
  price: number;
  category: string;
  priceUnit: 'pound' | 'piece';
  nutrition: NutritionInfo;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface PriceConfig {
  basePrice: number;
  adjustedPrice: number;
  quantity: number;
  weight: number;
  priceUnit: 'pound' | 'piece';
}