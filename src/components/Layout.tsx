import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ViewState } from "../types";

interface LayoutProps {
  children: ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col ml-64 min-w-0">
        <Topbar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
