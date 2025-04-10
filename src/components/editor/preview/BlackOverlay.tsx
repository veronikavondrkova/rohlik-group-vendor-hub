
import React from 'react';

interface BlackOverlayProps {
  opacity: number;
  isVisible: boolean;
}

const BlackOverlay: React.FC<BlackOverlayProps> = ({ opacity, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className="absolute inset-0"
      style={{ 
        backgroundColor: `rgba(0, 0, 0, ${opacity / 100})`,
        zIndex: 2,
        pointerEvents: 'none' // This allows clicking through the overlay
      }}
    ></div>
  );
};

export default BlackOverlay;
