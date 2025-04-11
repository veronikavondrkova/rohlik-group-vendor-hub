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
import { formatDimensions } from '@/data/assetFormats';

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
  // Removing the activeTab state since we no longer have tabs
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [headlineText, setHeadlineText] = useState('');
  const [subheadlineText, setSubheadlineText] = useState('');
  const [showPriceTag, setShowPriceTag] = useState(false);
  const [showPriceLabel, setShowPriceLabel] = useState(true);
  const [priceValue, setPriceValue] = useState('99');
  const [priceLabel, setPriceLabel] = useState('AKCE');
  const [rejectionReason, setRejectionReason] = useState('');
  const [customRejectionReason, setCustomRejectionReason] = useState('');
  // Price tag position state
  const [priceTagPosition, setPriceTagPosition] = useState({
    x: 700,
    y: 100
  });

  // Calculate dimensions based on asset format
  const [assetDimensions, setAssetDimensions] = useState({
    width: 976,
    height: 550
  });

  // Load asset data when component mounts or assetId changes
  useEffect(() => {
    if (assetId) {
      const foundAsset = assets.find(a => a.id === assetId);
      if (foundAsset) {
        setAsset(foundAsset);
        setHeadlineText(foundAsset.headline || '');
        setSubheadlineText(foundAsset.subheadline || '');

        // Initialize price tag position from asset if it exists
        if (foundAsset.priceTagPosition) {
          setPriceTagPosition(foundAsset.priceTagPosition);
        }

        // Set dimensions based on asset format
        if (foundAsset.format && formatDimensions[foundAsset.format as keyof typeof formatDimensions]) {
          setAssetDimensions(formatDimensions[foundAsset.format as keyof typeof formatDimensions]);
        }
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
      // Add price tag data if applicable
      priceLabel: showPriceTag && showPriceLabel ? priceLabel : undefined,
      // Add price tag position to the asset data if showing price tag
      priceTagPosition: showPriceTag ? priceTagPosition : undefined,
      // Add price value if showing price tag
      priceValue: showPriceTag ? priceValue : undefined
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

  // Handle price tag position update
  const handlePriceTagDrag = (position: {
    x: number;
    y: number;
  }) => {
    setPriceTagPosition(position);
  };
  return <div className="min-h-screen flex flex-col bg-gray-50 my-[82px]">
      {/* Use black background for header on this page */}
      <Header className="bg-black" />
      
      <main className="flex-grow container mx-auto px-4 py-[41px]">
        
        
        {/* Layout with preview and controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 py-0 my-0">
            <div className="mx-[70px] py-[7px]">
              <div className="p-6 px-0 mx-[14px] py-0">
                {/* Pass an empty string as activeTab and a no-op function as setActiveTab */}
                <AssetPreview asset={asset} headlineText={headlineText} subheadlineText={subheadlineText} showPriceTag={showPriceTag} priceValue={priceValue} priceLabel={showPriceLabel ? priceLabel : ''} activeTab="" setActiveTab={() => {}} priceTagPosition={priceTagPosition} onPriceTagDrag={handlePriceTagDrag} assetDimensions={assetDimensions} />
              </div>
            </div>
          </div>
          
          {/* Controls take 1/3 of the width */}
          <div className="space-y-4">
            <ReviewDecision decision={decision} setDecision={setDecision} rejectionReason={rejectionReason} setRejectionReason={setRejectionReason} customRejectionReason={customRejectionReason} setCustomRejectionReason={setCustomRejectionReason} handleSubmitDecision={handleSubmitDecision} rejectionReasons={rejectionReasons} />
            
            <TextEditor headlineText={headlineText} setHeadlineText={setHeadlineText} subheadlineText={subheadlineText} setSubheadlineText={setSubheadlineText} />
            
            <PriceTagEditor showPriceTag={showPriceTag} setShowPriceTag={setShowPriceTag} showPriceLabel={showPriceLabel} setShowPriceLabel={setShowPriceLabel} priceValue={priceValue} setPriceValue={setPriceValue} priceLabel={priceLabel} setPriceLabel={setPriceLabel} priceLabelPresets={priceLabelPresets} />
          </div>
        </div>
      </main>
    </div>;
};
export default Review;