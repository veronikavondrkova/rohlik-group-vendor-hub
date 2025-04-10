import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileIcon, UploadIcon, CheckCircleIcon, Pencil, ExternalLink, BookOpen } from 'lucide-react';
const Homepage = () => {
  const navigate = useNavigate();
  const handleCreateAsset = () => {
    navigate('/create');
  };
  const handleViewDashboard = () => {
    navigate('/dashboard');
  };
  return <div className="min-h-screen flex flex-col">
      {/* Hero Background Image - Full Width and Height */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img src="/placeholder.svg" alt="Background" className="w-full h-full object-cover" />
      </div>
      
      {/* Semi-transparent Header */}
      <Header />
      
      {/* Content with proper z-index */}
      <div className="relative z-10 flex-grow flex flex-col">
        {/* Hero Section with Text Overlay */}
        <section className="pt-32 pb-16 px-4 py-[194px]">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <h2 className="font-bold mb-4 text-5xl text-black text-center">Hey there!</h2>
              <p className="text-xl font-normal text-gray-800 text-center">
                Build on-brand visuals for any Rohlik market.
                Just follow the steps, stick to the basics, and get approved without the back-and-forth.
              </p>
            </div>
          </div>
        </section>
        
        <main className="flex-grow container mx-auto px-4 py-8 z-10 bg-white/0">
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6 mt-8 bg-white/0">
              <Card className="shadow-md hover:shadow-lg transition-shadow bg-stone-50 transform hover:-translate-y-1 hover:shadow-xl py-0 px-0">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-2">
                    <FileIcon className="text-white" size={24} />
                  </div>
                  <CardTitle>1. Choose Format</CardTitle>
                  <CardDescription>
                    Select asset formats and market
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Choose from various formats like category banners, newsletter banners, and more. Select the appropriate market for your asset.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-2">
                    <Pencil className="text-white" size={24} />
                  </div>
                  <CardTitle>2. Create Asset</CardTitle>
                  <CardDescription>
                    Upload images and customize layout
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Use our editor to upload and position images, add text, and place price tags according to brand guidelines.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-2">
                    <CheckCircleIcon className="text-white" size={24} />
                  </div>
                  <CardTitle>3. Submit</CardTitle>
                  <CardDescription>
                    Send for approval and track status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Submit your asset for review by our internal team. Track the status and make edits if requested.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 bg-white px-[45px] mx-0 py-[27px] rounded-md">
              <div className="bg-white">
                <h3 className="text-xl font-semibold mb-4">Do's and Don'ts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-green-200 bg-emerald-50">
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-700">
                        <span className="mr-2 text-xl">✅</span>
                        Do
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Use high-resolution images (at least 300 DPI)</li>
                        <li>Keep text within the safe zone</li>
                        <li>Use brand-specific colors for CTA buttons</li>
                        <li>Place price tags only on the right side</li>
                        <li>Use approved fonts and typography</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-red-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="flex items-center text-red-700">
                        <span className="mr-2 text-xl">⛔</span>
                        Don't
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Use low-quality or pixelated images</li>
                        <li>Overcrowd the asset with too much text</li>
                        <li>Use non-brand colors for CTAs or buttons</li>
                        <li>Place text outside the safe zone</li>
                        <li>Use unapproved fonts or typography styles</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white flex items-center">
                    <BookOpen className="mr-2" size={16} />
                    Download PSD Templates
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Example Assets</h3>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Example asset carousel would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="bg-gray-100 py-6 relative z-10">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500">
              Rohlik Brand Hub © {new Date().getFullYear()} | All rights reserved
            </p>
          </div>
        </footer>
      </div>
    </div>;
};
export default Homepage;