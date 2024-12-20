import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import type { Ingredient } from '@/types/menu';

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  onIngredientSelect: (ingredient: Ingredient) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

export const IngredientSelector = ({
  ingredients,
  selectedIngredients,
  onIngredientSelect,
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}: IngredientSelectorProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      // Debounce resize operations
      requestAnimationFrame(() => {
        entries.forEach(() => {
          if (scrollAreaRef.current) {
            // Force a reflow only when needed
            scrollAreaRef.current.style.minHeight = '0px';
            scrollAreaRef.current.style.minHeight = '';
          }
        });
      });
    });

    if (scrollAreaRef.current) {
      resizeObserver.observe(scrollAreaRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesFilter = filter === 'All' || ingredient.category === filter;
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Label>Select Ingredients</Label>
      <Input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mb-4 input-focus"
        placeholder="Search ingredients..."
      />

      <div className="flex gap-2 mb-4">
        {['All', 'Protein', 'Cheese', 'Vegetables'].map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            onClick={() => onFilterChange(cat)}
            className="button-inner"
          >
            {cat}
          </Button>
        ))}
      </div>

      <ScrollArea ref={scrollAreaRef} className="h-[300px] border rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredIngredients.map((ingredient) => (
            <Button
              key={ingredient.name}
              variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
              onClick={() => onIngredientSelect(ingredient)}
              className="w-full justify-between button-inner"
            >
              <span>{ingredient.name}</span>
              <Badge variant="secondary">
                ${ingredient.price}/{ingredient.priceUnit}
              </Badge>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};