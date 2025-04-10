import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
interface ExampleAsset {
  src: string;
  caption: string;
}
interface ExamplesCarouselProps {
  exampleAssets: ExampleAsset[];
}
const ExamplesCarousel: React.FC<ExamplesCarouselProps> = ({
  exampleAssets
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return <div className="mt-8">
      <h3 className="font-medium mb-4 text-xl">How good looks like?</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {exampleAssets.map((example, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-3 relative group">
                      <img src={example.src} alt={`Example ${index + 1}`} className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="absolute top-2 right-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setSelectedImage(example.src)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <div className="w-full overflow-auto">
                            <img src={example.src} alt={example.caption} className="w-full h-auto object-contain" />
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-2">{example.caption}</p>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-sm text-center text-gray-600 mb-3">{example.caption}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>)}
        </CarouselContent>
        <div className="flex items-center justify-center mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>;
};
export default ExamplesCarousel;