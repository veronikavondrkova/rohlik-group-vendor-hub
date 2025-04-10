
import React from 'react';

interface GradientOverlayProps {
  opacity: number;
  isVisible: boolean;
  direction: number; // in degrees
  startPosition: number; // 0-100%
  endPosition: number; // 0-100%
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({
  opacity,
  isVisible,
  direction,
  startPosition,
  endPosition
}) => {
  if (!isVisible) return null;
  
  // Convert opacity from percentage to decimal (0-1)
  const opacityValue = opacity / 100;
  
  // Calculate gradient direction and positions
  const gradientStyle = {
    background: `linear-gradient(${direction}deg, rgba(0,0,0,${opacityValue}) ${startPosition}%, rgba(0,0,0,0) ${endPosition}%)`,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3, // Above black overlay but below text and price tag
    pointerEvents: 'none' // Allow clicking through the overlay
  };
  
  return <div style={gradientStyle} />;
};

export default GradientOverlay;
