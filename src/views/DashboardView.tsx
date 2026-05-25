import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { mockProjects, mockTasks } from "../data";
import { ProjectDashboard } from "../components/ProjectDashboard";

const performanceData = [
  { name: 'Jan', completed: 40, delayed: 24 },
  { name: 'Feb', completed: 30, delayed: 13 },
  { name: 'Mar', completed: 20, delayed: 58 },
  { name: 'Apr', completed: 27, delayed: 39 },
  { name: 'May', completed: 18, delayed: 48 },
  { name: 'Jun', completed: 23, delayed: 38 },
  { name: 'Jul', completed: 34, delayed: 43 },
];

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Enterprise Visibility</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time PMO dashboard and MS Planner insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-[#00A09D] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#008a87] transition-colors">
            Generate AI Summary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: "24", change: "+12%", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Tasks in Planner", value: "842", change: "+5%", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "At Risk Teams", value: "3", change: "-2", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Overall Velocity", value: "88%", change: "+4%", icon: ArrowUpRight, color: "text-[#00A09D]", bg: "bg-teal-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Delivery Velocity vs Delays</h3>
            <select className="text-sm border border-gray-200 rounded-md py-1.5 px-3 text-gray-600 bg-gray-50 focus:outline-none">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A09D" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00A09D" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDelayed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#00A09D" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
                <Area type="monotone" dataKey="delayed" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorDelayed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1A1C1E] text-white rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-2xl">✨</span>
            <h2 className="text-md font-bold tracking-tight uppercase">AI Project Intelligence</h2>
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-white/10 border border-white/10 rounded-lg p-3">
              <p className="text-xs text-purple-300 font-bold mb-1 uppercase">RISK DETECTION</p>
              <p className="text-sm text-gray-200">Infrastructure Setup is 3 days behind. Recommended: Re-assign parallel workstream to Ops B Team.</p>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-lg p-3">
              <p className="text-xs text-[#00A09D] font-bold mb-1 uppercase">PREDICTIVE ANALYTICS</p>
              <p className="text-sm text-gray-200">Launch probability: <span className="text-green-400 font-medium">94%</span> by Q3 end. Dependency bottleneck identified in 'Vendor Onboarding'.</p>
            </div>
            <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#714B67] to-[#00A09D] rounded-lg text-sm font-bold shadow-lg hover:brightness-110 transition-all">
              Execute Smart Optimization
            </button>
          </div>
        </div>
      </div>

      {/* Project-Specific Data Grid */}
      <ProjectDashboard />
    </div>
  );
}
