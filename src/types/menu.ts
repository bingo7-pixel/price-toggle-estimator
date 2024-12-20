export interface Ingredient {
  name: string;
  price: number;
  category: string;
  priceUnit: 'pound' | 'piece';
}

export interface PriceConfig {
  basePrice: number;
  adjustedPrice: number;
  quantity: number;
  weight: number;
  priceUnit: 'pound' | 'piece';
}