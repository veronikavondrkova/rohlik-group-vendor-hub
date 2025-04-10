
import React from 'react';
import Draggable from '@/components/ui/draggable';

interface PriceTagProps {
  showPriceTag: boolean;
  uploadedImages: string[];
  priceTagPosition: {
    x: number;
    y: number;
  };
  onDrag: (position: { x: number; y: number }) => void;
  priceValue: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ 
  showPriceTag, 
  uploadedImages, 
  priceTagPosition, 
  onDrag, 
  priceValue 
}) => {
  if (!showPriceTag || uploadedImages.length === 0) return null;
  
  return (
    <Draggable position={priceTagPosition} onDrag={onDrag} bounds="parent">
      <div className="absolute cursor-move z-20">
        <div className="bg-rohlik-light text-xs px-2 py-1 text-center mb-1 rounded-t-sm">
          AKCE
        </div>
        <div className="price-tag flex items-center justify-center font-bold" style={{
          width: '124px',
          height: '55px'
        }}>
          {priceValue ? `${priceValue} Kč` : '99 Kč'}
        </div>
      </div>
    </Draggable>
  );
};

export default PriceTag;
