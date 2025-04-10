
import { useState } from 'react';

export interface PreviewState {
  overlayOpacity: number;
  gradientOpacity: number;
  gradientDirection: number;
  gradientStartPosition: number;
  gradientEndPosition: number;
}

export const usePreviewControls = () => {
  const [overlayOpacity, setOverlayOpacity] = useState<number>(5);
  const [gradientOpacity, setGradientOpacity] = useState<number>(50);
  const [gradientDirection, setGradientDirection] = useState<number>(180);
  const [gradientStartPosition, setGradientStartPosition] = useState<number>(0);
  const [gradientEndPosition, setGradientEndPosition] = useState<number>(100);
  
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
  
  return {
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
  };
};
