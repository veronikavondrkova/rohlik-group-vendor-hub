import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Draggable from '@/components/ui/draggable';

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
  'category-banner': {
    width: 976,
    height: 550
  },
  'newsletter-banner': {
    width: 600,
    height: 250
  },
  'mix-match-banner': {
    width: 1420,
    height: 312
  },
  'microsite-head': {
    width: 1230,
    height: 220
  },
  'microsite-separation': {
    width: 1138,
    height: 180
  }
};

// Market CTA data
const marketCTAs = {
  'cz': {
    text: 'Koupit >>',
    color: '#2F7D3B',
    reverseColor: '#FFFFFF'
  },
  'de': {
    text: 'Jetzt entdecken >>',
    color: '#FF7400',
    reverseColor: '#FFFFFF'
  },
  'at': {
    text: 'Jetzt sparen! >>',
    color: '#2F7D3B',
    reverseColor: '#FFFFFF'
  },
  'hu': {
    text: 'Megnézem >>',
    color: '#2F7D3B',
    reverseColor: '#FFFFFF'
  },
  'ro': {
    text: 'Cumpără >>',
    color: '#FF7400',
    reverseColor: '#FFFFFF'
  }
};

// Example assets for inspiration carousel
const exampleAssets = [
  {
    src: "/lovable-uploads/27ac72ce-dc02-4781-b1b6-02d810af0475.png",
    caption: "Category banner with bold text placement"
  },
  {
    src: "/lovable-uploads/fadae505-df41-4034-9444-3f7f24a7a0bf.png",
    caption: "Newsletter banner with price highlight"
  },
  {
    src: "/public/placeholder.svg",
    caption: "Mix and match banner layout"
  },
  {
    src: "/public/placeholder.svg",
    caption: "Microsite header with product focus"
  },
  {
    src: "/public/placeholder.svg",
    caption: "Separation banner with CTA emphasis"
  }
];

const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  
  const handlePriceTagDrag = (data: { x: number, y: number }) => {
    // Calculate boundaries to keep price tag in the right half of the asset
    if (currentDimensions.width) {
      const rightHalfStart = currentDimensions.width / 4; // Half of half width (at 50% scale)
      const updatedX = Math.max(rightHalfStart, data.x);
      setPriceTagPosition({ x: updatedX, y: data.y });
    } else {
      setPriceTagPosition(data);
    }
  };

  const handleImageDrag = (data: { x: number, y: number }) => {
    setImagePosition(data);
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
                <div 
                  className="relative bg-gray-100 mx-auto overflow-hidden border" 
                  style={{
                    width: `${currentDimensions.width / 2}px`,
                    height: `${currentDimensions.height / 2}px`
                  }}
                >
                  {/* Safe zone overlay */}
                  <div className="absolute inset-0 safe-zone m-[10px]"></div>
                  
                  {/* Background Image */}
                  {uploadedImages.length > 0 ? (
                    <Draggable position={imagePosition} onDrag={handleImageDrag} bounds="parent">
                      <div className="absolute inset-0 cursor-move">
                        <img 
                          src={uploadedImages[activeImageIndex]} 
                          alt="Background" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </Draggable>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        variant="outline" 
                        onClick={handleUploadClick}
                        className="bg-transparent border border-black text-black hover:bg-gray-100"
                      >
                        Upload the image
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
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
                  
                  {/* Price tag (right side) - only if show price tag is checked */}
                  {showPriceTag && uploadedImages.length > 0 && (
                    <Draggable position={priceTagPosition} onDrag={handlePriceTagDrag} bounds="parent">
                      <div className="absolute cursor-move" style={{ top: priceTagPosition.y, left: priceTagPosition.x }}>
                        <div className="bg-rohlik-light text-xs px-2 py-1 text-center mb-1 rounded-t-sm">
                          AKCE
                        </div>
                        <div 
                          className="price-tag flex items-center justify-center font-bold" 
                          style={{ width: '124px', height: '55px' }}
                        >
                          {priceValue ? `${priceValue} Kč` : '99 Kč'}
                        </div>
                      </div>
                    </Draggable>
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
                
                {/* Image thumbnails if multiple images uploaded */}
                {uploadedImages.length > 1 && (
                  <div className="flex gap-2 mt-4 justify-center">
                    {uploadedImages.map((image, index) => (
                      <div 
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-16 h-16 border-2 cursor-pointer overflow-hidden ${
                          index === activeImageIndex ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img src={image} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Examples carousel */}
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Examples for inspiration</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {exampleAssets.map((example, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center p-6">
                            <div className="aspect-video w-full overflow-hidden rounded-lg mb-3">
                              <img 
                                src={example.src} 
                                alt={`Example ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-sm text-center text-gray-600">{example.caption}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex items-center justify-center mt-4">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </div>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="image-upload">Upload Images:</Label>
                  <Button 
                    variant="outline" 
                    onClick={handleUploadClick}
                    className="w-full mt-2 bg-transparent border border-black text-black hover:bg-gray-100"
                  >
                    Upload the image
                  </Button>
                  <input
                    id="image-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For best results, use high-resolution images. You can upload multiple images.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="headline">Headline:</Label>
                  <Input 
                    id="headline" 
                    value={headlineText} 
                    onChange={e => setHeadlineText(e.target.value)} 
                    placeholder="Enter headline text" 
                    className="mt-2" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="subheadline">Subheadline:</Label>
                  <Input 
                    id="subheadline" 
                    value={subheadlineText} 
                    onChange={e => setSubheadlineText(e.target.value)} 
                    placeholder="Enter subheadline text" 
                    className="mt-2" 
                  />
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label htmlFor="show-price" className="text-base font-medium">Show Price Tag:</Label>
                    <Checkbox
                      id="show-price"
                      checked={showPriceTag}
                      onCheckedChange={(checked) => setShowPriceTag(checked === true)}
                    />
                  </div>
                  
                  {showPriceTag && (
                    <div>
                      <Label htmlFor="price-value">Price Value:</Label>
                      <Input 
                        id="price-value" 
                        value={priceValue} 
                        onChange={e => setPriceValue(e.target.value)} 
                        placeholder="e.g. 99" 
                        className="mt-2" 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Drag the price tag to position it on the right side of the asset.
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
                  <li>Upload one or more high-resolution background images</li>
                  <li>Drag images to position them within the frame</li>
                  <li>Add headline and subheadline text if needed</li>
                  <li>Enable the price tag and drag it to position (right side only)</li>
                  <li>Keep important content within the safe zone (dashed border)</li>
                  <li>CTA button will be positioned in the bottom-left</li>
                  <li>Browse examples in the carousel for inspiration</li>
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
