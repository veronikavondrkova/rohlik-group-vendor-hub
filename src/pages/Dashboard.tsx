
import { useState } from 'react';
import Header from '@/components/Header';
import { useUser } from '@/context/UserContext';
import { useAssets } from '@/context/AssetContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, Edit, Grid, List, Clock, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const { assets } = useAssets();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter assets based on user role and status filter
  const filteredAssets = assets.filter(asset => {
    if (user?.role === 'supplier' && asset.supplier !== user.company) {
      return false;
    }
    
    if (statusFilter === 'all') {
      return true;
    }
    
    return asset.status === statusFilter;
  });
  
  const handleCreateNew = () => {
    navigate('/create');
  };
  
  const handleEditAsset = (assetId: string) => {
    navigate(`/editor?id=${assetId}`);
  };
  
  const handleReviewAsset = (assetId: string) => {
    navigate(`/review?id=${assetId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500"><Clock size={14} className="mr-1" /> Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle size={14} className="mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500"><XCircle size={14} className="mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {user?.role === 'supplier' ? 'My Assets' : 'Asset Review Dashboard'}
          </h2>
          
          <div className="flex space-x-4">
            {user?.role === 'supplier' && (
              <Button onClick={handleCreateNew} className="bg-black text-white hover:bg-gray-800">
                Create New Asset
              </Button>
            )}
            
            <div className="border rounded-md p-1 flex">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-sm"
              >
                <List size={18} />
              </Button>
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="rounded-sm"
              >
                <Grid size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {filteredAssets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No assets found matching your criteria.</p>
            {user?.role === 'supplier' && (
              <Button onClick={handleCreateNew}>Create Your First Asset</Button>
            )}
          </div>
        ) : (
          <div className={`grid gap-4 ${viewMode === 'card' ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className={viewMode === 'list' ? 'mb-4' : ''}>
                <div className={`flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}>
                  <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'w-full aspect-video'} bg-gray-200 flex items-center justify-center ${viewMode === 'list' ? 'rounded-l-lg' : 'rounded-t-lg'}`}>
                    {asset.thumbnail ? (
                      <img 
                        src={asset.thumbnail} 
                        alt={asset.name} 
                        className={`${viewMode === 'list' ? 'w-24 h-24 object-cover rounded-l-lg' : 'w-full h-full object-cover rounded-t-lg'}`}
                      />
                    ) : (
                      <p className="text-sm text-gray-500">Preview</p>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{asset.name}</CardTitle>
                          <CardDescription>
                            {asset.format} ({asset.size}) - {asset.market}
                          </CardDescription>
                        </div>
                        {getStatusBadge(asset.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="text-sm text-gray-500">
                        <p>Date Submitted: {asset.dateSubmitted}</p>
                        {user?.role === 'internal' && (
                          <p>Supplier: {asset.supplier}</p>
                        )}
                        {asset.headline && (
                          <p className="font-medium mt-1">Headline: {asset.headline}</p>
                        )}
                        {asset.subheadline && (
                          <p>Subheadline: {asset.subheadline}</p>
                        )}
                        {asset.comments && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded-md text-red-800">
                            <strong>Feedback:</strong> {asset.comments}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <div className="flex space-x-2">
                        {user?.role === 'supplier' && (
                          <>
                            {(asset.status === 'pending' || asset.status === 'rejected') && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditAsset(asset.id)}
                              >
                                <Edit size={16} className="mr-1" /> Edit
                              </Button>
                            )}
                          </>
                        )}
                        
                        {user?.role === 'internal' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReviewAsset(asset.id)}
                          >
                            <Eye size={16} className="mr-1" /> Review
                          </Button>
                        )}
                        
                        {asset.status === 'approved' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            <Download size={16} className="mr-1" /> Download
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
