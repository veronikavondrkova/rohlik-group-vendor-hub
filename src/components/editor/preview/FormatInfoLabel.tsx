
import React from 'react';

interface FormatInfoLabelProps {
  currentFormat: string;
  currentDimensions: {
    width: number;
    height: number;
  };
}

const FormatInfoLabel: React.FC<FormatInfoLabelProps> = ({
  currentFormat,
  currentDimensions
}) => {
  if (!currentFormat) return null;
  
  const formattedFormat = currentFormat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div className="text-center mt-4 text-sm text-gray-500">
      <p>
        {formattedFormat} - {currentDimensions.width} × {currentDimensions.height}px (Shown at 50% scale)
      </p>
    </div>
  );
};

export default FormatInfoLabel;
