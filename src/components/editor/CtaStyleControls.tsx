
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CtaStyleControlsProps {
  ctaStyle: 'default' | 'reverse';
  setCtaStyle: (style: 'default' | 'reverse') => void;
  selectedMarket: string;
}

const CtaStyleControls: React.FC<CtaStyleControlsProps> = ({ 
  ctaStyle, 
  setCtaStyle,
  selectedMarket
}) => {
  const previewColor = selectedMarket === 'cz' || selectedMarket === 'at' || selectedMarket === 'hu' 
    ? 'rohlik' 
    : 'knuspr';

  return (
    <div className="space-y-2">
      <Label htmlFor="cta-style">CTA Button Style:</Label>
      <RadioGroup 
        id="cta-style" 
        value={ctaStyle} 
        onValueChange={(value) => setCtaStyle(value as 'default' | 'reverse')}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="default-style" />
          <Label htmlFor="default-style" className="flex items-center gap-2 cursor-pointer">
            <span>White background / {previewColor === 'rohlik' ? 'Green' : 'Orange'} text</span>
            <span className={`px-2 py-1 text-xs rounded ${previewColor === 'rohlik' ? 'cta-button-cz' : 'cta-button-de'}`}>
              Preview
            </span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="reverse" id="reverse-style" />
          <Label htmlFor="reverse-style" className="flex items-center gap-2 cursor-pointer">
            <span>{previewColor === 'rohlik' ? 'Green' : 'Orange'} background / White text</span>
            <span className={`px-2 py-1 text-xs rounded ${previewColor === 'rohlik' ? 'cta-button-cz-reverse' : 'cta-button-de-reverse'}`}>
              Preview
            </span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default CtaStyleControls;
