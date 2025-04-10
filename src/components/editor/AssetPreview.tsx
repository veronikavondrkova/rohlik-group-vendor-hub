import React, { useState } from 'react';
import PreviewContainer from './preview/PreviewContainer';
import BackgroundImage from './preview/BackgroundImage';
import BlackOverlay from './preview/BlackOverlay';
import TextOverlay from './preview/TextOverlay';
import CtaButton from './preview/CtaButton';
import PriceTag from './preview/PriceTag';
import PreviewControls from './preview/PreviewControls';
import ImageThumbnails from './preview/ImageThumbnails';
import FormatInfoLabel from './preview/FormatInfoLabel';

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
  const [overlayOpacity, setOverlayOpacity] = useState<number>(5);
  
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
  
  const handleImageResize = (value: number[]) => {
    setImageScale(value[0]);
  };
  
  const handleOverlayOpacityChange = (value: number[]) => {
    setOverlayOpacity(value[0]);
  };
  
  return (
    <div>
      <PreviewContainer dimensions={currentDimensions}>
        <BackgroundImage
          uploadedImages={uploadedImages}
          activeImageIndex={activeImageIndex}
          imagePosition={imagePosition}
          onDrag={handleImageDrag}
          imageScale={imageScale}
          handleUploadClick={handleUploadClick}
          fileInputRef={fileInputRef}
        />
        
        <BlackOverlay 
          opacity={overlayOpacity} 
          isVisible={uploadedImages.length > 0 && activeImageIndex >= 0} 
        />
        
        <TextOverlay 
          headlineText={headlineText} 
          subheadlineText={subheadlineText} 
        />
        
        <CtaButton 
          ctaData={ctaData} 
          ctaStyle={ctaStyle} 
        />
        
        <PriceTag 
          showPriceTag={showPriceTag}
          uploadedImages={uploadedImages}
          priceTagPosition={priceTagPosition}
          onDrag={handlePriceTagDrag}
          priceValue={priceValue}
        />
      </PreviewContainer>
      
      <PreviewControls 
        uploadedImages={uploadedImages}
        activeImageIndex={activeImageIndex}
        imageScale={imageScale}
        onImageResizeChange={handleImageResize}
        overlayOpacity={overlayOpacity}
        onOverlayOpacityChange={handleOverlayOpacityChange}
      />
      
      <ImageThumbnails 
        uploadedImages={uploadedImages}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
      
      <FormatInfoLabel 
        currentFormat={currentFormat}
        currentDimensions={currentDimensions}
      />
    </div>
  );
};

export default AssetPreview;
