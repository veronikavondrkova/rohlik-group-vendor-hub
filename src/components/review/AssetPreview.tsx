
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PreviewTab from './tabs/PreviewTab';
import MockupTab from './tabs/MockupTab';

interface AssetPreviewProps {
  asset: {
    name: string;
    format: string;
    size: string;
    market: string;
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
  // Calculate 50% scale for display
  const displayWidth = assetDimensions.width / 2;
  const displayHeight = assetDimensions.height / 2;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList>
        <TabsTrigger value="preview">Preview & Mockup</TabsTrigger>
        <TabsTrigger value="mockup">Live Mockup Only</TabsTrigger>
      </TabsList>
      
      <TabsContent value="preview" className="pt-4">
        <div className="space-y-8">
          {/* Asset Preview Section */}
          <PreviewTab 
            asset={asset}
            headlineText={headlineText}
            subheadlineText={subheadlineText}
            showPriceTag={showPriceTag}
            priceValue={priceValue}
            priceLabel={priceLabel}
            priceTagPosition={priceTagPosition}
            onPriceTagDrag={onPriceTagDrag}
            assetDimensions={assetDimensions}
          />
          
          {/* Live Mockup Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Live Mockup Preview</h3>
            <MockupTab 
              asset={asset}
              headlineText={headlineText}
              subheadlineText={subheadlineText}
              showPriceTag={showPriceTag}
              priceValue={priceValue}
              priceLabel={priceLabel}
              priceTagPosition={priceTagPosition}
              displayWidth={displayWidth}
              displayHeight={displayHeight}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="mockup" className="pt-4">
        <MockupTab 
          asset={asset}
          headlineText={headlineText}
          subheadlineText={subheadlineText}
          showPriceTag={showPriceTag}
          priceValue={priceValue}
          priceLabel={priceLabel}
          priceTagPosition={priceTagPosition}
          displayWidth={displayWidth}
          displayHeight={displayHeight}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AssetPreview;
