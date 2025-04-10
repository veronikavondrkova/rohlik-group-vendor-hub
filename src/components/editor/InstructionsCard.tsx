
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const InstructionsCard: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-3">Instructions:</h3>
        <ul className="text-sm space-y-2 text-gray-600 list-disc pl-5">
          <li>Upload one or more high-resolution background images</li>
          <li>Drag images to position them within the frame</li>
          <li>Add headline and subheadline text if needed</li>
          <li>Enable the price tag and drag it to position (right side only)</li>
          <li>Keep important content within the safe zone (dashed border)</li>
          <li>CTA button will be positioned in the bottom-left</li>
          <li>Browse examples in the carousel for inspiration</li>
          <li>Submit for review when finished</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default InstructionsCard;
