
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
            {/* Rohlik marketplace mockup background */}
            <img 
              src="/lovable-uploads/27de478d-38f3-4f26-a177-1d44911d52cd.png" 
              alt="Rohlik marketplace" 
              className="w-full object-cover"
            />
            
            {/* Overlay the banner/asset in an appropriate spot */}
            <div 
              className="absolute"
              style={{ 
                top: '275px',  // Position in the carousel area
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${Math.min(displayWidth * 1.5, 800)}px`, // Scale appropriately
                maxWidth: '90%',
                zIndex: 10
              }}
            >
              <div className="relative shadow-lg">
                {/* Asset preview */}
                {(asset?.images && asset.images.length > 0) ? (
                  <div className="relative">
                    <img 
                      src={asset.images[0].src} 
                      alt={asset.name} 
                      className="w-full h-full object-cover rounded-md"
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
                    className="w-full object-cover rounded-md"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-48 rounded-md flex items-center justify-center">
                    <p className="text-gray-600">No image available</p>
                  </div>
                )}
              </div>
              
              {/* Button under the banner */}
              <div className="absolute left-6 -bottom-10">
                <button className="bg-[#228d41] text-white px-3 py-2 text-sm rounded">
                  Koupit »
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-500 text-center">
          <p>This is a preview of how the banner would look on Rohlik.cz</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockupTab;
