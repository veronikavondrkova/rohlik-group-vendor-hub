
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ImageUploader from './ImageUploader';
import TextControls from './TextControls';
import PriceTagControls from './PriceTagControls';
import InstructionsCard from './InstructionsCard';

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
  setPriceValue
}) => {
  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6 space-y-6">
          <ImageUploader onImageUpload={onImageUpload} />
          
          <TextControls 
            headlineText={headlineText}
            setHeadlineText={setHeadlineText}
            subheadlineText={subheadlineText}
            setSubheadlineText={setSubheadlineText}
          />
          
          <PriceTagControls 
            showPriceTag={showPriceTag}
            setShowPriceTag={setShowPriceTag}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
          />
        </CardContent>
      </Card>
      
      <InstructionsCard />
    </div>
  );
};

export default EditorSidebar;
