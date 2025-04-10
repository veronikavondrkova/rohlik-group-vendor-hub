
import { useState, useRef } from 'react';

export const useImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [...uploadedImages];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
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
    handleUploadClick
  };
};
