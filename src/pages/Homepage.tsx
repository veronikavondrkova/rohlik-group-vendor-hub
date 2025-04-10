import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileIcon, UploadIcon, CheckCircleIcon, Pencil, ExternalLink, BookOpen } from 'lucide-react';
const Homepage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleCreateAsset = () => {
    navigate('/create');
  };
  const handleViewDashboard = () => {
    navigate('/dashboard');
  };
  return <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Semi-transparent Header */}
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="pt-32 pb-16 px-4 relative" style={{
      height: "80vh"
    }}>
        {/* Hero Background Image with Parallax Effect */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img src="/vveronika00767_httpss.mj.runzJ0tJwFQ7v0_website_landing_page_im_71f15ae5-4ace-4eb2-bfc8-776adeb00fcb.png" alt="Background" className="w-full h-full object-cover" style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s ease-out'
        }} />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="backdrop-blur-sm rounded-xl p-8 shadow-lg py-[39px] my-[106px] px-[86px] mx-[32px] bg-white/[0.68]">
            <h2 className="mb-4 text-5xl text-black text-center font-extrabold">Hey there!</h2>
            <p className="text-xl font-normal text-gray-800 text-center">Build on-brand vendor visuals for any Rohlik Group market. Just follow the steps, stick to the basics, and get approved without the back-and-forth.</p>
          </div>
        </div>
      </section>
      
      <main className="flex-grow container mx-auto px-4 py-8 z-10 bg-stone-50">
        {/* Move the section up by using negative margin-top */}
        <section className="mb-12 -mt-32 relative z-20 px-[108px]">
          <div className="grid md:grid-cols-3 gap-6 mt-8 py-0 my-0 bg-white/0 mx-auto" style={{
          maxWidth: '80%'
        }}>
            <Card className="shadow-md hover:shadow-lg transition-shadow bg-stone-50 transform hover:-translate-y-1 hover:shadow-xl py-0 px-0">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#0E210F] flex items-center justify-center mb-2 px-0 mx-auto">
                  <FileIcon className="text-white" size={24} />
                </div>
                <CardTitle className="text-center">1. Choose Format</CardTitle>
                <CardDescription className="text-center">
                  Select asset formats and market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 text-center">
                  Choose from various formats like category banners, newsletter banners, and more. Select the appropriate market for your asset.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#0E210F] flex items-center justify-center mb-2 mx-auto">
                  <Pencil className="text-white" size={24} />
                </div>
                <CardTitle className="text-center">2. Create Asset</CardTitle>
                <CardDescription className="text-center">
                  Upload images and customize layout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 text-center">
                  Use our editor to upload and position images, add text, and place price tags according to brand guidelines.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#0E210F] flex items-center justify-center mb-2 mx-auto">
                  <CheckCircleIcon className="text-white" size={24} />
                </div>
                <CardTitle className="text-center">3. Submit</CardTitle>
                <CardDescription className="text-center">
                  Send for approval and track status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 text-center">
                  Submit your asset for review by our internal team. Track the status and make edits if requested.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <div className="grid grid-cols-1 gap-8 items-start">
            {/* Resources Card - Now Full Width */}
            <Card className="shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 hover:shadow-xl bg-stone-50 py-0 px-[2px] mx-[225px]">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-[#0E210F] flex items-center justify-center mb-2 mx-auto">
                    <img src="/adobe-photoshop.png" alt="Adobe Photoshop" className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-center">Resources</CardTitle>
                  <CardDescription className="text-center">
                    Download templates and guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Get access to our full set of templates, design assets, and guidelines to ensure your assets meet our brand standards.
                  </p>
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white flex items-center mx-auto justify-center max-w-xs">
                    <ExternalLink className="mr-2" size={16} />
                    Download PSD Templates
                  </Button>
                </CardContent>
            </Card>
            
            {/* Carousel Section - Now Below Resources */}
            
          </div>
        </section>
        
        <footer className="relative z-10 mx-0 py-[14px] bg-stone-50">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500">
              Rohlik Brand Hub © {new Date().getFullYear()} | All rights reserved
            </p>
          </div>
        </footer>
      </main>
    </div>;
};
export default Homepage;