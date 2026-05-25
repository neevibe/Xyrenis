import React, { useState, useEffect } from 'react';
import { Project, Task } from '../types';
import { authService } from '../lib/auth';
import { mockProjects, mockTasks } from '../data';
import { Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectDashboardProps {
  projectId?: string;
}

export function ProjectDashboard({ projectId }: ProjectDashboardProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [accessibleProjects, setAccessibleProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    const session = authService.getSession();
    if (!session) return;
    
    // Utilize the secure data hooks/methods to enforce Row-Level Security
    const projects = authService.getSecureProjects(mockProjects);
    setAccessibleProjects(projects);
    
    const targetId = projectId || (projects.length > 0 ? projects[0].id : '');
    setSelectedId(targetId);
  }, [projectId]);

  useEffect(() => {
    if (selectedId) {
      const p = accessibleProjects.find(pr => pr.id === selectedId);
      setProject(p || null);
      
      if (p) {
        // Securely fetch only tasks within permitted scope
        const allSecureTasks = authService.getSecureTasks(mockTasks, accessibleProjects);
        setTasks(allSecureTasks.filter(t => t.projectId === selectedId));
      } else {
        setTasks([]);
      }
    }
  }, [selectedId, accessibleProjects]);

  if (accessibleProjects.length === 0) {
     return (
       <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
         <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
         <h3 className="font-bold text-gray-800">No Projects Found</h3>
         <p className="text-sm text-gray-500">You don't have access to any assigned projects via RLS.</p>
       </div>
     );
  }

  if (!project) {
    return null;
  }

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const blockedTasks = tasks.filter(t => t.status === 'Blocked').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;

  const performanceData = [
    { name: 'Week 1', velocity: 10, target: 15 },
    { name: 'Week 2', velocity: 25, target: 30 },
    { name: 'Week 3', velocity: 45, target: 45 },
    { name: 'Week 4', velocity: Math.max(project.progress, 50), target: 60 },
  ];

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between mb-4 border-t border-gray-200 pt-8">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-[#00A09D]">❖</span> Project Deep Dive Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">Real-time statistics for selected project with RLS filtered tasks.</p>
        </div>
        <select 
          className="text-sm font-semibold border border-gray-200 rounded-md py-2 px-4 shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D] transition-all cursor-pointer"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {accessibleProjects.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.status})</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Overall Progress", value: `${project.progress}%`, icon: ArrowRight, color: "text-[#00A09D]", bg: "bg-teal-50" },
          { label: "Completed Tasks", value: completedTasks.toString(), icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Blocked/At Risk", value: blockedTasks.toString(), icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "In Progress", value: inProgressTasks.toString(), icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Sprint Velocity</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A09D" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00A09D" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#714B67" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#714B67" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="velocity" stroke="#00A09D" strokeWidth={2} fillOpacity={1} fill="url(#colorVelocity)" />
                <Area type="monotone" dataKey="target" stroke="#714B67" strokeDasharray="5 5" strokeWidth={2} fillOpacity={1} fill="url(#colorTarget)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {blockedTasks > 0 ? (
           <div className="bg-[#FFF4ED] rounded-xl p-6 border border-[#FFD8B8] flex flex-col justify-center">
             <div className="p-3 bg-amber-100 rounded-lg text-amber-600 w-fit mb-4">
               <AlertCircle className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-bold text-amber-900 text-lg">Attention Required</h3>
               <p className="text-sm text-amber-800 mt-2 font-medium">There are <span className="font-bold">{blockedTasks}</span> tasks currently blocked in this project.</p>
               <p className="text-sm text-amber-800/80 mt-2">Please review the Kanban board to unblock team members and resolve dependencies.</p>
             </div>
             <button className="mt-6 py-2 px-4 bg-amber-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-amber-700 transition-colors">
               Review Blockers
             </button>
           </div>
        ) : (
           <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex flex-col justify-center">
             <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600 w-fit mb-4">
               <CheckCircle2 className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-bold text-emerald-900 text-lg">Execution Healthy</h3>
               <p className="text-sm text-emerald-800 mt-2 font-medium">There are no blocked tasks in this project.</p>
               <p className="text-sm text-emerald-800/80 mt-2">The timeline is progressing as expected without critical bottlenecks.</p>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
