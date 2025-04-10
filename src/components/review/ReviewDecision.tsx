
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Download } from 'lucide-react';

interface ReviewDecisionProps {
  decision: 'approve' | 'reject' | null;
  setDecision: (decision: 'approve' | 'reject' | null) => void;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  customRejectionReason: string;
  setCustomRejectionReason: (reason: string) => void;
  handleSubmitDecision: () => void;
  rejectionReasons: string[];
}

const ReviewDecision = ({
  decision,
  setDecision,
  rejectionReason,
  setRejectionReason,
  customRejectionReason,
  setCustomRejectionReason,
  handleSubmitDecision,
  rejectionReasons,
}: ReviewDecisionProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Review Decision</h3>
        
        <div className="flex space-x-4 mb-6">
          <Button 
            variant={decision === 'approve' ? 'default' : 'outline'} 
            className={`flex-1 ${decision === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}`}
            onClick={() => setDecision('approve')}
          >
            <CheckCircle className="mr-2" size={18} />
            Approve
          </Button>
          
          <Button
            variant={decision === 'reject' ? 'default' : 'outline'}
            className={`flex-1 ${decision === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}`}
            onClick={() => setDecision('reject')}
          >
            <XCircle className="mr-2" size={18} />
            Reject
          </Button>
        </div>
        
        {decision === 'approve' && (
          <Button
            variant="outline"
            className="w-full mb-4"
          >
            <Download className="mr-2" size={18} />
            Download Asset
          </Button>
        )}
        
        {decision === 'reject' && (
          <div className="space-y-4">
            <h4 className="font-medium">Rejection Reason:</h4>
            
            <RadioGroup value={rejectionReason} onValueChange={setRejectionReason}>
              {rejectionReasons.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason} id={`reason-${reason}`} />
                  <Label htmlFor={`reason-${reason}`}>{reason}</Label>
                </div>
              ))}
            </RadioGroup>
            
            {rejectionReason === 'Other (please specify)' && (
              <Textarea
                placeholder="Please provide details on why this asset is being rejected..."
                value={customRejectionReason}
                onChange={(e) => setCustomRejectionReason(e.target.value)}
              />
            )}
          </div>
        )}
        
        <Button
          className="w-full mt-6"
          onClick={handleSubmitDecision}
        >
          Submit Decision
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewDecision;
