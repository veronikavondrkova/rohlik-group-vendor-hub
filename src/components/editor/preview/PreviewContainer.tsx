
import React from 'react';

interface PreviewContainerProps {
  dimensions: {
    width: number;
    height: number;
  };
  children: React.ReactNode;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({
  dimensions,
  children
}) => {
  // Default dimensions if not provided
  const width = dimensions?.width || 600;
  const height = dimensions?.height || 400;
  
  return (
    <div 
      className="relative bg-transparent mx-auto overflow-hidden border" 
      style={{
        width: `${width / 2}px`,
        height: `${height / 2}px`
      }}
    >
      {/* Safe zone overlay */}
      <div className="absolute inset-0 safe-zone m-[10px]"></div>
      
      {children}
    </div>
  );
};

export default PreviewContainer;
