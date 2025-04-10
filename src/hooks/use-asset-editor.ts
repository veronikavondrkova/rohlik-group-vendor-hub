
import { useState } from 'react';

export const useAssetEditor = () => {
  const [headlineText, setHeadlineText] = useState<string>('');
  const [subheadlineText, setSubheadlineText] = useState<string>('');
  const [showPriceTag, setShowPriceTag] = useState<boolean>(false);
  const [priceValue, setPriceValue] = useState<string>('');
  const [ctaStyle, setCtaStyle] = useState<'default' | 'reverse'>('default');
  
  // Position states for draggable elements
  const [priceTagPosition, setPriceTagPosition] = useState({
    x: 0,
    y: 0
  });

  return {
    headlineText,
    setHeadlineText,
    subheadlineText,
    setSubheadlineText,
    showPriceTag,
    setShowPriceTag,
    priceValue,
    setPriceValue,
    ctaStyle,
    setCtaStyle,
    priceTagPosition,
    setPriceTagPosition
  };
};
