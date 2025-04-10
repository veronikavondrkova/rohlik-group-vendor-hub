
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AssetPreview from '@/components/editor/AssetPreview';
import EditorSidebar from '@/components/editor/EditorSidebar';
import ExamplesCarousel from '@/components/editor/ExamplesCarousel';
import { formatDimensions, marketCTAs, exampleAssets } from '@/data/assetFormats';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormData | null>(null);
  const [currentFormat, setCurrentFormat] = useState<string>('');
  const [headlineText, setHeadlineText] = useState<string>('');
  const [subheadlineText, setSubheadlineText] = useState<string>('');
  const [showPriceTag, setShowPriceTag] = useState<boolean>(false);
  const [priceValue, setPriceValue] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  
  // Position states for draggable elements
  const [priceTagPosition, setPriceTagPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [...uploadedImages];
      
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            setUploadedImages(newImages);
            
            // Set the newly uploaded image as active
            setActiveImageIndex(newImages.length - 1);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    // In a real app, we would submit the asset data to a backend
    toast({
      title: "Success",
      description: "Asset submitted for review successfully"
    });
    navigate('/dashboard');
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Editor: {formData.campaignName}</h2>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate('/create')}>
              Back
            </Button>
            <Button onClick={handleSubmit}>
              Submit for Review
            </Button>
          </div>
        </div>
        
        {formData.selectedFormats.length > 1 && (
          <Tabs value={currentFormat} onValueChange={setCurrentFormat} className="mb-6">
            <TabsList>
              {formData.selectedFormats.map(format => (
                <TabsTrigger key={format} value={format}>
                  {format.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mx-[70px]">
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
                  imagePosition={imagePosition}
                  setImagePosition={setImagePosition}
                  priceTagPosition={priceTagPosition}
                  setPriceTagPosition={setPriceTagPosition}
                  handleUploadClick={handleUploadClick}
                  fileInputRef={fileInputRef}
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
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
