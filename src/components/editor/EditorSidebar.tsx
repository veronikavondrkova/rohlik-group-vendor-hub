
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ImageUploader from './ImageUploader';
import TextControls from './TextControls';
import PriceTagControls from './PriceTagControls';
import CtaStyleControls from './CtaStyleControls';
import InstructionsCard from './InstructionsCard';

interface UploadedImage {
  src: string;
  fileName: string;
  position: { x: number, y: number };
  scale: number;
}

interface EditorSidebarProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  headlineText: string;
  setHeadlineText: (text: string) => void;
  subheadlineText: string;
  setSubheadlineText: (text: string) => void;
  showPriceTag: boolean;
  setShowPriceTag: (checked: boolean) => void;
  priceValue: string;
  setPriceValue: (value: string) => void;
  priceLabel?: string;
  setPriceLabel?: (label: string) => void;
  ctaStyle: 'default' | 'reverse';
  setCtaStyle: (style: 'default' | 'reverse') => void;
  selectedMarket: string;
  uploadedImages: UploadedImage[];
  onRemoveImage: (index: number) => void;
  setActiveImageIndex: (index: number) => void;
  activeImageIndex: number;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  onImageUpload,
  headlineText,
  setHeadlineText,
  subheadlineText,
  setSubheadlineText,
  showPriceTag,
  setShowPriceTag,
  priceValue,
  setPriceValue,
  priceLabel,
  setPriceLabel,
  ctaStyle,
  setCtaStyle,
  selectedMarket,
  uploadedImages,
  onRemoveImage,
  setActiveImageIndex,
  activeImageIndex
}) => {
  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6 space-y-6">
          <ImageUploader 
            onImageUpload={onImageUpload} 
            uploadedImages={uploadedImages} 
            onRemoveImage={onRemoveImage}
            setActiveImageIndex={setActiveImageIndex}
            activeImageIndex={activeImageIndex}
          />
          
          <TextControls 
            headlineText={headlineText}
            setHeadlineText={setHeadlineText}
            subheadlineText={subheadlineText}
            setSubheadlineText={setSubheadlineText}
          />
          
          <CtaStyleControls 
            ctaStyle={ctaStyle}
            setCtaStyle={setCtaStyle}
            selectedMarket={selectedMarket}
          />
          
          <PriceTagControls 
            showPriceTag={showPriceTag}
            setShowPriceTag={setShowPriceTag}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            priceLabel={priceLabel}
            setPriceLabel={setPriceLabel}
          />
        </CardContent>
      </Card>
      
      <InstructionsCard />
    </div>
  );
};

export default EditorSidebar;
