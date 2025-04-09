
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  campaignName: string;
  weekNumber: string;
  dateFrom: string;
  dateTo: string;
  market: string;
  selectedFormats: string[];
}

// Asset format dimensions
const formatDimensions = {
  'category-banner': { width: 976, height: 550 },
  'newsletter-banner': { width: 600, height: 250 },
  'mix-match-banner': { width: 1420, height: 312 },
  'microsite-head': { width: 1230, height: 220 },
  'microsite-separation': { width: 1138, height: 180 },
};

// Market CTA data
const marketCTAs = {
  'cz': { text: 'Koupit >>', color: '#2F7D3B', reverseColor: '#FFFFFF' },
  'de': { text: 'Jetzt entdecken >>', color: '#FF7400', reverseColor: '#FFFFFF' },
  'at': { text: 'Jetzt sparen! >>', color: '#2F7D3B', reverseColor: '#FFFFFF' },
  'hu': { text: 'Megnézem >>', color: '#2F7D3B', reverseColor: '#FFFFFF' },
  'ro': { text: 'Cumpără >>', color: '#FF7400', reverseColor: '#FFFFFF' },
};

const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData | null>(null);
  const [currentFormat, setCurrentFormat] = useState<string>('');
  const [headlineText, setHeadlineText] = useState<string>('');
  const [subheadlineText, setSubheadlineText] = useState<string>('');
  const [showPriceTag, setShowPriceTag] = useState<boolean>(false);
  const [priceValue, setPriceValue] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
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
        variant: "destructive",
      });
      navigate('/create');
    }
  }, [navigate, toast]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = () => {
    // In a real app, we would submit the asset data to a backend
    toast({
      title: "Success",
      description: "Asset submitted for review successfully",
    });
    navigate('/dashboard');
  };
  
  if (!formData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // Get current format dimensions
  const currentDimensions = currentFormat ? formatDimensions[currentFormat as keyof typeof formatDimensions] : { width: 0, height: 0 };
  
  // Get CTA data for selected market
  const ctaData = marketCTAs[formData.market as keyof typeof marketCTAs];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Editor: {formData.campaignName}</h2>
          <div className="space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/create')}
            >
              Back
            </Button>
            <Button 
              onClick={handleSubmit}
            >
              Submit for Review
            </Button>
          </div>
        </div>
        
        {formData.selectedFormats.length > 1 && (
          <Tabs 
            value={currentFormat} 
            onValueChange={setCurrentFormat}
            className="mb-6"
          >
            <TabsList>
              {formData.selectedFormats.map((format) => (
                <TabsTrigger key={format} value={format}>
                  {format.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div 
                  className="relative bg-white mx-auto overflow-hidden border"
                  style={{ 
                    width: `${currentDimensions.width / 2}px`, 
                    height: `${currentDimensions.height / 2}px`
                  }}
                >
                  {/* Safe zone overlay */}
                  <div 
                    className="absolute inset-0 safe-zone m-[10px]"
                  ></div>
                  
                  {/* Background Image */}
                  {uploadedImage && (
                    <div className="absolute inset-0">
                      <img 
                        src={uploadedImage} 
                        alt="Background" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 p-4 w-1/2">
                    {headlineText && (
                      <div className="text-white font-bold text-lg mb-1 text-shadow">
                        {headlineText}
                      </div>
                    )}
                    
                    {subheadlineText && (
                      <div className="text-white text-sm mb-3 text-shadow">
                        {subheadlineText}
                      </div>
                    )}
                    
                    {/* CTA Button */}
                    <button 
                      className={`px-3 py-1 text-xs rounded font-medium ${
                        formData.market === 'cz' || formData.market === 'hu' || formData.market === 'at'
                          ? 'cta-button-cz'
                          : 'cta-button-de'
                      }`}
                    >
                      {ctaData?.text || 'Buy now >>'}
                    </button>
                  </div>
                  
                  {/* Price tag (right side) */}
                  {showPriceTag && (
                    <div className="absolute top-1/4 right-8">
                      <div className="bg-rohlik-light text-xs px-2 py-1 text-center mb-1 rounded-t-sm">
                        AKCE
                      </div>
                      <div className="price-tag flex items-center justify-center font-bold" style={{ width: '124px', height: '55px' }}>
                        {priceValue ? `${priceValue} Kč` : '99 Kč'}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center mt-4 text-sm text-gray-500">
                  {currentFormat && (
                    <p>
                      {currentFormat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - 
                      {currentDimensions.width} × {currentDimensions.height}px (Shown at 50% scale)
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="image-upload">Upload Background Image:</Label>
                  <Input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For best results, use high-resolution images with dimensions matching the selected format.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="headline">Headline:</Label>
                  <Input 
                    id="headline" 
                    value={headlineText}
                    onChange={(e) => setHeadlineText(e.target.value)}
                    placeholder="Enter headline text"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subheadline">Subheadline:</Label>
                  <Input 
                    id="subheadline" 
                    value={subheadlineText}
                    onChange={(e) => setSubheadlineText(e.target.value)}
                    placeholder="Enter subheadline text"
                    className="mt-2"
                  />
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label htmlFor="show-price">Show Price Tag (Preview Only):</Label>
                    <input 
                      id="show-price" 
                      type="checkbox"
                      checked={showPriceTag}
                      onChange={(e) => setShowPriceTag(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </div>
                  
                  {showPriceTag && (
                    <div>
                      <Label htmlFor="price-value">Price Value:</Label>
                      <Input 
                        id="price-value" 
                        value={priceValue}
                        onChange={(e) => setPriceValue(e.target.value)}
                        placeholder="e.g. 99"
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Note: Price tags are for preview only and will not be included in the final asset.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Instructions:</h3>
                <ul className="text-sm space-y-2 text-gray-600 list-disc pl-5">
                  <li>Upload a high-resolution background image</li>
                  <li>Add headline and subheadline text if needed</li>
                  <li>Keep important content within the safe zone (dashed border)</li>
                  <li>CTA button will be positioned in the bottom-left</li>
                  <li>Price tag is for preview only and will not appear in the final asset</li>
                  <li>Submit for review when finished</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
