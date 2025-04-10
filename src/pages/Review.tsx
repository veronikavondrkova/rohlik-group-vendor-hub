
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AssetPreview from '@/components/review/AssetPreview';
import ReviewDecision from '@/components/review/ReviewDecision';
import TextEditor from '@/components/review/TextEditor';
import PriceTagEditor from '@/components/review/PriceTagEditor';
import { Asset } from '@/components/review/AssetTypes';

// Mock asset data
const mockAsset: Asset = {
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
            <AssetPreview
              asset={asset}
              headlineText={headlineText}
              subheadlineText={subheadlineText}
              showPriceTag={showPriceTag}
              priceValue={priceValue}
              priceLabel={priceLabel}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          
          <div>
            <ReviewDecision
              decision={decision}
              setDecision={setDecision}
              rejectionReason={rejectionReason}
              setRejectionReason={setRejectionReason}
              customRejectionReason={customRejectionReason}
              setCustomRejectionReason={setCustomRejectionReason}
              handleSubmitDecision={handleSubmitDecision}
              rejectionReasons={rejectionReasons}
            />
            
            <TextEditor
              headlineText={headlineText}
              setHeadlineText={setHeadlineText}
              subheadlineText={subheadlineText}
              setSubheadlineText={setSubheadlineText}
            />
            
            <PriceTagEditor
              showPriceTag={showPriceTag}
              setShowPriceTag={setShowPriceTag}
              priceValue={priceValue}
              setPriceValue={setPriceValue}
              priceLabel={priceLabel}
              setPriceLabel={setPriceLabel}
              priceLabelPresets={priceLabelPresets}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Review;
