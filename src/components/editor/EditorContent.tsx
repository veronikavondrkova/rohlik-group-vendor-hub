
import { Card, CardContent } from '@/components/ui/card';
import AssetPreview from '@/components/editor/AssetPreview';
import ExamplesCarousel from '@/components/editor/ExamplesCarousel';
import EditorSidebar from '@/components/editor/EditorSidebar';
import { exampleAssets } from '@/data/assetFormats';

interface UploadedImage {
  src: string;
  fileName: string;
  position: { x: number, y: number };
  scale: number;
}

interface EditorContentProps {
  currentFormat: string;
  currentDimensions: {
    width: number;
    height: number;
  };
  uploadedImages: UploadedImage[];
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  headlineText: string;
  setHeadlineText: (text: string) => void;
  subheadlineText: string;
  setSubheadlineText: (text: string) => void;
  showPriceTag: boolean;
  setShowPriceTag: (show: boolean) => void;
  priceValue: string;
  setPriceValue: (value: string) => void;
  ctaData: any;
  priceTagPosition: {
    x: number;
    y: number;
  };
  setPriceTagPosition: (position: {
    x: number;
    y: number;
  }) => void;
  handleUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  ctaStyle: 'default' | 'reverse';
  setCtaStyle: (style: 'default' | 'reverse') => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (indexToRemove: number) => void;
  selectedMarket: string;
  updateImagePosition: (index: number, position: { x: number, y: number }) => void;
  updateImageScale: (index: number, scale: number) => void;
}

const EditorContent = ({
  currentFormat,
  currentDimensions,
  uploadedImages,
  activeImageIndex,
  setActiveImageIndex,
  headlineText,
  setHeadlineText,
  subheadlineText,
  setSubheadlineText,
  showPriceTag,
  setShowPriceTag,
  priceValue,
  setPriceValue,
  ctaData,
  priceTagPosition,
  setPriceTagPosition,
  handleUploadClick,
  fileInputRef,
  ctaStyle,
  setCtaStyle,
  handleImageUpload,
  handleRemoveImage,
  selectedMarket,
  updateImagePosition,
  updateImageScale
}: EditorContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="mx-[70px] py-[7px]">
          <CardContent className="p-6 px-0 mx-[14px] py-[64px]">
            <AssetPreview
              currentFormat={currentFormat}
              currentDimensions={currentDimensions}
              uploadedImages={uploadedImages}
              activeImageIndex={activeImageIndex}
              setActiveImageIndex={setActiveImageIndex}
              headlineText={headlineText}
              subheadlineText={subheadlineText}
              showPriceTag={showPriceTag}
              priceValue={priceValue}
              ctaData={ctaData}
              priceTagPosition={priceTagPosition}
              setPriceTagPosition={setPriceTagPosition}
              handleUploadClick={handleUploadClick}
              fileInputRef={fileInputRef}
              ctaStyle={ctaStyle}
              updateImagePosition={updateImagePosition}
              updateImageScale={updateImageScale}
            />
          </CardContent>
        </Card>
        
        <ExamplesCarousel exampleAssets={exampleAssets} />
      </div>
      
      <div>
        <EditorSidebar
          onImageUpload={handleImageUpload}
          headlineText={headlineText}
          setHeadlineText={setHeadlineText}
          subheadlineText={subheadlineText}
          setSubheadlineText={setSubheadlineText}
          showPriceTag={showPriceTag}
          setShowPriceTag={setShowPriceTag}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
          ctaStyle={ctaStyle}
          setCtaStyle={setCtaStyle}
          selectedMarket={selectedMarket}
          uploadedImages={uploadedImages}
          onRemoveImage={handleRemoveImage}
          setActiveImageIndex={setActiveImageIndex}
          activeImageIndex={activeImageIndex}
        />
      </div>
    </div>
  );
};

export default EditorContent;
