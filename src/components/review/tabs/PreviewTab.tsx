
import { Card, CardContent } from '@/components/ui/card';
import AssetImage from '../preview/AssetImage';
import AssetOverlays from '../preview/AssetOverlays';
import TextContent from '../preview/TextContent';
import PriceTagDraggable from '../preview/PriceTagDraggable';
import FormatInfo from '../preview/FormatInfo';

interface PreviewTabProps {
  asset: {
    name: string;
    format: string;
    supplier: string;
    dateSubmitted: string;
    headline?: string; // Added headline as optional property
    subheadline?: string; // Added subheadline as optional property
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
  priceTagPosition: { x: number, y: number };
  onPriceTagDrag: (position: { x: number, y: number }) => void;
  assetDimensions: { width: number, height: number };
}

const PreviewTab = ({
  asset,
  headlineText,
  subheadlineText,
  showPriceTag,
  priceValue,
  priceLabel,
  priceTagPosition,
  onPriceTagDrag,
  assetDimensions
}: PreviewTabProps) => {
  // Get dimensions
  const displayWidth = assetDimensions.width / 2;
  const displayHeight = assetDimensions.height / 2;
  
  // Use asset values if available, otherwise use defaults
  const actualOverlayOpacity = asset?.overlayOpacity !== undefined ? asset.overlayOpacity : 5;
  const actualGradientOpacity = asset?.gradientOpacity !== undefined ? asset.gradientOpacity : 50;
  const actualGradientDirection = asset?.gradientDirection !== undefined ? asset.gradientDirection : 180;
  const actualGradientStartPosition = asset?.gradientStartPosition !== undefined ? asset.gradientStartPosition : 0;
  const actualGradientEndPosition = asset?.gradientEndPosition !== undefined ? asset.gradientEndPosition : 100;
  
  // Use asset headline/subheadline or passed props
  const displayHeadline = asset?.headline || headlineText;
  const displaySubheadline = asset?.subheadline || subheadlineText;
  
  return (
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
            <AssetImage asset={asset} />
            
            <AssetOverlays 
              hasImages={Boolean(asset?.thumbnail || (asset?.images && asset.images.length > 0))}
              overlayOpacity={actualOverlayOpacity}
              gradientOpacity={actualGradientOpacity}
              gradientDirection={actualGradientDirection}
              gradientStartPosition={actualGradientStartPosition}
              gradientEndPosition={actualGradientEndPosition}
              imagesLength={asset?.images?.length || 0}
            />
            
            {/* Safe zone overlay */}
            <div className="absolute inset-0 safe-zone m-[10px]"></div>
            
            <TextContent 
              headline={displayHeadline}
              subheadline={displaySubheadline}
            />
            
            <PriceTagDraggable
              showPriceTag={showPriceTag}
              priceTagPosition={priceTagPosition}
              onPriceTagDrag={onPriceTagDrag}
              priceLabel={priceLabel}
              priceValue={priceValue}
            />
          </div>
        </div>
        
        <FormatInfo 
          format={asset?.format}
          width={assetDimensions.width}
          height={assetDimensions.height}
          supplier={asset?.supplier}
          dateSubmitted={asset?.dateSubmitted}
        />
      </CardContent>
    </Card>
  );
};

export default PreviewTab;
