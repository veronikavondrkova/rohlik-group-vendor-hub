import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, XCircle, Download, PenLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock asset data
const mockAsset = {
  id: '1',
  name: 'Summer Fruits Campaign',
  format: 'Category Banner',
  size: '976×550px',
  market: 'CZ - Rohlik.cz',
  status: 'pending',
  dateSubmitted: '2025-04-01',
  supplier: 'Demo Supplier Co.',
  headline: 'Summer Fruits',
  subheadline: 'Fresh & Juicy Selection',
  thumbnail: '',
};

// Rejection reason presets
const rejectionReasons = [
  'Image quality is too low',
  'Text is outside the safe zone',
  'Incorrect branding elements',
  'Not following color guidelines',
  'Text is difficult to read',
  'Other (please specify)',
];

// Price label presets
const priceLabelPresets = [
  'DÁREK',
  'VÝHODNÁ CENA',
  'EXKLUZIVNĚ',
  'AKCE',
];

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [asset, setAsset] = useState(mockAsset);
  const [activeTab, setActiveTab] = useState('preview');
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [headlineText, setHeadlineText] = useState(mockAsset.headline);
  const [subheadlineText, setSubheadlineText] = useState(mockAsset.subheadline);
  const [showPriceTag, setShowPriceTag] = useState(false);
  const [priceValue, setPriceValue] = useState('99');
  const [priceLabel, setPriceLabel] = useState('AKCE');
  const [rejectionReason, setRejectionReason] = useState('');
  const [customRejectionReason, setCustomRejectionReason] = useState('');
  
  const handleSubmitDecision = () => {
    if (!decision) {
      toast({
        title: "Error",
        description: "Please select a decision (Approve or Reject)",
        variant: "destructive",
      });
      return;
    }
    
    if (decision === 'reject' && !rejectionReason) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would submit the review decision to a backend
    toast({
      title: "Success",
      description: `Asset ${decision === 'approve' ? 'approved' : 'rejected'} successfully`,
    });
    
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Review: {asset.name}</h2>
          <div className="space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
                        
                        {/* CTA Button - Fixing the '>' character by using {'>'} */}
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
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Review Decision</h3>
                
                <div className="flex space-x-4 mb-6">
                  <Button 
                    variant={decision === 'approve' ? 'default' : 'outline'} 
                    className={`flex-1 ${decision === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => setDecision('approve')}
                  >
                    <CheckCircle className="mr-2" size={18} />
                    Approve
                  </Button>
                  
                  <Button
                    variant={decision === 'reject' ? 'default' : 'outline'}
                    className={`flex-1 ${decision === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                    onClick={() => setDecision('reject')}
                  >
                    <XCircle className="mr-2" size={18} />
                    Reject
                  </Button>
                </div>
                
                {decision === 'approve' && (
                  <Button
                    variant="outline"
                    className="w-full mb-4"
                  >
                    <Download className="mr-2" size={18} />
                    Download Asset
                  </Button>
                )}
                
                {decision === 'reject' && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Rejection Reason:</h4>
                    
                    <RadioGroup value={rejectionReason} onValueChange={setRejectionReason}>
                      {rejectionReasons.map((reason) => (
                        <div key={reason} className="flex items-center space-x-2">
                          <RadioGroupItem value={reason} id={`reason-${reason}`} />
                          <Label htmlFor={`reason-${reason}`}>{reason}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    {rejectionReason === 'Other (please specify)' && (
                      <Textarea
                        placeholder="Please provide details on why this asset is being rejected..."
                        value={customRejectionReason}
                        onChange={(e) => setCustomRejectionReason(e.target.value)}
                      />
                    )}
                  </div>
                )}
                
                <Button
                  className="w-full mt-6"
                  onClick={handleSubmitDecision}
                >
                  Submit Decision
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-semibold">Edit Text</h3>
                
                <div>
                  <Label htmlFor="headline">Headline:</Label>
                  <Input 
                    id="headline" 
                    value={headlineText}
                    onChange={(e) => setHeadlineText(e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subheadline">Subheadline:</Label>
                  <Input 
                    id="subheadline" 
                    value={subheadlineText}
                    onChange={(e) => setSubheadlineText(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Price Tag</h3>
                  <div className="flex items-center">
                    <Label htmlFor="show-price" className="mr-2">Show:</Label>
                    <input 
                      id="show-price" 
                      type="checkbox"
                      checked={showPriceTag}
                      onChange={(e) => setShowPriceTag(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                
                {showPriceTag && (
                  <>
                    <div>
                      <Label htmlFor="price-value">Price Value:</Label>
                      <Input 
                        id="price-value" 
                        value={priceValue}
                        onChange={(e) => setPriceValue(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>Price Label:</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {priceLabelPresets.map((preset) => (
                          <Button
                            key={preset}
                            type="button"
                            variant={priceLabel === preset ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPriceLabel(preset)}
                            className="justify-center"
                          >
                            {preset}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="custom-label">Custom Label:</Label>
                      <Input 
                        id="custom-label" 
                        placeholder="Custom label text"
                        onChange={(e) => setPriceLabel(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Review;
