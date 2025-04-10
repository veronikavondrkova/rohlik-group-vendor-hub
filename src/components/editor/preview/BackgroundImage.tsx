
import React from 'react';
import Draggable from '@/components/ui/draggable';
import { Button } from '@/components/ui/button';

interface UploadedImage {
  src: string;
  fileName: string;
  position: { x: number, y: number };
  scale: number;
}

interface BackgroundImageProps {
  uploadedImages: UploadedImage[];
  activeImageIndex: number;
  onDrag: (index: number, position: { x: number; y: number }) => void;
  handleUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  uploadedImages,
  activeImageIndex,
  onDrag,
  handleUploadClick,
  fileInputRef
}) => {
  if (uploadedImages.length > 0) {
    return (
      <>
        {uploadedImages.map((image, index) => (
          <Draggable 
            key={index}
            position={image.position} 
            onDrag={(position) => onDrag(index, position)} 
            bounds="parent"
          >
            <img 
              src={image.src} 
              alt={image.fileName} 
              className="absolute cursor-move" 
              style={{
                display: 'block',
                width: 'auto',
                height: 'auto',
                minWidth: `${image.scale}%`,
                minHeight: `${image.scale}%`,
                maxWidth: 'none',
                transform: `scale(${image.scale / 100})`,
                transformOrigin: 'center',
                zIndex: index + 1,
                opacity: index === activeImageIndex ? 1 : 0.7, // Highlight active image
                border: index === activeImageIndex ? '2px dashed #3B82F6' : 'none',
                pointerEvents: index === activeImageIndex ? 'auto' : 'none' // Only active image can be dragged
              }} 
            />
          </Draggable>
        ))}
      </>
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
