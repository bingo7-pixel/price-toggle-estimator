import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PriceConfig } from '@/types/menu';

interface PriceConfigProps {
  config: PriceConfig;
  onConfigChange: (key: keyof PriceConfig, value: number | string) => void;
}

export const PriceConfigComponent = ({ config, onConfigChange }: PriceConfigProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label>Price Unit</Label>
        <Select 
          value={config.priceUnit} 
          onValueChange={(value: 'pound' | 'piece') => onConfigChange('priceUnit', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select price unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pound">Per Pound</SelectItem>
            <SelectItem value="piece">Per Piece</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Quantity ({config.priceUnit === 'pound' ? 'number of weighted items' : 'pieces'})</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[config.quantity]}
            onValueChange={(value) => onConfigChange('quantity', value[0])}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={config.quantity}
            onChange={(e) => onConfigChange('quantity', Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      {config.priceUnit === 'pound' && (
        <div>
          <Label>Weight (pounds)</Label>
          <Input
            type="number"
            value={config.weight}
            onChange={(e) => onConfigChange('weight', Number(e.target.value))}
            step="0.1"
            className="input-focus"
          />
        </div>
      )}

      <div>
        <Label>Base Price (per {config.priceUnit})</Label>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">${config.basePrice}</span>
          <Input
            type="number"
            value={config.adjustedPrice}
            onChange={(e) => onConfigChange('adjustedPrice', Number(e.target.value))}
            className="input-focus"
            placeholder="Adjust price"
          />
        </div>
      </div>
    </div>
  );
};