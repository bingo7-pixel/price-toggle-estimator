import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Ingredient {
  name: string;
  price: number;
  category: string;
}

const ingredients: Ingredient[] = [
  { name: 'Ground Beef', price: 5.99, category: 'Protein' },
  { name: 'Chicken Breast', price: 4.99, category: 'Protein' },
  { name: 'Mozzarella', price: 6.99, category: 'Cheese' },
  { name: 'Fresh Tomatoes', price: 2.99, category: 'Vegetables' },
  { name: 'Italian Sausage', price: 7.99, category: 'Protein' },
  { name: 'Bell Peppers', price: 3.99, category: 'Vegetables' },
];

const Index = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(0.1);
  const [basePrice, setBasePrice] = useState(7.99);
  const [adjustedPrice, setAdjustedPrice] = useState(basePrice);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const calculateTotalPrice = () => {
    return (adjustedPrice * weight * quantity).toFixed(2);
  };

  const handleIngredientSelect = (ingredient: Ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesFilter = filter === 'All' || ingredient.category === filter;
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

              <div>
                <Label>Select Ingredients</Label>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4 input-focus"
                  placeholder="Search ingredients..."
                />

                <div className="flex gap-2 mb-4">
                  {['All', 'Protein', 'Cheese', 'Vegetables'].map((cat) => (
                    <Button
                      key={cat}
                      variant={filter === cat ? "default" : "outline"}
                      onClick={() => setFilter(cat)}
                      className="button-inner"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                <ScrollArea className="h-[300px] border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {filteredIngredients.map((ingredient) => (
                      <Button
                        key={ingredient.name}
                        variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
                        onClick={() => handleIngredientSelect(ingredient)}
                        className="w-full justify-between button-inner"
                      >
                        <span>{ingredient.name}</span>
                        <Badge variant="secondary">${ingredient.price}/lb</Badge>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
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

              <div>
                <Label>Quantity (number of weighted items)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[quantity]}
                    onValueChange={(value) => setQuantity(value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div>
                <Label>Weight (pounds)</Label>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  step="0.1"
                  className="input-focus"
                />
              </div>

              <div>
                <Label>Base Price (per pound)</Label>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-semibold">${basePrice}</span>
                  <Input
                    type="number"
                    value={adjustedPrice}
                    onChange={(e) => setAdjustedPrice(Number(e.target.value))}
                    className="input-focus"
                    placeholder="Adjust price"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total Price</span>
                  <span className="text-2xl font-bold">${calculateTotalPrice()}</span>
                </div>

                <Button className="w-full h-12 text-lg button-inner" onClick={() => console.log('Saving menu item...')}>
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