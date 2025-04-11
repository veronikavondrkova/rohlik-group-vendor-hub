
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PriceTagEditorProps {
  showPriceTag: boolean;
  setShowPriceTag: (show: boolean) => void;
  showPriceLabel: boolean;
  setShowPriceLabel: (show: boolean) => void;
  priceValue: string;
  setPriceValue: (value: string) => void;
  priceLabel: string;
  setPriceLabel: (label: string) => void;
  priceLabelPresets: string[];
}

const PriceTagEditor = ({
  showPriceTag,
  setShowPriceTag,
  showPriceLabel,
  setShowPriceLabel,
  priceValue,
  setPriceValue,
  priceLabel,
  setPriceLabel,
  priceLabelPresets,
}: PriceTagEditorProps) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Price Tag</h3>
          <div className="flex items-center">
            <Label htmlFor="show-price" className="mr-2">Show:</Label>
            <input 
              id="show-price" 
              type="checkbox"
              checked={showPriceTag}
              onChange={(e) => setShowPriceTag(e.target.checked)}
              className="h-4 w-4"
            />
          </div>
        </div>
        
        {showPriceTag && (
          <>
            <div>
              <Label htmlFor="price-value">Price Value:</Label>
              <Input 
                id="price-value" 
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Show Price Label:</Label>
              <input
                type="checkbox"
                checked={showPriceLabel}
                onChange={(e) => setShowPriceLabel(e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            
            {showPriceLabel && (
              <>
                <div>
                  <Label>Price Label:</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {priceLabelPresets.map((preset) => (
                      <Button
                        key={preset}
                        type="button"
                        variant={priceLabel === preset ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPriceLabel(preset)}
                        className="justify-center text-xs"
                      >
                        {preset}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="custom-label">Custom Label:</Label>
                  <Input 
                    id="custom-label" 
                    placeholder="Custom label text"
                    onChange={(e) => setPriceLabel(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceTagEditor;
