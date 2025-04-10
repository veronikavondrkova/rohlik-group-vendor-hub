
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { formatDimensions, marketCTAs } from '@/data/assetFormats';
import { useImageUpload } from '@/hooks/use-image-upload';
import { useAssetEditor } from '@/hooks/use-asset-editor';
import { useUser } from '@/context/UserContext';
import { useAssets } from '@/context/AssetContext';
import EditorHeader from '@/components/editor/EditorHeader';
import FormatTabs from '@/components/editor/FormatTabs';
import EditorContent from '@/components/editor/EditorContent';

interface FormData {
  campaignName: string;
  weekNumber: string;
  dateFrom: string;
  dateTo: string;
  market: string;
  selectedFormats: string[];
}

const Editor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assetId = searchParams.get('id');
  const { toast } = useToast();
  const { user } = useUser();
  const { assets, addAsset, updateAsset } = useAssets();
  const [formData, setFormData] = useState<FormData | null>(null);
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

  useEffect(() => {
    // If editing an existing asset, load its data
    if (assetId) {
      const existingAsset = assets.find(asset => asset.id === assetId);
      if (existingAsset) {
        // Set form data from existing asset
        setFormData({
          campaignName: existingAsset.name,
          weekNumber: '', // These may not be in the existing asset
          dateFrom: '',
          dateTo: '',
          market: existingAsset.market.split(' - ')[1] || existingAsset.market,
          selectedFormats: [existingAsset.format]
        });
        
        setCurrentFormat(existingAsset.format);
        
        // Set editor state from existing asset
        setHeadlineText(existingAsset.headline || '');
        setSubheadlineText(existingAsset.subheadline || '');
        
        // Additional asset data could be loaded here
        return;
      }
    }
    
    // If not editing or asset not found, check session storage for new asset data
    const storedData = sessionStorage.getItem('createFormData');
    if (storedData) {
      const parsedData = JSON.parse(storedData) as FormData;
      setFormData(parsedData);
      if (parsedData.selectedFormats.length > 0) {
        setCurrentFormat(parsedData.selectedFormats[0]);
      }
    } else {
      // If no data found, redirect back to create page
      toast({
        title: "Error",
        description: "No asset data found. Please start again.",
        variant: "destructive"
      });
      navigate('/create');
    }
  }, [navigate, toast, assetId, assets, setHeadlineText, setSubheadlineText]);

  const handleSubmit = () => {
    if (!formData || !user) {
      toast({
        title: "Error",
        description: "Missing required data. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    // Create thumbnail from first uploaded image if available
    const thumbnailSrc = uploadedImages.length > 0 ? uploadedImages[0].src : '';
    
    // Prepare new asset or updates to existing asset
    const assetData = {
      id: assetId || uuidv4(),
      name: formData.campaignName,
      format: currentFormat,
      size: formatDimensions[currentFormat as keyof typeof formatDimensions] ? 
        `${formatDimensions[currentFormat as keyof typeof formatDimensions].width}×${formatDimensions[currentFormat as keyof typeof formatDimensions].height}px` : 
        '',
      market: formData.market.includes(' - ') ? formData.market : `${formData.market.substring(0, 2).toUpperCase()} - ${formData.market}`,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      supplier: user.company || 'Unknown Supplier',
      headline: headlineText,
      subheadline: subheadlineText,
      thumbnail: thumbnailSrc
    };
    
    if (assetId) {
      // Update existing asset
      updateAsset(assetId, assetData);
      toast({
        title: "Success",
        description: "Asset updated successfully"
      });
    } else {
      // Add new asset
      addAsset(assetData);
      toast({
        title: "Success",
        description: "Asset submitted for review successfully"
      });
    }
    
    // Clear session storage data
    sessionStorage.removeItem('createFormData');
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

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
