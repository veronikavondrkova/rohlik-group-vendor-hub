
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TextEditorProps {
  headlineText: string;
  setHeadlineText: (text: string) => void;
  subheadlineText: string;
  setSubheadlineText: (text: string) => void;
}

const TextEditor = ({
  headlineText,
  setHeadlineText,
  subheadlineText,
  setSubheadlineText,
}: TextEditorProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-6">
        <h3 className="font-semibold">Edit Text</h3>
        
        <div>
          <Label htmlFor="headline">Headline:</Label>
          <Input 
            id="headline" 
            value={headlineText}
            onChange={(e) => setHeadlineText(e.target.value)}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="subheadline">Subheadline:</Label>
          <Input 
            id="subheadline" 
            value={subheadlineText}
            onChange={(e) => setSubheadlineText(e.target.value)}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TextEditor;
