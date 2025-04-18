
export interface Asset {
  id: string;
  name: string;
  format: string;
  size: string;
  market: string;
  status: string;
  dateSubmitted: string;
  supplier: string;
  headline: string;
  subheadline: string;
  thumbnail: string;
  // Visual settings
  overlayOpacity?: number;
  gradientOpacity?: number;
  gradientDirection?: number;
  gradientStartPosition?: number;
  gradientEndPosition?: number;
  priceLabel?: string;
  priceValue?: string; // Add price value property
  rejectionReason?: string;
  priceTagPosition?: { x: number, y: number }; // Price tag position property
  // Image data with positions and scaling
  images?: Array<{
    src: string;
    fileName: string;
    position: { x: number, y: number };
    scale: number;
  }>;
}
