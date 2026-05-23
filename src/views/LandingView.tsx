import React, { useState } from 'react';
import { ShieldCheck, Database, LayoutDashboard, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '../lib/auth';

interface LandingViewProps {
  onLogin: () => void;
}

export function LandingView({ onLogin }: LandingViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if(email && password) {
      setIsLoading(true);
      await authService.login(email, password);
      onLogin();
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row font-sans">
      {/* Left side - Branding */}
      <div className="flex-1 bg-[#1A1C1E] text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#714B67]/30 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-[#00A09D]/20 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="z-10 relative">
          <div className="flex items-center gap-3 text-white font-bold text-2xl tracking-tight mb-20">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
              <div className="w-6 h-6 border-[3px] border-[#714B67] rounded-md"></div>
            </div>
            Xyrenis
          </div>
          
          <h1 className="text-5xl font-display font-bold leading-tight mb-6">
            Intelligent <br/>
            Project <br/>
            Orchestration.
          </h1>
          <p className="text-lg text-gray-400 max-w-md mb-12">
            The centralized execution platform for enterprises. Seamlessly syncs with Microsoft Planner to provide advanced task fragmentation, AI-powered insights, and real-time visibility.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#714B67]/20 p-3 rounded-lg border border-[#714B67]/30">
                <LayoutDashboard className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Enterprise Architecture</h3>
                <p className="text-sm text-gray-400 mt-1">Modular workspaces with complete PMO visibility.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#00A09D]/20 p-3 rounded-lg border border-[#00A09D]/30">
                <Database className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">MS Planner Integration</h3>
                <p className="text-sm text-gray-400 mt-1">Deep two-way sync with your existing Microsoft Graph data.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="z-10 relative text-sm font-medium text-gray-500 mt-20">
          © {new Date().getFullYear()} Xyrenis Inc. Enterprise SaaS.
        </div>
      </div>
      
      {/* Right side - Login */}
      <div className="w-full md:w-[500px] lg:w-[600px] bg-white flex flex-col justify-center items-center p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.05)] z-10">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500">Sign in to your Xyrenis workspace.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D] transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs font-semibold text-[#00A09D] hover:text-[#008a87]">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D] transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-[#00A09D] text-white rounded-lg font-bold shadow-sm hover:bg-[#008a87] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span className="mr-1">Sign In</span> <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-gray-500 bg-[#F0F2F5]/80 p-3 rounded-lg border border-gray-100">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Protected by Enterprise Row-Level Security (RLS)
          </div>
          
          <div className="mt-12 text-center text-sm text-gray-500">
            Don't have an account? <a href="#" className="font-bold text-[#714B67] hover:underline">Contact Sales</a>
          </div>
        </div>
      </div>
    </div>
  );
}
