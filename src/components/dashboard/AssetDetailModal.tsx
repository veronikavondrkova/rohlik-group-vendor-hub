
import React from 'react';
import { Copy, Download } from 'lucide-react';
import { Asset } from '@/components/review/AssetTypes';
import { UserRole } from '@/context/UserContext';
import { getStatusBadgeVariant } from '@/utils/statusBadgeUtils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AssetDetailModalProps {
  asset: Asset;
  userRole: UserRole;
  onClose: () => void;
  onEdit: (assetId: string) => void;
  onDuplicate: (asset: Asset) => void;
  onDownload: (asset: Asset) => void;
}

const AssetDetailModal = ({
  asset,
  userRole,
  onClose,
  onEdit,
  onDuplicate,
  onDownload
}: AssetDetailModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>{asset.name}</CardTitle>
          <CardDescription>
            {asset.format} • {asset.market} • Submitted: {asset.dateSubmitted}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Preview</h3>
            <div className="border rounded-md p-4 bg-gray-100 flex items-center justify-center">
              {asset.thumbnail ? (
                <img 
                  src={asset.thumbnail} 
                  alt={asset.name} 
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
                <li><span className="font-medium">Format:</span> {asset.format}</li>
                <li><span className="font-medium">Size:</span> {asset.size}</li>
                <li><span className="font-medium">Market:</span> {asset.market}</li>
                <li><span className="font-medium">Supplier:</span> {asset.supplier}</li>
                <li>
                  <span className="font-medium">Status:</span>{' '}
                  <Badge variant={getStatusBadgeVariant(asset.status)}>
                    {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                  </Badge>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Content</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Headline:</span> {asset.headline}</li>
                <li><span className="font-medium">Subheadline:</span> {asset.subheadline}</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => onDownload(asset)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          {userRole === 'supplier' && (
            <Button 
              variant="outline"
              onClick={() => onDuplicate(asset)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </Button>
          )}
          {userRole === 'supplier' && (asset.status === 'pending' || asset.status === 'rejected') && (
            <Button 
              variant="outline"
              onClick={() => {
                onEdit(asset.id);
                onClose();
              }}
            >
              Edit
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssetDetailModal;
