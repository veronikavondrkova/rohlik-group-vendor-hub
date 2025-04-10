
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
  // Image data with positions and scaling
  images?: Array<{
    src: string;
    fileName: string;
    position: { x: number, y: number };
    scale: number;
  }>;
}
