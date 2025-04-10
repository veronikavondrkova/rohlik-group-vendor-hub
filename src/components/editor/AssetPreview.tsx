import React, { useState } from 'react';
import Draggable from '@/components/ui/draggable';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
interface AssetPreviewProps {
  currentFormat: string;
  currentDimensions: {
    width: number;
    height: number;
  };
  uploadedImages: string[];
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  headlineText: string;
  subheadlineText: string;
  showPriceTag: boolean;
  priceValue: string;
  ctaData: {
    text: string;
    color: string;
    reverseColor: string;
  } | undefined;
  imagePosition: {
    x: number;
    y: number;
  };
  setImagePosition: (position: {
    x: number;
    y: number;
  }) => void;
  priceTagPosition: {
    x: number;
    y: number;
  };
  setPriceTagPosition: (position: {
    x: number;
    y: number;
  }) => void;
  handleUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  ctaStyle: 'default' | 'reverse';
}
const AssetPreview: React.FC<AssetPreviewProps> = ({
  currentFormat,
  currentDimensions,
  uploadedImages,
  activeImageIndex,
  setActiveImageIndex,
  headlineText,
  subheadlineText,
  showPriceTag,
  priceValue,
  ctaData,
  imagePosition,
  setImagePosition,
  priceTagPosition,
  setPriceTagPosition,
  handleUploadClick,
  fileInputRef,
  ctaStyle = 'default'
}) => {
  const [imageScale, setImageScale] = useState<number>(100);
  const handleImageDrag = (position: {
    x: number;
    y: number;
  }) => {
    setImagePosition(position);
  };
  const handlePriceTagDrag = (position: {
    x: number;
    y: number;
  }) => {
    // Calculate boundaries to keep price tag in the right half of the asset
    if (currentDimensions.width) {
      const rightHalfStart = currentDimensions.width / 4; // Half of half width (at 50% scale)
      const updatedX = Math.max(rightHalfStart, position.x);
      setPriceTagPosition({
        x: updatedX,
        y: position.y
      });
    } else {
      setPriceTagPosition(position);
    }
  };
  const handleImageResize = (value: number[]) => {
    setImageScale(value[0]);
  };
  return <div>
      <div className="relative bg-transparent mx-auto overflow-hidden border" style={{
      width: `${currentDimensions.width / 2}px`,
      height: `${currentDimensions.height / 2}px`
    }}>
        {/* Safe zone overlay */}
        <div className="absolute inset-0 safe-zone m-[10px]"></div>
        
        {/* Background Image */}
        {uploadedImages.length > 0 && activeImageIndex >= 0 && activeImageIndex < uploadedImages.length ? <Draggable position={imagePosition} onDrag={handleImageDrag} bounds="parent">
            <img src={uploadedImages[activeImageIndex]} alt="Background" className="absolute cursor-move" style={{
          display: 'block',
          width: 'auto',
          height: 'auto',
          minWidth: `${imageScale}%`,
          minHeight: `${imageScale}%`,
          maxWidth: 'none',
          transform: `scale(${imageScale / 100})`,
          transformOrigin: 'center'
        }} />
          </Draggable> : <div className="absolute inset-0 flex items-center justify-center">
            <Button variant="outline" onClick={handleUploadClick} className="bg-transparent border border-black text-black hover:bg-gray-100">
              Upload the image
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={e => {
          if (fileInputRef.current) {
            const event = new Event('change', {
              bubbles: true
            });
            fileInputRef.current.dispatchEvent(event);
          }
        }} className="hidden" />
          </div>}
        
        {/* Text overlay - always on top with higher z-index */}
        <div className="absolute bottom-0 left-0 p-4 w-1/2 z-10 py-[19px]">
          {headlineText && <div className="text-white font-bold text-3xl mb-1 text-shadow py-0 px-0 mx-0 my-[99px]">
              {headlineText}
            </div>}
          
          {subheadlineText && <div className="text-white text-lg mb-3 text-shadow my-[15px] py-0">
              {subheadlineText}
            </div>}
          
          {/* CTA Button with style options */}
          {ctaData && <button className={`px-3 py-1 text-xs rounded font-medium ${ctaStyle === 'default' ? ctaData.color === '#2F7D3B' ? 'cta-button-cz' : 'cta-button-de' : ctaData.color === '#2F7D3B' ? 'cta-button-cz-reverse' : 'cta-button-de-reverse'}`}>
              {ctaData.text || 'Buy now >>'}
            </button>}
        </div>
        
        {/* Price tag (right side) - only if show price tag is checked */}
        {showPriceTag && uploadedImages.length > 0 && <Draggable position={priceTagPosition} onDrag={handlePriceTagDrag} bounds="parent">
            <div className="absolute cursor-move z-10">
              <div className="bg-rohlik-light text-xs px-2 py-1 text-center mb-1 rounded-t-sm">
                AKCE
              </div>
              <div className="price-tag flex items-center justify-center font-bold" style={{
            width: '124px',
            height: '55px'
          }}>
                {priceValue ? `${priceValue} Kč` : '99 Kč'}
              </div>
            </div>
          </Draggable>}
      </div>
      
      {/* Image resize control */}
      {uploadedImages.length > 0 && activeImageIndex >= 0 && <div className="mt-4 px-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Image Size:</span>
            <div className="flex-grow">
              <Slider defaultValue={[100]} min={50} max={200} step={5} value={[imageScale]} onValueChange={handleImageResize} />
            </div>
            <span className="text-sm min-w-12 text-right">{imageScale}%</span>
          </div>
        </div>}
      
      {/* Image thumbnails if multiple images uploaded */}
      {uploadedImages.length > 1 && <div className="flex gap-2 mt-4 justify-center">
          {uploadedImages.map((image, index) => <div key={index} onClick={() => setActiveImageIndex(index)} className={`w-16 h-16 border-2 cursor-pointer overflow-hidden ${index === activeImageIndex ? 'border-primary' : 'border-transparent'}`}>
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </div>)}
        </div>}
      
      <div className="text-center mt-4 text-sm text-gray-500">
        {currentFormat && <p>
            {currentFormat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - 
            {currentDimensions.width} × {currentDimensions.height}px (Shown at 50% scale)
          </p>}
      </div>
    </div>;
};
export default AssetPreview;