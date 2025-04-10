
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

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
          <Alert className="mb-3 bg-blue-50">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-xs text-blue-700">
              The price tag is a placeholder to help you position the image. It will not appear in the final asset. The price information will be placed by Rohlik Group internal team.
            </AlertDescription>
          </Alert>
          
          <p className="text-xs text-gray-500 mb-1">
            Drag the price tag to position it on the right side of the asset.
          </p>
          
          <div className="flex items-center p-2 bg-gray-100 rounded mb-2">
            <Label className="text-sm font-medium mr-2">Price Display:</Label>
            <span className="text-sm">{priceValue ? `${priceValue} Kč` : '99 Kč'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceTagControls;
