
import React from 'react';
import Draggable from '@/components/ui/draggable';
import { Button } from '@/components/ui/button';

interface BackgroundImageProps {
  uploadedImages: string[];
  activeImageIndex: number;
  imagePosition: {
    x: number;
    y: number;
  };
  onDrag: (position: { x: number; y: number }) => void;
  imageScale: number;
  handleUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  uploadedImages,
  activeImageIndex,
  imagePosition,
  onDrag,
  imageScale,
  handleUploadClick,
  fileInputRef
}) => {
  if (uploadedImages.length > 0 && activeImageIndex >= 0 && activeImageIndex < uploadedImages.length) {
    return (
      <Draggable position={imagePosition} onDrag={onDrag} bounds="parent">
        <img 
          src={uploadedImages[activeImageIndex]} 
          alt="Background" 
          className="absolute cursor-move" 
          style={{
            display: 'block',
            width: 'auto',
            height: 'auto',
            minWidth: `${imageScale}%`,
            minHeight: `${imageScale}%`,
            maxWidth: 'none',
            transform: `scale(${imageScale / 100})`,
            transformOrigin: 'center',
            zIndex: 1
          }} 
        />
      </Draggable>
    );
  }
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Button 
        variant="outline" 
        onClick={handleUploadClick} 
        className="bg-transparent border border-black text-black hover:bg-gray-100"
      >
        Upload the image
      </Button>
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        multiple 
        onChange={e => {
          if (fileInputRef.current) {
            const event = new Event('change', { bubbles: true });
            fileInputRef.current.dispatchEvent(event);
          }
        }} 
        className="hidden" 
      />
    </div>
  );
};

export default BackgroundImage;
