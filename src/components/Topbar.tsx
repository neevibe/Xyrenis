import React from "react";
import { Search, Bell, Sparkles } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full shadow-sm">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search projects, tasks, or MS Planner syncs..." 
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D] transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00A09D] text-white rounded-md text-sm font-medium hover:bg-[#008a87] shadow-sm transition-colors">
          <Sparkles className="w-4 h-4" />
          Ask AI Agent
        </button>
        <button className="relative p-2 text-gray-400 hover:text-gray-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}
