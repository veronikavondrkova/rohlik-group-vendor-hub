import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AssetPreview from '@/components/review/AssetPreview';
import ReviewDecision from '@/components/review/ReviewDecision';
import TextEditor from '@/components/review/TextEditor';
import PriceTagEditor from '@/components/review/PriceTagEditor';
import { Asset } from '@/components/review/AssetTypes';
import { useAssets } from '@/context/AssetContext';

// Rejection reason presets
const rejectionReasons = ['Image quality is too low', 'Text is outside the safe zone', 'Incorrect branding elements', 'Not following color guidelines', 'Text is difficult to read', 'Other (please specify)'];

// Price label presets
const priceLabelPresets = ['DÁREK', 'VÝHODNÁ CENA', 'EXKLUZIVNĚ', 'AKCE'];
const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const {
    assets,
    updateAsset
  } = useAssets();

  // Extract the asset ID from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const assetId = searchParams.get('id');
  const [asset, setAsset] = useState<Asset | null>(null);
  const [activeTab, setActiveTab] = useState('preview');
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [headlineText, setHeadlineText] = useState('');
  const [subheadlineText, setSubheadlineText] = useState('');
  const [showPriceTag, setShowPriceTag] = useState(false);
  const [priceValue, setPriceValue] = useState('99');
  const [priceLabel, setPriceLabel] = useState('AKCE');
  const [rejectionReason, setRejectionReason] = useState('');
  const [customRejectionReason, setCustomRejectionReason] = useState('');

  // Load asset data when component mounts or assetId changes
  useEffect(() => {
    if (assetId) {
      const foundAsset = assets.find(a => a.id === assetId);
      if (foundAsset) {
        setAsset(foundAsset);
        setHeadlineText(foundAsset.headline || '');
        setSubheadlineText(foundAsset.subheadline || '');
      } else {
        toast({
          title: "Error",
          description: "Asset not found",
          variant: "destructive"
        });
        navigate('/dashboard');
      }
    } else {
      // No assetId provided, redirect to dashboard
      navigate('/dashboard');
    }
  }, [assetId, assets, navigate, toast]);
  const handleSubmitDecision = () => {
    if (!asset) return;
    if (!decision) {
      toast({
        title: "Error",
        description: "Please select a decision (Approve or Reject)",
        variant: "destructive"
      });
      return;
    }
    if (decision === 'reject' && !rejectionReason) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }

    // Prepare the update data
    const updateData: Partial<Asset> = {
      status: decision,
      headline: headlineText,
      subheadline: subheadlineText,
      // Add rejection reason if applicable
      rejectionReason: decision === 'reject' ? rejectionReason === 'Other (please specify)' ? customRejectionReason : rejectionReason : undefined,
      // Add price label if applicable
      priceLabel: showPriceTag ? priceLabel : undefined
    };

    // Update the asset in context
    updateAsset(asset.id, updateData);
    toast({
      title: "Success",
      description: `Asset ${decision === 'approve' ? 'approved' : 'rejected'} successfully`
    });
    navigate('/dashboard');
  };
  if (!asset) {
    return <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Loading asset...</p>
        </main>
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50 my-[82px]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Review: {asset.name}</h2>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 my-0">
            <AssetPreview asset={asset} headlineText={headlineText} subheadlineText={subheadlineText} showPriceTag={showPriceTag} priceValue={priceValue} priceLabel={priceLabel} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          <div>
            <ReviewDecision decision={decision} setDecision={setDecision} rejectionReason={rejectionReason} setRejectionReason={setRejectionReason} customRejectionReason={customRejectionReason} setCustomRejectionReason={setCustomRejectionReason} handleSubmitDecision={handleSubmitDecision} rejectionReasons={rejectionReasons} />
            
            <TextEditor headlineText={headlineText} setHeadlineText={setHeadlineText} subheadlineText={subheadlineText} setSubheadlineText={setSubheadlineText} />
            
            <PriceTagEditor showPriceTag={showPriceTag} setShowPriceTag={setShowPriceTag} priceValue={priceValue} setPriceValue={setPriceValue} priceLabel={priceLabel} setPriceLabel={setPriceLabel} priceLabelPresets={priceLabelPresets} />
          </div>
        </div>
      </main>
    </div>;
};
export default Review;