
import { Card, CardContent } from '@/components/ui/card';

interface MockupTabProps {
  asset: {
    name: string;
    headline?: string;
    subheadline?: string;
    thumbnail?: string;
    images?: Array<{
      src: string;
      fileName: string;
      position: { x: number, y: number };
      scale: number;
    }>;
  };
  headlineText: string;
  subheadlineText: string;
  showPriceTag: boolean;
  priceValue: string;
  priceLabel: string;
  priceTagPosition: { x: number, y: number };
  displayWidth: number;
  displayHeight: number;
}

const MockupTab = ({
  asset,
  headlineText,
  subheadlineText,
  showPriceTag,
  priceValue,
  priceLabel,
  priceTagPosition,
  displayWidth,
  displayHeight
}: MockupTabProps) => {
  // Use asset headline/subheadline or passed props
  const displayHeadline = asset?.headline || headlineText;
  const displaySubheadline = asset?.subheadline || subheadlineText;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="w-full overflow-hidden">
          <div className="relative">
            {/* Rohlik marketplace mockup background - using the new image */}
            <img 
              src="/lovable-uploads/fd6821f1-63a0-4ae3-a012-690918434d80.png" 
              alt="Rohlik marketplace" 
              className="w-full object-cover"
            />
            
            {/* Position the banner in the carousel area */}
            <div 
              className="absolute"
              style={{ 
                top: '136px',  // Adjusted position for the new carousel location
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${Math.min(displayWidth * 1.5, 760)}px`, // Scale appropriately
                maxWidth: '90%',
                zIndex: 10
              }}
            >
              <div className="relative shadow-lg rounded-lg overflow-hidden">
                {/* Asset preview */}
                {(asset?.images && asset.images.length > 0) ? (
                  <div className="relative">
                    <img 
                      src={asset.images[0].src} 
                      alt={asset.name} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Text overlay */}
                    <div className="absolute bottom-0 left-0 p-4 w-1/2 z-10">
                      {displayHeadline && (
                        <div className="text-white font-bold text-lg mb-1 text-shadow">
                          {displayHeadline}
                        </div>
                      )}
                      
                      {displaySubheadline && (
                        <div className="text-white text-sm mb-2 text-shadow">
                          {displaySubheadline}
                        </div>
                      )}
                      
                      {/* CTA Button */}
                      <button className="bg-[#228d41] text-white px-3 py-1 text-sm rounded-md">
                        Koupit {'>>'}
                      </button>
                    </div>
                    
                    {/* Price tag */}
                    {showPriceTag && (
                      <div className="absolute" style={{ 
                        top: `${Math.min(priceTagPosition.y * 1.5, displayHeight)}px`, 
                        right: `${Math.min(50, displayWidth - priceTagPosition.x)}px`,
                        zIndex: 100 
                      }}>
                        {priceLabel && (
                          <div className="bg-[#f0ba2d] px-3 py-0.5 text-center mb-0.5 rounded-t-sm text-sm">
                            {priceLabel}
                          </div>
                        )}
                        <div className="bg-[#f0ba2d] flex items-center justify-center text-2xl font-bold p-2 rounded-sm" 
                          style={{ minWidth: '80px' }}>
                          {priceValue} Kč
                        </div>
                      </div>
                    )}
                  </div>
                ) : asset?.thumbnail ? (
                  <img 
                    src={asset.thumbnail} 
                    alt={asset.name} 
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-48 flex items-center justify-center">
                    <p className="text-gray-600">No image available</p>
                  </div>
                )}
              </div>
              
              {/* Button under the banner - matching Rohlik's "Koupit" button style */}
              <div className="absolute left-6 -bottom-10">
                <button className="bg-[#228d41] text-white px-3 py-1 text-sm rounded-md">
                  Koupit »
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-sm text-gray-500 text-center">
          <p>This is a preview of how the banner would look on Rohlik.cz</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockupTab;
