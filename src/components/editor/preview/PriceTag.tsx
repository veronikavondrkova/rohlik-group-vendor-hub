
import React from 'react';
import Draggable from '@/components/ui/draggable';

interface PriceTagProps {
  showPriceTag: boolean;
  uploadedImages: boolean;
  priceTagPosition: {
    x: number;
    y: number;
  };
  onDrag: (position: { x: number; y: number }) => void;
  priceValue: string;
  isSubmitting?: boolean; // New prop to control visibility during submission
}

const PriceTag: React.FC<PriceTagProps> = ({ 
  showPriceTag, 
  uploadedImages, 
  priceTagPosition, 
  onDrag, 
  priceValue,
  isSubmitting = false // Default to false
}) => {
  // Hide the price tag if we're submitting OR if it's toggled off or no images
  if (!showPriceTag || !uploadedImages || isSubmitting) return null;
  
  return (
    <Draggable position={priceTagPosition} onDrag={onDrag} bounds="parent">
      <div className="absolute cursor-move" style={{ zIndex: 100 }}>
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
