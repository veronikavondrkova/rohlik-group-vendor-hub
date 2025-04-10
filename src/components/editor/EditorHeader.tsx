
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EditorHeaderProps {
  campaignName: string;
  onSubmit: () => void;
}

const EditorHeader = ({ campaignName, onSubmit }: EditorHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex justify-between items-center">
      <h2 className="text-3xl font-bold">Editor: {campaignName}</h2>
      <div className="space-x-4">
        <Button variant="outline" onClick={() => navigate('/create')}>
          Back
        </Button>
        <Button onClick={onSubmit}>
          Submit for Review
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
