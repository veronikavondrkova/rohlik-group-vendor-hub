
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useAssets } from '@/context/AssetContext';
import Header from '@/components/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Asset } from '@/components/review/AssetTypes';
import { useToast } from '@/hooks/use-toast';
import AssetsTable from '@/components/dashboard/AssetsTable';
import AssetDetailModal from '@/components/dashboard/AssetDetailModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { assets, addAsset } = useAssets();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  // Filter assets based on user role
  const filteredAssets = user?.role === 'internal' 
    ? assets 
    : assets.filter(asset => asset.supplier === user?.company);

  const handleCreateNew = () => {
    navigate('/create');
  };

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseModal = () => {
    setSelectedAsset(null);
  };

  const handleEditAsset = (assetId: string) => {
    navigate(`/editor?id=${assetId}`);
  };

  const handleDuplicateAsset = (asset: Asset) => {
    // Create a new asset based on the existing one
    const duplicatedAsset = {
      ...asset,
      id: crypto.randomUUID(), // Generate a new unique ID
      name: `${asset.name} (Copy)`,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
    };

    // Add the duplicated asset to the context
    addAsset(duplicatedAsset);

    toast({
      title: "Asset Duplicated",
      description: "The asset has been duplicated successfully.",
    });
  };

  const handleDownloadAsset = (asset: Asset) => {
    // For now, just show a toast since we can't actually generate a download
    toast({
      title: "Download Initiated",
      description: `Downloading ${asset.name}...`,
    });
    
    // In a real implementation, you would generate and download the asset
    // This could involve making a server request to generate the asset
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto py-[119px] px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Asset Dashboard</h1>
          {user?.role === 'supplier' && (
            <Button onClick={handleCreateNew}>Create New Asset</Button>
          )}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Assets</CardTitle>
            <CardDescription>
              {user?.role === 'supplier' 
                ? 'All assets submitted by your company' 
                : 'All assets awaiting your review'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssetsTable 
              assets={filteredAssets}
              userRole={user?.role || 'supplier'}
              onViewAsset={handleViewAsset}
              onEditAsset={handleEditAsset}
              onDuplicateAsset={handleDuplicateAsset}
              onDownloadAsset={handleDownloadAsset}
            />
          </CardContent>
        </Card>
        
        {selectedAsset && (
          <AssetDetailModal
            asset={selectedAsset}
            userRole={user?.role || 'supplier'}
            onClose={handleCloseModal}
            onEdit={handleEditAsset}
            onDuplicate={handleDuplicateAsset}
            onDownload={handleDownloadAsset}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
