
import React from 'react';
import { Slider } from '@/components/ui/slider';
import GradientControls from './GradientControls';

interface UploadedImage {
  src: string;
  fileName: string;
  position: { x: number, y: number };
  scale: number;
}

interface PreviewControlsProps {
  uploadedImages: UploadedImage[];
  activeImageIndex: number;
  imageScale: number;
  onImageResizeChange: (value: number[]) => void;
  overlayOpacity: number;
  onOverlayOpacityChange: (value: number[]) => void;
  // New gradient props
  gradientOpacity: number;
  onGradientOpacityChange: (value: number[]) => void;
  gradientDirection: number;
  onGradientDirectionChange: (value: number) => void;
  gradientStartPosition: number;
  onGradientStartPositionChange: (value: number) => void;
  gradientEndPosition: number;
  onGradientEndPositionChange: (value: number) => void;
}

const PreviewControls: React.FC<PreviewControlsProps> = ({
  uploadedImages,
  activeImageIndex,
  imageScale,
  onImageResizeChange,
  overlayOpacity,
  onOverlayOpacityChange,
  // New gradient props
  gradientOpacity,
  onGradientOpacityChange,
  gradientDirection,
  onGradientDirectionChange,
  gradientStartPosition,
  onGradientStartPositionChange,
  gradientEndPosition,
  onGradientEndPositionChange
}) => {
  if (uploadedImages.length === 0 || activeImageIndex < 0) return null;
  
  return (
    <div className="mt-4 px-4 space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Image Size:</span>
        <div className="flex-grow">
          <Slider 
            defaultValue={[50]} 
            min={0} 
            max={100} 
            step={5} 
            value={[imageScale]} 
            onValueChange={onImageResizeChange} 
          />
        </div>
        <span className="text-sm min-w-12 text-right">{imageScale}%</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Overlay Opacity:</span>
        <div className="flex-grow">
          <Slider 
            defaultValue={[5]} 
            min={0} 
            max={100} 
            step={5} 
            value={[overlayOpacity]} 
            onValueChange={onOverlayOpacityChange} 
          />
        </div>
        <span className="text-sm min-w-12 text-right">{overlayOpacity}%</span>
      </div>
      
      <GradientControls 
        gradientOpacity={gradientOpacity}
        onGradientOpacityChange={onGradientOpacityChange}
        gradientDirection={gradientDirection}
        onGradientDirectionChange={onGradientDirectionChange}
        gradientStartPosition={gradientStartPosition}
        onGradientStartPositionChange={onGradientStartPositionChange}
        gradientEndPosition={gradientEndPosition}
        onGradientEndPositionChange={onGradientEndPositionChange}
      />
    </div>
  );
};

export default PreviewControls;
