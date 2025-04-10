
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useAssets } from '@/context/AssetContext';
import Header from '@/components/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Asset } from '@/components/review/AssetTypes';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { assets } = useAssets();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

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

  // Status badge color mapping
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default'; // Green
      case 'rejected':
        return 'destructive'; // Red
      case 'pending':
      default:
        return 'secondary'; // Gray
    }
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Preview</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <div className="w-[80px] h-[45px] bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                          {asset.thumbnail ? (
                            <img 
                              src={asset.thumbnail} 
                              alt={asset.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-gray-500">No preview</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>{asset.format}</TableCell>
                      <TableCell>{asset.market}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(asset.status)}>
                          {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{asset.dateSubmitted}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                          onClick={() => handleViewAsset(asset)}
                        >
                          View
                        </Button>
                        {(user?.role === 'supplier' && asset.status === 'pending') && (
                          <Button 
                            size="sm"
                            onClick={() => handleEditAsset(asset.id)}
                          >
                            Edit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No assets found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {selectedAsset && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-3xl">
              <CardHeader>
                <CardTitle>{selectedAsset.name}</CardTitle>
                <CardDescription>
                  {selectedAsset.format} • {selectedAsset.market} • Submitted: {selectedAsset.dateSubmitted}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Preview</h3>
                  <div className="border rounded-md p-4 bg-gray-100 flex items-center justify-center">
                    {selectedAsset.thumbnail ? (
                      <img 
                        src={selectedAsset.thumbnail} 
                        alt={selectedAsset.name} 
                        className="max-h-[300px] object-contain"
                      />
                    ) : (
                      <div className="h-[200px] w-full flex items-center justify-center">
                        <span className="text-gray-500">No preview available</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Details</h3>
                    <ul className="space-y-2">
                      <li><span className="font-medium">Format:</span> {selectedAsset.format}</li>
                      <li><span className="font-medium">Size:</span> {selectedAsset.size}</li>
                      <li><span className="font-medium">Market:</span> {selectedAsset.market}</li>
                      <li><span className="font-medium">Supplier:</span> {selectedAsset.supplier}</li>
                      <li>
                        <span className="font-medium">Status:</span>{' '}
                        <Badge variant={getStatusBadgeVariant(selectedAsset.status)}>
                          {selectedAsset.status.charAt(0).toUpperCase() + selectedAsset.status.slice(1)}
                        </Badge>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Content</h3>
                    <ul className="space-y-2">
                      <li><span className="font-medium">Headline:</span> {selectedAsset.headline}</li>
                      <li><span className="font-medium">Subheadline:</span> {selectedAsset.subheadline}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {(user?.role === 'supplier' && selectedAsset.status === 'pending') && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleEditAsset(selectedAsset.id);
                      handleCloseModal();
                    }}
                  >
                    Edit
                  </Button>
                )}
                <Button onClick={handleCloseModal}>Close</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
