import React, { useState } from 'react';
import PreviewContainer from './preview/PreviewContainer';
import BackgroundImage from './preview/BackgroundImage';
import BlackOverlay from './preview/BlackOverlay';
import GradientOverlay from './preview/GradientOverlay';
import TextOverlay from './preview/TextOverlay';
import CtaButton from './preview/CtaButton';
import PriceTag from './preview/PriceTag';
import PreviewControls from './preview/PreviewControls';
import ImageThumbnails from './preview/ImageThumbnails';
import FormatInfoLabel from './preview/FormatInfoLabel';

interface UploadedImage {
  src: string;
  fileName: string;
  position: { x: number, y: number };
  scale: number;
}

interface AssetPreviewProps {
  currentFormat: string;
  currentDimensions: {
    width: number;
    height: number;
  };
  uploadedImages: UploadedImage[];
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
  updateImagePosition: (index: number, position: { x: number, y: number }) => void;
  updateImageScale: (index: number, scale: number) => void;
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
  priceTagPosition,
  setPriceTagPosition,
  handleUploadClick,
  fileInputRef,
  ctaStyle = 'default',
  updateImagePosition,
  updateImageScale
}) => {
  const [overlayOpacity, setOverlayOpacity] = useState<number>(5);
  
  // New state for gradient controls
  const [gradientOpacity, setGradientOpacity] = useState<number>(50);
  const [gradientDirection, setGradientDirection] = useState<number>(180);
  const [gradientStartPosition, setGradientStartPosition] = useState<number>(0);
  const [gradientEndPosition, setGradientEndPosition] = useState<number>(100);
  
  const handleImageDrag = (index: number, position: { x: number; y: number }) => {
    updateImagePosition(index, position);
  };
  
  const handlePriceTagDrag = (position: { x: number; y: number }) => {
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
    if (activeImageIndex >= 0 && activeImageIndex < uploadedImages.length) {
      updateImageScale(activeImageIndex, value[0]);
    }
  };
  
  const handleOverlayOpacityChange = (value: number[]) => {
    setOverlayOpacity(value[0]);
  };
  
  const handleGradientOpacityChange = (value: number[]) => {
    setGradientOpacity(value[0]);
  };
  
  const handleGradientDirectionChange = (value: number) => {
    setGradientDirection(value);
  };
  
  const handleGradientStartPositionChange = (value: number) => {
    setGradientStartPosition(value);
  };
  
  const handleGradientEndPositionChange = (value: number) => {
    setGradientEndPosition(value);
  };
  
  // Get current active image scale
  const activeImageScale = activeImageIndex >= 0 && activeImageIndex < uploadedImages.length 
    ? uploadedImages[activeImageIndex].scale 
    : 50;
  
  return (
    <div>
      <PreviewContainer dimensions={currentDimensions}>
        <BackgroundImage
          uploadedImages={uploadedImages}
          activeImageIndex={activeImageIndex}
          onDrag={handleImageDrag}
          handleUploadClick={handleUploadClick}
          fileInputRef={fileInputRef}
        />
        
        <BlackOverlay 
          opacity={overlayOpacity} 
          isVisible={uploadedImages.length > 0 && activeImageIndex >= 0} 
        />
        
        <GradientOverlay 
          opacity={gradientOpacity}
          isVisible={uploadedImages.length > 0 && activeImageIndex >= 0}
          direction={gradientDirection}
          startPosition={gradientStartPosition}
          endPosition={gradientEndPosition}
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
          uploadedImages={uploadedImages.length > 0}
          priceTagPosition={priceTagPosition}
          onDrag={handlePriceTagDrag}
          priceValue={priceValue}
        />
      </PreviewContainer>
      
      <PreviewControls 
        uploadedImages={uploadedImages}
        activeImageIndex={activeImageIndex}
        imageScale={activeImageScale}
        onImageResizeChange={handleImageResize}
        overlayOpacity={overlayOpacity}
        onOverlayOpacityChange={handleOverlayOpacityChange}
        gradientOpacity={gradientOpacity}
        onGradientOpacityChange={handleGradientOpacityChange}
        gradientDirection={gradientDirection}
        onGradientDirectionChange={handleGradientDirectionChange}
        gradientStartPosition={gradientStartPosition}
        onGradientStartPositionChange={handleGradientStartPositionChange}
        gradientEndPosition={gradientEndPosition}
        onGradientEndPositionChange={handleGradientEndPositionChange}
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
