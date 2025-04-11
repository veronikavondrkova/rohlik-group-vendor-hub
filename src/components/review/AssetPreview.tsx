
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PreviewTab from './tabs/PreviewTab';
import MockupTab from './tabs/MockupTab';
import VersionHistoryTab from './tabs/VersionHistoryTab';

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
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="mockup">Live Mockup</TabsTrigger>
        <TabsTrigger value="version-history">Version History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="preview" className="pt-4">
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
      
      <TabsContent value="version-history" className="pt-4">
        <VersionHistoryTab />
      </TabsContent>
    </Tabs>
  );
};

export default AssetPreview;
