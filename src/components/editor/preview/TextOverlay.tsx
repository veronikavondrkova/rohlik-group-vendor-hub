
import React from 'react';

interface TextOverlayProps {
  headlineText: string;
  subheadlineText: string;
}

const TextOverlay: React.FC<TextOverlayProps> = ({ headlineText, subheadlineText }) => {
  return (
    <div className="absolute top-0 left-0 p-4 w-1/2 z-10 pointer-events-none">
      {headlineText && (
        <div className="text-white font-bold text-3xl mb-2 text-shadow-enhanced my-[9px]">
          {headlineText}
        </div>
      )}
      
      {subheadlineText && (
        <div className="text-white text-lg mb-3 text-shadow-enhanced">
          {subheadlineText}
        </div>
      )}
    </div>
  );
};

export default TextOverlay;
