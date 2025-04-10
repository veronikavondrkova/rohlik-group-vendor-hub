import { useState } from 'react';

interface UploadedImage {
  src: string;
  fileName: string;
  position: { x: number, y: number };
  scale: number;
}

export const useDragHandlers = (
  updateImagePosition: (index: number, position: { x: number, y: number }) => void,
  updateImageScale: (index: number, scale: number) => void,
  setPriceTagPosition: (position: { x: number, y: number }) => void,
  currentDimensions: { width: number, height: number }
) => {
  const handleImageDrag = (index: number, position: { x: number; y: number }) => {
    updateImagePosition(index, position);
  };
  
  const handlePriceTagDrag = (position: { x: number; y: number }) => {
    // Calculate boundaries to keep price tag in the right half of the asset
    if (currentDimensions.width) {
      const rightHalfStart = currentDimensions.width / 8; // Less restrictive
      const updatedX = Math.max(rightHalfStart, position.x);
      setPriceTagPosition({
        x: updatedX,
        y: position.y
      });
    } else {
      setPriceTagPosition(position);
    }
  };
  
  const handleImageResize = (activeImageIndex: number, uploadedImages: UploadedImage[], value: number[]) => {
    if (activeImageIndex >= 0 && activeImageIndex < uploadedImages.length) {
      updateImageScale(activeImageIndex, value[0]);
    }
  };
  
  return {
    handleImageDrag,
    handlePriceTagDrag,
    handleImageResize
  };
};
