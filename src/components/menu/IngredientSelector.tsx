import React, { useEffect, useRef, useCallback } from 'react';
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
  const resizeTimeoutRef = useRef<number>();

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      window.cancelAnimationFrame(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = window.requestAnimationFrame(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.style.height = '300px';
      }
    });
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);

    if (scrollAreaRef.current) {
      resizeObserver.observe(scrollAreaRef.current);
    }

    return () => {
      if (resizeTimeoutRef.current) {
        window.cancelAnimationFrame(resizeTimeoutRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [handleResize]);

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesFilter = filter === 'All' || ingredient.category === filter;
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Label className="text-primary/90">Select Ingredients</Label>
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
            className={`button-inner ${
              filter === cat 
                ? 'bg-primary/20 text-primary border-primary/30' 
                : 'bg-secondary/50 hover:bg-secondary/80'
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <ScrollArea 
        ref={scrollAreaRef} 
        className="border rounded-lg p-4 border-border/50 bg-secondary/20"
      >
        <div className="grid grid-cols-2 gap-4">
          {filteredIngredients.map((ingredient) => (
            <Button
              key={ingredient.name}
              variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
              onClick={() => onIngredientSelect(ingredient)}
              className={`w-full justify-between button-inner ${
                selectedIngredients.includes(ingredient)
                  ? 'bg-primary/20 text-primary border-primary/30'
                  : 'bg-secondary/50 hover:bg-secondary/80'
              }`}
            >
              <span>{ingredient.name}</span>
              <Badge 
                variant="secondary"
                className="bg-secondary/50 text-primary/90"
              >
                ${ingredient.price}/{ingredient.priceUnit}
              </Badge>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};