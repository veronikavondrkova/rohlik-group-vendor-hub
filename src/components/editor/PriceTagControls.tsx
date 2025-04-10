
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface PriceTagControlsProps {
  showPriceTag: boolean;
  setShowPriceTag: (checked: boolean) => void;
  priceValue: string;
  setPriceValue: (value: string) => void;
  priceLabel?: string;
  setPriceLabel?: (label: string) => void;
}

const priceLabelPresets = ['AKCE', 'SLEVA', 'NOVINKA', 'VÝPRODEJ', 'AKČNÍ CENA'];

const PriceTagControls: React.FC<PriceTagControlsProps> = ({
  showPriceTag,
  setShowPriceTag,
  priceValue,
  setPriceValue,
  priceLabel = 'AKCE',
  setPriceLabel = () => {}
}) => {
  const { user } = useUser();
  const isInternal = user?.role === 'internal';

  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <Label htmlFor="show-price" className="text-base font-medium">Show Price Tag:</Label>
        <Checkbox id="show-price" checked={showPriceTag} onCheckedChange={checked => setShowPriceTag(checked === true)} />
      </div>
      
      {showPriceTag && (
        <div>
          <Alert className="mb-3 bg-blue-50">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-xs text-blue-700">
              {isInternal 
                ? "You can customize both the price value and label as an internal user."
                : "The price tag is a placeholder to help you position the image. It will not appear in the final asset. The price information will be placed by Rohlik Group internal team."}
            </AlertDescription>
          </Alert>
          
          <p className="text-xs text-gray-500 mb-1">
            Drag the price tag to position it on the right side of the asset.
          </p>
          
          {/* For all users, show price value input */}
          <div className="mb-4">
            <Label htmlFor="price-value" className="text-sm">Price Value:</Label>
            <Input 
              id="price-value" 
              className="mt-1" 
              value={priceValue} 
              onChange={e => setPriceValue(e.target.value)} 
              placeholder="e.g. 99"
            />
          </div>
          
          {/* Only for internal users, show price label controls */}
          {isInternal && setPriceLabel && (
            <div>
              <Label className="text-sm">Price Label:</Label>
              <div className="grid grid-cols-3 gap-2 mt-1 mb-2">
                {priceLabelPresets.map(preset => (
                  <Button
                    key={preset}
                    type="button"
                    variant={priceLabel === preset ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceLabel(preset)}
                    className="text-xs"
                  >
                    {preset}
                  </Button>
                ))}
              </div>
              
              <Label htmlFor="custom-label" className="text-sm">Custom Label:</Label>
              <Input 
                id="custom-label" 
                className="mt-1" 
                placeholder="Custom label text"
                onChange={e => setPriceLabel(e.target.value)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceTagControls;
