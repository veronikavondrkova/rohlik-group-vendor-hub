
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AssetPreviewProps {
  asset: {
    format: string;
    size: string;
    supplier: string;
    dateSubmitted: string;
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
              {/* Safe zone overlay */}
              <div className="absolute inset-0 safe-zone m-[20px]"></div>
              
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 p-8 w-1/2">
                {headlineText && (
                  <div className="text-white font-bold text-2xl mb-2 text-shadow">
                    {headlineText}
                  </div>
                )}
                
                {subheadlineText && (
                  <div className="text-white text-lg mb-4 text-shadow">
                    {subheadlineText}
                  </div>
                )}
                
                {/* CTA Button */}
                <button className="cta-button-cz px-6 py-2 text-base rounded-md">
                  Koupit {'>>'}
                </button>
              </div>
              
              {/* Price tag (right side) */}
              {showPriceTag && (
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
