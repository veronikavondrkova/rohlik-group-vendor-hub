
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { formatDimensions } from '@/data/assetFormats';

interface SubmitHandlerProps {
  formData: any;
  assetId: string | null;
  currentFormat: string;
  headlineText: string;
  subheadlineText: string;
  uploadedImages: any[];
  addAsset: (asset: any) => void;
  updateAsset: (id: string, updates: any) => void;
  setIsSubmitting?: (isSubmitting: boolean) => void;
  overlayOpacity?: number;
  gradientOpacity?: number;
  gradientDirection?: number;
  gradientStartPosition?: number;
  gradientEndPosition?: number;
}

export const useSubmitHandler = ({
  formData,
  assetId,
  currentFormat,
  headlineText,
  subheadlineText,
  uploadedImages,
  addAsset,
  updateAsset,
  setIsSubmitting,
  overlayOpacity = 5,
  gradientOpacity = 50,
  gradientDirection = 180,
  gradientStartPosition = 0,
  gradientEndPosition = 100,
}: SubmitHandlerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();

  const handleSubmit = () => {
    if (!formData || !user) {
      toast({
        title: "Error",
        description: "Missing required data. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    // Set isSubmitting to true to hide the price tag during submission
    if (setIsSubmitting) {
      setIsSubmitting(true);
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
      thumbnail: thumbnailSrc,
      // Save visual settings
      overlayOpacity,
      gradientOpacity,
      gradientDirection,
      gradientStartPosition,
      gradientEndPosition,
      // Add image positions/scaling data
      images: uploadedImages.map(img => ({
        src: img.src,
        fileName: img.fileName,
        position: img.position,
        scale: img.scale
      }))
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
    
    // Reset isSubmitting flag (though it doesn't matter after navigation)
    if (setIsSubmitting) {
      setTimeout(() => setIsSubmitting(false), 500);
    }
    
    // Clear session storage data
    sessionStorage.removeItem('createFormData');
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return { handleSubmit };
};
