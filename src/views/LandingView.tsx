import React, { useState } from 'react';
import { Star, ArrowRight, Activity, Box, Cloud, Database, Layers } from 'lucide-react';
import { authService } from '../lib/auth';

interface LandingViewProps {
  onLogin: () => void;
}

export function LandingView({ onLogin }: LandingViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    // Real flow uses Google Auth for full-stack, but here we'll simulate demo.
    await authService.login('demo@xyrenis.com', 'password123');
    onLogin();
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      {/* Subtle layered gradient glow in the top-left */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#60B1FF] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-[#319AFF] rounded-full blur-[120px] opacity-15"></div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 antialiased">
        
        {/* The "Strong Liquid Glass" Navbar */}
        <nav className="sticky top-[30px] mx-auto w-fit flex items-center gap-8 px-6 py-3 rounded-[16px] backdrop-blur-[50px] bg-white/30 border border-black/10 shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25),0_10px_30px_rgba(0,0,0,0.05)] z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center bg-white/10 backdrop-blur-md border border-gray-200">
              <div className="w-4 h-4 border-[2px] border-blue-600 rounded-sm"></div>
            </div>
            <span className="font-display font-bold text-xl text-gray-900 tracking-tight">Xyrenis</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Company</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
          </div>

          <button 
            onClick={() => handleLogin()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-white/50 backdrop-blur-md border border-white/60 text-sm font-semibold text-gray-900 shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,1),0_2px_10px_rgba(0,0,0,0.05)] hover:bg-white/70 transition-all group"
          >
            {isLoading ? <span className="animate-pulse">Loading...</span> : 'SignUp'}
            <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-32 lg:pt-40 pb-20 px-6 lg:px-16 gap-12">
          
          {/* Hero Content (Left) */}
          <div className="flex-1 max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start z-20">
            
            {/* Badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100 shadow-sm mb-8">
              <span className="text-sm font-bold text-blue-600 tracking-wide uppercase">Xyrenis Advanced Solution</span>
            </div>

            <h1 className="font-display font-bold text-[50px] lg:text-[75px] leading-[1.05] tracking-[rgba(-2px)] text-black mb-6" style={{ letterSpacing: '-2px' }}>
              Work smarter,<br className="hidden lg:block"/> achieve faster
            </h1>
            
            <p className="font-sans text-[18px] tracking-[-1px] text-gray-500 leading-relaxed mb-10 max-w-xl">
              Effortlessly manage your projects, collaborate with your team, and achieve your goals with our intuitive task management tool.
            </p>

            <button 
              onClick={() => handleLogin()}
              className="flex items-center gap-4 px-8 py-4 rounded-[16px] bg-[rgba(0,132,255,0.8)] backdrop-blur-[2px] text-white font-medium text-lg leading-none shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.35),0_12px_30px_rgba(0,132,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              Get Started Now
              <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>

          {/* Uploaded Animated Video (Right) */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative flex justify-center items-center z-10 pointer-events-none">
            <div className="relative w-full max-w-xl mx-auto flex items-center justify-center">
               <video 
                 autoPlay 
                 loop 
                 muted 
                 playsInline 
                 style={{ mixBlendMode: 'multiply', filter: 'contrast(1.2) brightness(1.2)' }}
                 className="w-full h-auto object-contain select-none mix-blend-multiply"
                 src="/video.mp4"
               >
               </video>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
