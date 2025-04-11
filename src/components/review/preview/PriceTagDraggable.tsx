
import React from 'react';
import Draggable from '@/components/ui/draggable';

interface PriceTagDraggableProps {
  showPriceTag: boolean;
  priceTagPosition: { x: number, y: number };
  onPriceTagDrag: (position: { x: number, y: number }) => void;
  priceLabel: string;
  priceValue: string;
}

const PriceTagDraggable = ({
  showPriceTag,
  priceTagPosition,
  onPriceTagDrag,
  priceLabel,
  priceValue
}: PriceTagDraggableProps) => {
  if (!showPriceTag) return null;
  
  return (
    <Draggable position={priceTagPosition} onDrag={onPriceTagDrag} bounds="parent">
      <div className="absolute cursor-move" style={{ zIndex: 100 }}>
        {priceLabel && (
          <div className="bg-rohlik-light px-3 py-0.5 text-center mb-0.5 rounded-t-sm text-sm">
            {priceLabel}
          </div>
        )}
        <div className="price-tag flex items-center justify-center text-2xl font-bold" 
          style={{ width: '90px', height: '40px' }}>
          {priceValue} Kč
        </div>
      </div>
    </Draggable>
  );
};

export default PriceTagDraggable;
