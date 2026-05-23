import React from "react";
import { ViewState } from "../types";
import { 
  LayoutDashboard, 
  Briefcase, 
  KanbanSquare, 
  GanttChartSquare, 
  ArrowLeftRight,
  Settings,
  Users,
  Search,
  Bell
} from "lucide-react";
import { cn } from "../lib/utils";
import { authService } from "../lib/auth";

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "kanban", label: "Kanban Board", icon: KanbanSquare },
    { id: "gantt", label: "Timeline & Gantt", icon: GanttChartSquare },
    { id: "planner-sync", label: "Planner Sync", icon: ArrowLeftRight },
  ] as const;

  return (
    <aside className="w-64 bg-[#714B67] text-white flex flex-col h-screen fixed left-0 top-0 border-r border-white/10 z-20">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3 text-white font-bold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-[#714B67] rounded-sm"></div>
          </div>
          Xyrenis
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <div className="text-[10px] uppercase font-bold tracking-wider mb-2 px-3 text-white/60">Workspace</div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewState)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer",
                  isActive 
                    ? "bg-white/10 text-white font-medium shadow-sm" 
                    : "hover:bg-white/5 text-white/70 hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-white opacity-100" : "opacity-80")} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 text-[10px] uppercase font-bold tracking-wider mb-2 px-3 text-white/60">Administration</div>
        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer hover:bg-white/5 text-white/70 hover:text-white">
            <Users className="w-5 h-5 opacity-80" />
            Team Directory
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer hover:bg-white/5 text-white/70 hover:text-white">
            <Settings className="w-5 h-5 opacity-80" />
            Settings
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <img src={authService.getSession()?.user.avatar || "https://i.pravatar.cc/150?u=fallback"} alt="User" className="w-9 h-9 rounded-full bg-white/20 border border-white/10" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{authService.getSession()?.user.name || "Administrator"}</p>
            <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold truncate">{authService.getSession()?.user.department || "Enterprise Roles"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
