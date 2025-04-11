
import React from 'react';

interface AssetOverlaysProps {
  hasImages: boolean;
  overlayOpacity: number;
  gradientOpacity: number;
  gradientDirection: number;
  gradientStartPosition: number;
  gradientEndPosition: number;
  imagesLength: number;
}

const AssetOverlays = ({
  hasImages,
  overlayOpacity,
  gradientOpacity,
  gradientDirection,
  gradientStartPosition,
  gradientEndPosition,
  imagesLength
}: AssetOverlaysProps) => {
  if (!hasImages) return null;
  
  return (
    <>
      {/* Black overlay */}
      {overlayOpacity > 0 && (
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
            zIndex: imagesLength + 1,
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Gradient overlay */}
      {gradientOpacity > 0 && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${gradientDirection}deg, rgba(0,0,0,${gradientOpacity / 100}) ${gradientStartPosition}%, rgba(0,0,0,0) ${gradientEndPosition}%)`,
            zIndex: imagesLength + 2,
            pointerEvents: 'none'
          }}
        />
      )}
    </>
  );
};

export default AssetOverlays;
