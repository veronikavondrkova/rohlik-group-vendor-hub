import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
      <h3 className="text-xl font-medium mb-4">How good looks like?</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {exampleAssets.map((example, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-3">
                      <img src={example.src} alt={`Example ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm text-center text-gray-600 mb-3">{example.caption}</p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-sm" onClick={() => setSelectedImage(example.src)}>
                          View {'>>'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="w-full overflow-auto">
                          <img src={example.src} alt={example.caption} className="w-full h-auto object-contain" />
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-2">{example.caption}</p>
                      </DialogContent>
                    </Dialog>
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