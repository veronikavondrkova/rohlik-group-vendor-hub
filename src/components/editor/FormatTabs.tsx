
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FormatTabsProps {
  selectedFormats: string[];
  currentFormat: string;
  setCurrentFormat: (format: string) => void;
}

const FormatTabs = ({ selectedFormats, currentFormat, setCurrentFormat }: FormatTabsProps) => {
  if (selectedFormats.length <= 1) return null;
  
  return (
    <Tabs value={currentFormat} onValueChange={setCurrentFormat} className="mb-6">
      <TabsList>
        {selectedFormats.map(format => (
          <TabsTrigger key={format} value={format}>
            {format.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default FormatTabs;
