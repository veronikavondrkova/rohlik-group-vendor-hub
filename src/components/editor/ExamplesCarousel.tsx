import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
                    <p className="text-sm text-center text-gray-600">{example.caption}</p>
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