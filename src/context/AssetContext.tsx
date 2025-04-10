
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Asset } from '@/components/review/AssetTypes';

// Mock data for initial assets
const mockAssets = [
  {
    id: '1',
    name: 'Summer Fruits Campaign',
    format: 'Category Banner',
    size: '976×550px',
    market: 'CZ - Rohlik.cz',
    status: 'pending',
    dateSubmitted: '2025-04-01',
    supplier: 'Demo Supplier Co.',
    thumbnail: '',
    headline: 'Summer Fruits',
    subheadline: 'Fresh and juicy, straight from the orchard'
  },
  {
    id: '2',
    name: 'Easter Special',
    format: 'Newsletter Banner',
    size: '600×250px',
    market: 'DE - Knuspr.de',
    status: 'approved',
    dateSubmitted: '2025-03-28',
    supplier: 'Demo Supplier Co.',
    thumbnail: '',
    headline: 'Easter Treats',
    subheadline: 'Celebrate with our special selection'
  },
  {
    id: '3',
    name: 'Organic Vegetables Promo',
    format: 'Mix & Match Banner',
    size: '1420×312px',
    market: 'AT - Gurkerl.at',
    status: 'rejected',
    dateSubmitted: '2025-03-25',
    supplier: 'Demo Supplier Co.',
    thumbnail: '',
    headline: 'Organic Vegetables',
    subheadline: 'Fresh from local farms to your table'
  },
  {
    id: '4',
    name: 'Weekly Deals',
    format: 'Microsite Head',
    size: '1230×220px',
    market: 'HU - Kifli.hu',
    status: 'pending',
    dateSubmitted: '2025-04-02',
    supplier: 'Another Supplier Ltd.',
    thumbnail: '',
    headline: 'Weekly Deals',
    subheadline: 'Save big on your favorite products'
  }
];

interface AssetContextType {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  
  // Load assets from localStorage or use mock data on first load
  useEffect(() => {
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets));
    } else {
      setAssets(mockAssets);
    }
  }, []);
  
  // Save assets to localStorage whenever they change
  useEffect(() => {
    if (assets.length > 0) {
      localStorage.setItem('assets', JSON.stringify(assets));
    }
  }, [assets]);
  
  const addAsset = (asset: Asset) => {
    // Ensure the asset has all required properties
    const completeAsset: Asset = {
      ...asset,
      id: asset.id || crypto.randomUUID(),
      status: asset.status || 'pending',
      dateSubmitted: asset.dateSubmitted || new Date().toISOString().split('T')[0]
    };
    
    // Add asset to state and ensure UI updates
    setAssets(current => [...current, completeAsset]);
  };
  
  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(current => 
      current.map(asset => 
        asset.id === id ? { ...asset, ...updates } : asset
      )
    );
  };
  
  const deleteAsset = (id: string) => {
    setAssets(current => current.filter(asset => asset.id !== id));
  };
  
  return (
    <AssetContext.Provider value={{ assets, addAsset, updateAsset, deleteAsset }}>
      {children}
    </AssetContext.Provider>
  );
};
