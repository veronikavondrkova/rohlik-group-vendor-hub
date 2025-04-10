
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  campaignName: string;
  weekNumber: string;
  dateFrom: string;
  dateTo: string;
  market: string;
  selectedFormats: string[];
}

export const useEditorForm = (assetId: string | null, assets: any[]) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData | null>(null);

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
        
        return;
      }
    }
    
    // If not editing or asset not found, check session storage for new asset data
    const storedData = sessionStorage.getItem('createFormData');
    if (storedData) {
      setFormData(JSON.parse(storedData) as FormData);
    } else {
      // If no data found, redirect back to create page
      toast({
        title: "Error",
        description: "No asset data found. Please start again.",
        variant: "destructive"
      });
      navigate('/create');
    }
  }, [navigate, toast, assetId, assets]);

  return { formData };
};
