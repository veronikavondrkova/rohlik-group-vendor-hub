import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Define the asset formats
const assetFormats = [{
  id: 'category-banner',
  name: 'Category Banner',
  size: '976×550px'
}, {
  id: 'newsletter-banner',
  name: 'Newsletter Banner',
  size: '600×250px'
}, {
  id: 'mix-match-banner',
  name: 'Mix & Match Banner',
  size: '1420×312px'
}, {
  id: 'microsite-head',
  name: 'Microsite Head',
  size: '1230×220px (Mobile: 646×300px)'
}, {
  id: 'microsite-separation',
  name: 'Microsite Separation',
  size: '1138×180px (Mobile: 626×180px)'
}];

// Define the markets
const markets = [{
  id: 'cz',
  name: 'CZ - Rohlik.cz',
  color: '#2F7D3B'
}, {
  id: 'de',
  name: 'DE - Knuspr.de',
  color: '#FF7400'
}, {
  id: 'at',
  name: 'AT - Gurkerl.at',
  color: '#2F7D3B'
}, {
  id: 'hu',
  name: 'HU - Kifli.hu',
  color: '#2F7D3B'
}, {
  id: 'ro',
  name: 'RO - Sezamo.ro',
  color: '#FF7400'
}];
const Create = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    campaignName: '',
    weekNumber: '',
    dateFrom: '',
    dateTo: '',
    market: '',
    selectedFormats: [] as string[]
  });
  const handleFormatToggle = (formatId: string) => {
    setFormData(prevData => {
      if (prevData.selectedFormats.includes(formatId)) {
        return {
          ...prevData,
          selectedFormats: prevData.selectedFormats.filter(id => id !== formatId)
        };
      } else {
        return {
          ...prevData,
          selectedFormats: [...prevData.selectedFormats, formatId]
        };
      }
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!formData.campaignName) {
      toast({
        title: "Error",
        description: "Campaign name is required",
        variant: "destructive"
      });
      return;
    }
    if (!formData.market) {
      toast({
        title: "Error",
        description: "Please select a market",
        variant: "destructive"
      });
      return;
    }
    if (formData.selectedFormats.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one asset format",
        variant: "destructive"
      });
      return;
    }

    // Store the form data in session storage to use in the editor
    sessionStorage.setItem('createFormData', JSON.stringify(formData));

    // Navigate to the editor
    navigate('/editor');
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 bg-stone-50 py-[142px]">
        <div className="max-w-3xl mx-auto">
          
          
          <form onSubmit={handleSubmit}>
            <Card className="mb-8 py-[27px]">
              
              <CardContent className="space-y-4 px-[52px] py-0">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name <span className="text-red-500">*</span></Label>
                  <Input id="campaignName" value={formData.campaignName} onChange={e => setFormData({
                  ...formData,
                  campaignName: e.target.value
                })} placeholder="e.g. Summer Fruits Promotion" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weekNumber">Week Number</Label>
                    <Input id="weekNumber" value={formData.weekNumber} onChange={e => setFormData({
                    ...formData,
                    weekNumber: e.target.value
                  })} placeholder="e.g. CW25" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateRange">Date Range</Label>
                    <div className="flex space-x-2">
                      <Input id="dateFrom" type="date" value={formData.dateFrom} onChange={e => setFormData({
                      ...formData,
                      dateFrom: e.target.value
                    })} />
                      <span className="flex items-center">—</span>
                      <Input id="dateTo" type="date" value={formData.dateTo} onChange={e => setFormData({
                      ...formData,
                      dateTo: e.target.value
                    })} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              
              <CardContent className="py-[23px]">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="markets">
                    <AccordionTrigger className="py-2 px-[27px]">
                      {formData.market ? markets.find(m => m.id === formData.market)?.name || 'Select a market' : 'Select a market'}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2 px-[20px]">
                        {markets.map(market => <div key={market.id} className={`p-2 cursor-pointer rounded-md transition-all hover:bg-gray-100 ${formData.market === market.id ? 'bg-gray-100 font-medium' : ''}`} onClick={() => setFormData({
                        ...formData,
                        market: market.id
                      })}>
                            <span>{market.name}</span>
                          </div>)}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              
              <CardContent className="py-[34px] px-[53px]">
                <div className="space-y-4">
                  {assetFormats.map(format => <div key={format.id} className="flex space-x-2">
                      <Checkbox id={format.id} checked={formData.selectedFormats.includes(format.id)} onCheckedChange={() => handleFormatToggle(format.id)} />
                      <div className="grid gap-1.5 leading-none">
                        <label htmlFor={format.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {format.name}
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {format.size}
                        </p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
              <Button type="submit">Continue to Editor</Button>
            </div>
          </form>
        </div>
      </main>
    </div>;
};
export default Create;