
import React from 'react';

interface AssetImageProps {
  asset: {
    name?: string; // Added name as optional property
    thumbnail?: string;
    images?: Array<{
      src: string;
      fileName: string;
      position: { x: number, y: number };
      scale: number;
    }>;
  };
}

const AssetImage = ({ asset }: AssetImageProps) => {
  if (asset?.images && asset.images.length > 0) {
    return (
      <div className="absolute inset-0">
        {asset.images.map((image, index) => (
          <img 
            key={index}
            src={image.src} 
            alt={image.fileName} 
            className="absolute w-full h-full object-cover"
            style={{
              transform: `scale(${image.scale / 100})`,
              top: `${image.position.y}px`,
              left: `${image.position.x}px`,
              zIndex: index + 1
            }} 
          />
        ))}
      </div>
    );
  } else if (asset?.thumbnail) {
    return (
      <div className="absolute inset-0">
        <img 
          src={asset.thumbnail} 
          alt={asset?.name || "Asset"} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  return null;
};

export default AssetImage;
