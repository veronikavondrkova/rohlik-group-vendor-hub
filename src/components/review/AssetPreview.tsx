
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePreviewControls } from '@/hooks/use-preview-controls';
import Draggable from '@/components/ui/draggable';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    priceTagPosition?: { x: number, y: number };
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
  priceTagPosition: { x: number, y: number };
  onPriceTagDrag: (position: { x: number, y: number }) => void;
  assetDimensions?: { width: number, height: number };
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
  priceTagPosition,
  onPriceTagDrag,
  assetDimensions = { width: 976, height: 550 } // Default dimensions if none provided
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
  const actualOverlayOpacity = asset?.overlayOpacity !== undefined ? asset.overlayOpacity : overlayOpacity;
  const actualGradientOpacity = asset?.gradientOpacity !== undefined ? asset.gradientOpacity : gradientOpacity;
  const actualGradientDirection = asset?.gradientDirection !== undefined ? asset.gradientDirection : gradientDirection;
  const actualGradientStartPosition = asset?.gradientStartPosition !== undefined ? asset.gradientStartPosition : gradientStartPosition;
  const actualGradientEndPosition = asset?.gradientEndPosition !== undefined ? asset.gradientEndPosition : gradientEndPosition;

  // Use asset headline/subheadline or passed props
  const displayHeadline = asset?.headline || headlineText;
  const displaySubheadline = asset?.subheadline || subheadlineText;

  // Calculate 50% scale for display
  const displayWidth = assetDimensions.width / 2;
  const displayHeight = assetDimensions.height / 2;

  // Calculate the aspect ratio for the container
  const aspectRatio = assetDimensions.width / assetDimensions.height;

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
            <div className="w-full max-w-full overflow-auto">
              <div 
                className="relative bg-gray-200 mx-auto overflow-hidden border"
                style={{ 
                  width: `${displayWidth}px`, 
                  height: `${displayHeight}px`,
                  maxWidth: '100%',
                }}
              >
                {/* Background image - show the first image from asset.images or fallback to thumbnail */}
                {(asset?.images && asset.images.length > 0) ? (
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
                ) : asset?.thumbnail ? (
                  <div className="absolute inset-0">
                    <img 
                      src={asset.thumbnail} 
                      alt={asset.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                
                {/* Black overlay */}
                {actualOverlayOpacity > 0 && (asset?.thumbnail || (asset?.images && asset.images.length > 0)) && (
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundColor: `rgba(0, 0, 0, ${actualOverlayOpacity / 100})`,
                      zIndex: asset?.images ? asset.images.length + 1 : 2,
                      pointerEvents: 'none'
                    }}
                  ></div>
                )}
                
                {/* Gradient overlay */}
                {actualGradientOpacity > 0 && (asset?.thumbnail || (asset?.images && asset.images.length > 0)) && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${actualGradientDirection}deg, rgba(0,0,0,${actualGradientOpacity / 100}) ${actualGradientStartPosition}%, rgba(0,0,0,0) ${actualGradientEndPosition}%)`,
                      zIndex: asset?.images ? asset.images.length + 2 : 3,
                      pointerEvents: 'none'
                    }}
                  ></div>
                )}
                
                {/* Safe zone overlay */}
                <div className="absolute inset-0 safe-zone m-[10px]"></div>
                
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
                  <button className="cta-button-cz px-3 py-1 text-sm rounded-md">
                    Koupit {'>>'}
                  </button>
                </div>
                
                {/* Price tag with Draggable component - scaled appropriately for 50% view */}
                {showPriceTag && (
                  <Draggable position={priceTagPosition} onDrag={onPriceTagDrag} bounds="parent">
                    <div className="absolute cursor-move" style={{ zIndex: 100 }}>
                      <div className="bg-rohlik-light px-3 py-0.5 text-center mb-0.5 rounded-t-sm text-sm">
                        {priceLabel}
                      </div>
                      <div className="price-tag flex items-center justify-center text-2xl font-bold" 
                        style={{ width: '90px', height: '40px' }}>
                        {priceValue} Kč
                      </div>
                    </div>
                  </Draggable>
                )}
              </div>
            </div>
            
            <div className="text-center mt-4 text-sm text-gray-500">
              <p>
                {asset?.format} - {assetDimensions.width} × {assetDimensions.height}px (Shown at 50% scale) | Supplier: {asset?.supplier} | Date Submitted: {asset?.dateSubmitted}
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
