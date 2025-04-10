
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ImageUploaderProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <Label htmlFor="image-upload">Upload Images:</Label>
      <Button 
        variant="outline" 
        onClick={handleUploadClick}
        className="w-full mt-2 bg-transparent border border-black text-black hover:bg-gray-100"
      >
        Upload the image
      </Button>
      <input
        id="image-upload"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onImageUpload}
        className="hidden"
      />
      <p className="text-xs text-gray-500 mt-1">
        For best results, use high-resolution images. You can upload multiple images.
      </p>
    </div>
  );
};

export default ImageUploader;
