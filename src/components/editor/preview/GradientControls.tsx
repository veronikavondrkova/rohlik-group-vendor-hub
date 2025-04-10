
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GradientControlsProps {
  gradientOpacity: number;
  onGradientOpacityChange: (value: number[]) => void;
  gradientDirection: number;
  onGradientDirectionChange: (value: number) => void;
  gradientStartPosition: number;
  onGradientStartPositionChange: (value: number) => void;
  gradientEndPosition: number;
  onGradientEndPositionChange: (value: number) => void;
}

const GradientControls: React.FC<GradientControlsProps> = ({
  gradientOpacity,
  onGradientOpacityChange,
  gradientDirection,
  onGradientDirectionChange,
  gradientStartPosition,
  onGradientStartPositionChange,
  gradientEndPosition,
  onGradientEndPositionChange
}) => {
  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <h3 className="font-medium">Gradient Controls</h3>
      
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-32">Gradient Opacity:</span>
        <div className="flex-grow">
          <Slider 
            defaultValue={[50]} 
            min={0} 
            max={100} 
            step={5} 
            value={[gradientOpacity]} 
            onValueChange={onGradientOpacityChange} 
          />
        </div>
        <span className="text-sm min-w-12 text-right">{gradientOpacity}%</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Label className="text-sm font-medium w-32">Direction (deg):</Label>
        <Input
          type="number"
          min="0"
          max="360"
          value={gradientDirection}
          onChange={(e) => onGradientDirectionChange(parseInt(e.target.value) || 0)}
          className="w-20"
        />
        <div className="flex-grow">
          <Slider 
            defaultValue={[180]} 
            min={0} 
            max={360} 
            step={15} 
            value={[gradientDirection]} 
            onValueChange={(value) => onGradientDirectionChange(value[0])} 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Label className="text-sm font-medium w-32">Start Position:</Label>
        <Input
          type="number"
          min="0"
          max="100"
          value={gradientStartPosition}
          onChange={(e) => onGradientStartPositionChange(parseInt(e.target.value) || 0)}
          className="w-20"
        />
        <div className="flex-grow">
          <Slider 
            defaultValue={[0]} 
            min={0} 
            max={100} 
            step={5} 
            value={[gradientStartPosition]} 
            onValueChange={(value) => onGradientStartPositionChange(value[0])} 
          />
        </div>
        <span className="text-sm min-w-12 text-right">{gradientStartPosition}%</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Label className="text-sm font-medium w-32">End Position:</Label>
        <Input
          type="number"
          min="0"
          max="100"
          value={gradientEndPosition}
          onChange={(e) => onGradientEndPositionChange(parseInt(e.target.value) || 0)}
          className="w-20"
        />
        <div className="flex-grow">
          <Slider 
            defaultValue={[100]} 
            min={0} 
            max={100} 
            step={5} 
            value={[gradientEndPosition]} 
            onValueChange={(value) => onGradientEndPositionChange(value[0])} 
          />
        </div>
        <span className="text-sm min-w-12 text-right">{gradientEndPosition}%</span>
      </div>
    </div>
  );
};

export default GradientControls;
