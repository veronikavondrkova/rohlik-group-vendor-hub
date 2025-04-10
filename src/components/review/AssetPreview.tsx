
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePreviewControls } from '@/hooks/use-preview-controls';

interface AssetPreviewProps {
  asset: {
    name: string;
    format: string;
    size: string;
    supplier: string;
    dateSubmitted: string;
    headline?: string;
    subheadline?: string;
    thumbnail?: string;
    overlayOpacity?: number;
    gradientOpacity?: number;
    gradientDirection?: number;
    gradientStartPosition?: number;
    gradientEndPosition?: number;
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
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AssetPreview = ({
  asset,
  headlineText,
  subheadlineText,
  showPriceTag,
  priceValue,
  priceLabel,
  activeTab,
  setActiveTab,
}: AssetPreviewProps) => {
  // Use preview controls for any saved settings or defaults
  const {
    overlayOpacity,
    gradientOpacity,
    gradientDirection,
    gradientStartPosition,
    gradientEndPosition
  } = usePreviewControls();

  // Use asset values if available, otherwise use defaults
  const actualOverlayOpacity = asset.overlayOpacity !== undefined ? asset.overlayOpacity : overlayOpacity;
  const actualGradientOpacity = asset.gradientOpacity !== undefined ? asset.gradientOpacity : gradientOpacity;
  const actualGradientDirection = asset.gradientDirection !== undefined ? asset.gradientDirection : gradientDirection;
  const actualGradientStartPosition = asset.gradientStartPosition !== undefined ? asset.gradientStartPosition : gradientStartPosition;
  const actualGradientEndPosition = asset.gradientEndPosition !== undefined ? asset.gradientEndPosition : gradientEndPosition;

  // Use asset headline/subheadline or passed props
  const displayHeadline = asset.headline || headlineText;
  const displaySubheadline = asset.subheadline || subheadlineText;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="mockup">Live Mockup</TabsTrigger>
        <TabsTrigger value="version-history">Version History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="preview" className="pt-4">
        <Card>
          <CardContent className="p-6">
            <div 
              className="relative bg-gray-200 mx-auto overflow-hidden border"
              style={{ 
                width: '976px', 
                height: '550px',
                maxWidth: '100%',
                maxHeight: '550px',
              }}
            >
              {/* Background image - show the first image from asset.images or fallback to thumbnail */}
              {(asset.images && asset.images.length > 0) ? (
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
              ) : asset.thumbnail ? (
                <div className="absolute inset-0">
                  <img 
                    src={asset.thumbnail} 
                    alt={asset.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
              
              {/* Black overlay */}
              {actualOverlayOpacity > 0 && (asset.thumbnail || (asset.images && asset.images.length > 0)) && (
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundColor: `rgba(0, 0, 0, ${actualOverlayOpacity / 100})`,
                    zIndex: asset.images ? asset.images.length + 1 : 2,
                    pointerEvents: 'none'
                  }}
                ></div>
              )}
              
              {/* Gradient overlay */}
              {actualGradientOpacity > 0 && (asset.thumbnail || (asset.images && asset.images.length > 0)) && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${actualGradientDirection}deg, rgba(0,0,0,${actualGradientOpacity / 100}) ${actualGradientStartPosition}%, rgba(0,0,0,0) ${actualGradientEndPosition}%)`,
                    zIndex: asset.images ? asset.images.length + 2 : 3,
                    pointerEvents: 'none'
                  }}
                ></div>
              )}
              
              {/* Safe zone overlay */}
              <div className="absolute inset-0 safe-zone m-[20px]"></div>
              
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 p-8 w-1/2 z-10">
                {displayHeadline && (
                  <div className="text-white font-bold text-2xl mb-2 text-shadow">
                    {displayHeadline}
                  </div>
                )}
                
                {displaySubheadline && (
                  <div className="text-white text-lg mb-4 text-shadow">
                    {displaySubheadline}
                  </div>
                )}
                
                {/* CTA Button */}
                <button className="cta-button-cz px-6 py-2 text-base rounded-md">
                  Koupit {'>>'}
                </button>
              </div>
              
              {/* Price tag (right side) - hidden for submission */}
              {showPriceTag && !window.location.pathname.includes('/dashboard') && (
                <div className="absolute top-1/4 right-16">
                  <div className="bg-rohlik-light px-4 py-1 text-center mb-1 rounded-t-sm">
                    {priceLabel}
                  </div>
                  <div className="price-tag flex items-center justify-center text-5xl font-bold" style={{ width: '248px', height: '110px' }}>
                    {priceValue} Kč
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-center mt-4 text-sm text-gray-500">
              <p>
                {asset.format} - {asset.size} | Supplier: {asset.supplier} | Date Submitted: {asset.dateSubmitted}
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="mockup" className="pt-4">
        <Card>
          <CardContent className="p-6 h-[600px] flex items-center justify-center">
            <p className="text-gray-500">
              Live mockup preview would be displayed here
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="version-history" className="pt-4">
        <Card>
          <CardContent className="p-6 h-[600px] flex items-center justify-center">
            <p className="text-gray-500">
              Version history would be displayed here
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AssetPreview;
