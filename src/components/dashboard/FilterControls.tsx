
import React from 'react';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface FilterControlsProps {
  statusFilter: string;
  formatFilter: string;
  onStatusFilterChange: (value: string) => void;
  onFormatFilterChange: (value: string) => void;
  onClearFilters: () => void;
  formats: string[];
}

const FilterControls = ({
  statusFilter,
  formatFilter,
  onStatusFilterChange,
  onFormatFilterChange,
  onClearFilters,
  formats
}: FilterControlsProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center">
        <span className="mr-2 text-sm font-medium">Status:</span>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <span className="mr-2 text-sm font-medium">Format:</span>
        <Select value={formatFilter} onValueChange={onFormatFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All formats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All formats</SelectItem>
            {formats.map(format => (
              <SelectItem key={format} value={format}>{format}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(statusFilter !== 'all' || formatFilter !== 'all') && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearFilters}
          className="ml-2"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
};

export default FilterControls;
