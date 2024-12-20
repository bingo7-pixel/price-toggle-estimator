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
  { name: 'Ground Beef', price: 5.99, category: 'Protein', priceUnit: 'pound' },
  { name: 'Chicken Breast', price: 4.99, category: 'Protein', priceUnit: 'pound' },
  { name: 'Mozzarella', price: 6.99, category: 'Cheese', priceUnit: 'pound' },
  { name: 'Fresh Tomatoes', price: 2.99, category: 'Vegetables', priceUnit: 'pound' },
  { name: 'Italian Sausage', price: 7.99, category: 'Protein', priceUnit: 'piece' },
  { name: 'Bell Peppers', price: 3.99, category: 'Vegetables', priceUnit: 'piece' },
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

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Create New Menu Item</h1>
          <p className="text-muted-foreground mt-2">Add a new item to your menu with custom ingredients and pricing</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 glass-card hover-scale">
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

          <Card className="p-6 glass-card hover-scale">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Item Summary</h2>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">Ingredients</Badge>
                  {selectedIngredients.length === 0 && (
                    <span className="text-muted-foreground">No ingredients selected</span>
                  )}
                  {selectedIngredients.map((ing) => (
                    <Badge key={ing.name} variant="outline">{ing.name}</Badge>
                  ))}
                </div>
              </div>

              <PriceConfigComponent
                config={priceConfig}
                onConfigChange={handlePriceConfigChange}
              />

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total Price</span>
                  <span className="text-2xl font-bold">${calculateTotalPrice()}</span>
                </div>

                <Button 
                  className="w-full h-12 text-lg button-inner" 
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