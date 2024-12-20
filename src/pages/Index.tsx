import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { IngredientSelector } from '@/components/menu/IngredientSelector';
import { PriceConfigComponent } from '@/components/menu/PriceConfig';
import type { Ingredient, PriceConfig } from '@/types/menu';

const initialIngredients: Ingredient[] = [
  { 
    name: 'Ground Beef', 
    price: 5.99, 
    category: 'Protein', 
    priceUnit: 'pound',
    nutrition: { calories: 250, protein: 26, carbs: 0, fat: 15 }
  },
  { 
    name: 'Chicken Breast', 
    price: 4.99, 
    category: 'Protein', 
    priceUnit: 'pound',
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }
  },
  { 
    name: 'Mozzarella', 
    price: 6.99, 
    category: 'Cheese', 
    priceUnit: 'pound',
    nutrition: { calories: 280, protein: 22, carbs: 2, fat: 22 }
  },
  { 
    name: 'Fresh Tomatoes', 
    price: 2.99, 
    category: 'Vegetables', 
    priceUnit: 'pound',
    nutrition: { calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2 }
  },
  { 
    name: 'Italian Sausage', 
    price: 7.99, 
    category: 'Protein', 
    priceUnit: 'piece',
    nutrition: { calories: 260, protein: 14, carbs: 1, fat: 22 }
  },
  { 
    name: 'Bell Peppers', 
    price: 3.99, 
    category: 'Vegetables', 
    priceUnit: 'piece',
    nutrition: { calories: 30, protein: 1, carbs: 7, fat: 0.2 }
  },
];

const Index = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [priceConfig, setPriceConfig] = useState<PriceConfig>({
    basePrice: 7.99,
    adjustedPrice: 7.99,
    quantity: 1,
    weight: 0.1,
    priceUnit: 'pound'
  });

  const handleIngredientSelect = (ingredient: Ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handlePriceConfigChange = (key: keyof PriceConfig, value: number | string) => {
    setPriceConfig(prev => ({ ...prev, [key]: value }));
  };

  const calculateTotalPrice = () => {
    const { adjustedPrice, quantity, weight, priceUnit } = priceConfig;
    if (priceUnit === 'piece') {
      return (adjustedPrice * quantity).toFixed(2);
    }
    return (adjustedPrice * weight * quantity).toFixed(2);
  };

  const calculateTotalNutrition = () => {
    return selectedIngredients.reduce((total, ingredient) => {
      const multiplier = priceConfig.priceUnit === 'pound' ? priceConfig.weight : 1;
      return {
        calories: total.calories + ingredient.nutrition.calories * multiplier,
        protein: total.protein + ingredient.nutrition.protein * multiplier,
        carbs: total.carbs + ingredient.nutrition.carbs * multiplier,
        fat: total.fat + ingredient.nutrition.fat * multiplier
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Create New Menu Item
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a new item to your menu with custom ingredients and pricing
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 glass-card">
            <div className="space-y-6">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="input-focus"
                  placeholder="Enter item name"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-focus"
                  placeholder="Enter item description"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-focus"
                  placeholder="Enter category"
                />
              </div>

              <IngredientSelector
                ingredients={initialIngredients}
                selectedIngredients={selectedIngredients}
                onIngredientSelect={handleIngredientSelect}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filter={filter}
                onFilterChange={setFilter}
              />
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  Item Summary
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-secondary/50">
                    Ingredients
                  </Badge>
                  {selectedIngredients.length === 0 && (
                    <span className="text-muted-foreground">No ingredients selected</span>
                  )}
                  {selectedIngredients.map((ing) => (
                    <Badge 
                      key={ing.name} 
                      variant="outline"
                      className="bg-secondary/30 border-border/50"
                    >
                      {ing.name}
                    </Badge>
                  ))}
                </div>

                <div className="mb-6 p-4 rounded-lg bg-secondary/20 border border-border/50">
                  <h3 className="text-lg font-semibold mb-3 text-primary/90">Nutrition Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(calculateTotalNutrition()).map(([nutrient, value]) => (
                      <div key={nutrient} className="flex justify-between items-center">
                        <span className="capitalize text-muted-foreground">{nutrient}</span>
                        <span className="font-semibold">
                          {Math.round(value)}
                          {nutrient === 'calories' ? ' kcal' : 'g'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <PriceConfigComponent
                config={priceConfig}
                onConfigChange={handlePriceConfigChange}
              />

              <div className="pt-4 border-t border-border/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-primary/90">Total Price</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                    ${calculateTotalPrice()}
                  </span>
                </div>

                <Button 
                  className="w-full h-12 text-lg button-inner bg-primary/10 hover:bg-primary/20 text-primary" 
                  onClick={() => console.log('Saving menu item...')}
                >
                  Save Menu Item
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
