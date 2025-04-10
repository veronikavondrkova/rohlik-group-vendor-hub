
import React from 'react';
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
import { usePreviewControls } from '@/hooks/use-preview-controls';
import { useDragHandlers } from './preview/DragHandlers';

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
  isSubmitting?: boolean; // New prop
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
  updateImageScale,
  isSubmitting = false
}) => {
  // Use the extracted hooks for state management
  const {
    overlayOpacity,
    gradientOpacity,
    gradientDirection,
    gradientStartPosition,
    gradientEndPosition,
    handleOverlayOpacityChange,
    handleGradientOpacityChange,
    handleGradientDirectionChange,
    handleGradientStartPositionChange,
    handleGradientEndPositionChange
  } = usePreviewControls();
  
  // Use the extracted drag handlers
  const {
    handleImageDrag,
    handlePriceTagDrag,
    handleImageResize
  } = useDragHandlers(
    updateImagePosition,
    updateImageScale,
    setPriceTagPosition,
    currentDimensions
  );
  
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
          isSubmitting={isSubmitting}
        />
      </PreviewContainer>
      
      <PreviewControls 
        uploadedImages={uploadedImages}
        activeImageIndex={activeImageIndex}
        imageScale={activeImageScale}
        onImageResizeChange={(value) => handleImageResize(activeImageIndex, uploadedImages, value)}
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
