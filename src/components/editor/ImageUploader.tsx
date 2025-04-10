import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
interface ImageUploaderProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedImages: string[];
  onRemoveImage: (index: number) => void;
  setActiveImageIndex: (index: number) => void;
  activeImageIndex: number;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  uploadedImages,
  onRemoveImage,
  setActiveImageIndex,
  activeImageIndex
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return <div className="space-y-4">
      <div>
        
        <Button variant="outline" onClick={handleUploadClick} className="w-full mt-2 bg-transparent border border-black text-black hover:bg-gray-100">
          Upload the image
        </Button>
        <input id="image-upload" ref={fileInputRef} type="file" accept="image/*" multiple onChange={onImageUpload} className="hidden" />
        <p className="text-xs text-gray-500 mt-1">
          For best results, use high-resolution images. You can upload multiple images.
        </p>
      </div>
      
      {uploadedImages.length > 0 && <div className="mt-4">
          <Label htmlFor="uploaded-images">Uploaded Images:</Label>
          <ScrollArea className="h-[200px] w-full border rounded-md p-2 mt-1 py-[3px] my-[7px]">
            <div className="space-y-2">
              {uploadedImages.map((image, index) => <div key={index} className={`flex items-center p-2 rounded ${activeImageIndex === index ? 'bg-gray-100' : ''}`}>
                  <div className="w-12 h-12 mr-3 flex-shrink-0 cursor-pointer border overflow-hidden" onClick={() => setActiveImageIndex(index)}>
                    <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm truncate">Image {index + 1}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onRemoveImage(index)} className="ml-2 h-8 w-8 text-gray-500 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </Button>
                </div>)}
            </div>
          </ScrollArea>
        </div>}
    </div>;
};
export default ImageUploader;