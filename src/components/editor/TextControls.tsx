
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextControlsProps {
  headlineText: string;
  setHeadlineText: (text: string) => void;
  subheadlineText: string;
  setSubheadlineText: (text: string) => void;
}

const TextControls: React.FC<TextControlsProps> = ({
  headlineText,
  setHeadlineText,
  subheadlineText,
  setSubheadlineText
}) => {
  return (
    <>
      <div>
        <Label htmlFor="headline">Headline:</Label>
        <Input 
          id="headline" 
          value={headlineText} 
          onChange={e => setHeadlineText(e.target.value)} 
          placeholder="Enter headline text" 
          className="mt-2" 
        />
      </div>
      
      <div>
        <Label htmlFor="subheadline">Subheadline:</Label>
        <Input 
          id="subheadline" 
          value={subheadlineText} 
          onChange={e => setSubheadlineText(e.target.value)} 
          placeholder="Enter subheadline text" 
          className="mt-2" 
        />
      </div>
    </>
  );
};

export default TextControls;
