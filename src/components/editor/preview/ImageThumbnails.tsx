
import React from 'react';

interface UploadedImage {
  src: string;
  fileName: string;
  position: { x: number, y: number };
  scale: number;
}

interface ImageThumbnailsProps {
  uploadedImages: UploadedImage[];
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
}

const ImageThumbnails: React.FC<ImageThumbnailsProps> = ({
  uploadedImages,
  activeImageIndex,
  setActiveImageIndex
}) => {
  if (uploadedImages.length <= 1) return null;
  
  return (
    <div className="flex gap-2 mt-4 justify-center">
      {uploadedImages.map((image, index) => (
        <div 
          key={index} 
          onClick={() => setActiveImageIndex(index)} 
          className={`w-16 h-16 border-2 cursor-pointer overflow-hidden ${
            index === activeImageIndex ? 'border-primary' : 'border-transparent'
          }`}
          title={image.fileName}
        >
          <img 
            src={image.src} 
            alt={`Thumbnail ${index + 1}`} 
            className="w-full h-full object-cover" 
          />
        </div>
      ))}
    </div>
  );
};

export default ImageThumbnails;
