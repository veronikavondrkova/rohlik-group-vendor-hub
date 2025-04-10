
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { formatDimensions, marketCTAs } from '@/data/assetFormats';
import { useImageUpload } from '@/hooks/use-image-upload';
import { useAssetEditor } from '@/hooks/use-asset-editor';
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
  const { toast } = useToast();
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
  }, [navigate, toast]);

  const handleSubmit = () => {
    // In a real app, we would submit the asset data to a backend
    toast({
      title: "Success",
      description: "Asset submitted for review successfully"
    });
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
