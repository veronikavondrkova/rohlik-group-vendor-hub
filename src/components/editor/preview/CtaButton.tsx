
import React from 'react';

interface CtaButtonProps {
  ctaData: {
    text: string;
    color: string;
    reverseColor: string;
  } | undefined;
  ctaStyle: 'default' | 'reverse';
}

const CtaButton: React.FC<CtaButtonProps> = ({ ctaData, ctaStyle }) => {
  if (!ctaData) return null;
  
  return (
    <div className="absolute bottom-0 left-0 p-4 z-10 pointer-events-none">
      <button className={`px-3 py-1 text-xs rounded font-medium ${
          ctaStyle === 'default' 
            ? ctaData.color === '#2F7D3B' ? 'cta-button-cz' : 'cta-button-de' 
            : ctaData.color === '#2F7D3B' ? 'cta-button-cz-reverse' : 'cta-button-de-reverse'
        }`} style={{
          transform: 'scale(1.3)',
          transformOrigin: 'bottom left',
          fontSize: '80%' // Making the text 20% smaller
        }}>
        {ctaData.text || 'Buy now >>'}
      </button>
    </div>
  );
};

export default CtaButton;
