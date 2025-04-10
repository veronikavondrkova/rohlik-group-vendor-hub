
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { formatDimensions, marketCTAs } from '@/data/assetFormats';
import { useImageUpload } from '@/hooks/use-image-upload';
import { useAssetEditor } from '@/hooks/use-asset-editor';
import { useAssets } from '@/context/AssetContext';
import EditorHeader from '@/components/editor/EditorHeader';
import FormatTabs from '@/components/editor/FormatTabs';
import EditorContent from '@/components/editor/EditorContent';
import { useEditorForm } from '@/hooks/use-editor-form';
import { useSubmitHandler } from '@/components/editor/EditorSubmitHandler';

const Editor = () => {
  const [searchParams] = useSearchParams();
  const assetId = searchParams.get('id');
  const { assets, addAsset, updateAsset } = useAssets();
  const [currentFormat, setCurrentFormat] = useState<string>('');

  // Use custom hooks for state management
  const {
    fileInputRef,
    uploadedImages,
    activeImageIndex,
    setActiveImageIndex,
    handleImageUpload,
    handleRemoveImage,
    handleUploadClick,
    updateImagePosition,
    updateImageScale
  } = useImageUpload();

  const {
    headlineText,
    setHeadlineText,
    subheadlineText,
    setSubheadlineText,
    showPriceTag,
    setShowPriceTag,
    priceValue,
    setPriceValue,
    ctaStyle,
    setCtaStyle,
    priceTagPosition,
    setPriceTagPosition
  } = useAssetEditor();

  // Use our new custom hooks
  const { formData } = useEditorForm(assetId, assets);
  
  const { handleSubmit } = useSubmitHandler({
    formData,
    assetId,
    currentFormat,
    headlineText,
    subheadlineText,
    uploadedImages,
    addAsset,
    updateAsset
  });

  useEffect(() => {
    // Load existing asset data for editing
    if (assetId) {
      const existingAsset = assets.find(asset => asset.id === assetId);
      if (existingAsset) {
        // Set editor state from existing asset
        setHeadlineText(existingAsset.headline || '');
        setSubheadlineText(existingAsset.subheadline || '');
      }
    }
  }, [assetId, assets, setHeadlineText, setSubheadlineText]);

  useEffect(() => {
    // Set current format when form data changes
    if (formData?.selectedFormats.length > 0) {
      setCurrentFormat(formData.selectedFormats[0]);
    }
  }, [formData]);

  if (!formData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Get current format dimensions
  const currentDimensions = currentFormat ? formatDimensions[currentFormat as keyof typeof formatDimensions] : {
    width: 0,
    height: 0
  };

  // Get CTA data for selected market
  const ctaData = marketCTAs[formData.market as keyof typeof marketCTAs];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-[119px]">
        <EditorHeader 
          campaignName={formData.campaignName} 
          onSubmit={handleSubmit} 
        />
        
        <FormatTabs
          selectedFormats={formData.selectedFormats}
          currentFormat={currentFormat}
          setCurrentFormat={setCurrentFormat}
        />
        
        <EditorContent
          currentFormat={currentFormat}
          currentDimensions={currentDimensions}
          uploadedImages={uploadedImages}
          activeImageIndex={activeImageIndex}
          setActiveImageIndex={setActiveImageIndex}
          headlineText={headlineText}
          setHeadlineText={setHeadlineText}
          subheadlineText={subheadlineText}
          setSubheadlineText={setSubheadlineText}
          showPriceTag={showPriceTag}
          setShowPriceTag={setShowPriceTag}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
          ctaData={ctaData}
          priceTagPosition={priceTagPosition}
          setPriceTagPosition={setPriceTagPosition}
          handleUploadClick={handleUploadClick}
          fileInputRef={fileInputRef}
          ctaStyle={ctaStyle}
          setCtaStyle={setCtaStyle}
          handleImageUpload={handleImageUpload}
          handleRemoveImage={handleRemoveImage}
          selectedMarket={formData.market}
          updateImagePosition={updateImagePosition}
          updateImageScale={updateImageScale}
        />
      </main>
    </div>
  );
};

export default Editor;
