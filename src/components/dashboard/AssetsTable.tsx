
import React from 'react';
import { Copy, Download } from 'lucide-react';
import { Asset } from '@/components/review/AssetTypes';
import { UserRole } from '@/context/UserContext';
import { getStatusBadgeVariant } from '@/utils/statusBadgeUtils';
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

interface AssetsTableProps {
  assets: Asset[];
  userRole: UserRole;
  onViewAsset: (asset: Asset) => void;
  onEditAsset: (assetId: string) => void;
  onDuplicateAsset: (asset: Asset) => void;
  onDownloadAsset: (asset: Asset) => void;
}

const AssetsTable = ({
  assets,
  userRole,
  onViewAsset,
  onEditAsset,
  onDuplicateAsset,
  onDownloadAsset
}: AssetsTableProps) => {
  return (
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
        {assets.length > 0 ? (
          assets.map((asset) => (
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
                  onClick={() => onViewAsset(asset)}
                >
                  View
                </Button>
                {userRole === 'supplier' && (asset.status === 'pending' || asset.status === 'rejected') && (
                  <Button 
                    size="sm"
                    className="mr-2"
                    onClick={() => onEditAsset(asset.id)}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => onDownloadAsset(asset)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                {userRole === 'supplier' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDuplicateAsset(asset)}
                  >
                    <Copy className="h-4 w-4" />
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
  );
};

export default AssetsTable;
