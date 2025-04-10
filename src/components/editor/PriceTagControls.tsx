
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface PriceTagControlsProps {
  showPriceTag: boolean;
  setShowPriceTag: (checked: boolean) => void;
  priceValue: string;
  setPriceValue: (value: string) => void;
}

const PriceTagControls: React.FC<PriceTagControlsProps> = ({
  showPriceTag,
  setShowPriceTag,
  priceValue,
  setPriceValue
}) => {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <Label htmlFor="show-price" className="text-base font-medium">Show Price Tag:</Label>
        <Checkbox
          id="show-price"
          checked={showPriceTag}
          onCheckedChange={(checked) => setShowPriceTag(checked === true)}
        />
      </div>
      
      {showPriceTag && (
        <div>
          <Label htmlFor="price-value">Price Value:</Label>
          <Input 
            id="price-value" 
            value={priceValue} 
            onChange={e => setPriceValue(e.target.value)} 
            placeholder="e.g. 99" 
            className="mt-2" 
          />
          <p className="text-xs text-gray-500 mt-1">
            Drag the price tag to position it on the right side of the asset.
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceTagControls;
