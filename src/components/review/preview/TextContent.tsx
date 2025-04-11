
import React from 'react';

interface TextContentProps {
  headline: string;
  subheadline: string;
}

const TextContent = ({ headline, subheadline }: TextContentProps) => {
  return (
    <div className="absolute bottom-0 left-0 p-4 w-1/2 z-10">
      {headline && (
        <div className="text-white font-bold text-lg mb-1 text-shadow">
          {headline}
        </div>
      )}
      
      {subheadline && (
        <div className="text-white text-sm mb-2 text-shadow">
          {subheadline}
        </div>
      )}
      
      {/* CTA Button */}
      <button className="cta-button-cz px-3 py-1 text-sm rounded-md">
        Koupit {'>>'}
      </button>
    </div>
  );
};

export default TextContent;
