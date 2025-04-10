
import { useState, useRef } from 'react';

interface UploadedImage {
  src: string;
  fileName: string;
  position: { x: number, y: number };
  scale: number;
}

export const useImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: UploadedImage[] = [...uploadedImages];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target?.result) {
            newImages.push({
              src: event.target.result as string,
              fileName: file.name,
              position: { x: 0, y: 0 },
              scale: 50 // Default scale (50%)
            });
            setUploadedImages(newImages);

            // Set the newly uploaded image as active
            setActiveImageIndex(newImages.length - 1);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = uploadedImages.filter((_, index) => index !== indexToRemove);
    setUploadedImages(updatedImages);

    // Adjust active image index if needed
    if (activeImageIndex >= updatedImages.length) {
      setActiveImageIndex(Math.max(0, updatedImages.length - 1));
    } else if (activeImageIndex === indexToRemove && updatedImages.length > 0) {
      // If the removed image was active, select the next one
      setActiveImageIndex(Math.min(activeImageIndex, updatedImages.length - 1));
    }
  };

  const updateImagePosition = (index: number, position: { x: number, y: number }) => {
    const updatedImages = [...uploadedImages];
    if (updatedImages[index]) {
      updatedImages[index].position = position;
      setUploadedImages(updatedImages);
    }
  };

  const updateImageScale = (index: number, scale: number) => {
    const updatedImages = [...uploadedImages];
    if (updatedImages[index]) {
      updatedImages[index].scale = scale;
      setUploadedImages(updatedImages);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return {
    fileInputRef,
    uploadedImages,
    activeImageIndex,
    setActiveImageIndex,
    handleImageUpload,
    handleRemoveImage,
    handleUploadClick,
    updateImagePosition,
    updateImageScale
  };
};
