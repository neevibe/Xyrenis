import React from "react";
import { mockTasks, mockProjects } from "../data";
import { Calendar as CalendarIcon, Filter, Layers } from "lucide-react";

export function GanttView() {
  const project = mockProjects[0];
  const sortedTasks = [...mockTasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Timeline & Gantt</h1>
          <p className="text-sm text-gray-500 mt-1">Cross-team critical path analysis and execution view.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20">
            <option>Month View</option>
            <option>Quarter View</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex border-b border-gray-200 bg-[#F0F2F5]">
          <div className="w-1/3 p-4 border-r border-gray-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Task / Milestones</span>
            <Layers className="w-4 h-4 text-gray-400" />
          </div>
          <div className="w-2/3 flex">
            {['May 01', 'May 08', 'May 15', 'May 22', 'May 29', 'Jun 05', 'Jun 12', 'Jun 19'].map((date, i) => (
              <div key={i} className="flex-1 p-4 border-r border-gray-200 last:border-r-0 text-center">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto divide-y divide-gray-100 relative">
          <div className="absolute top-0 bottom-0 left-1/3 right-0 flex pointer-events-none">
             {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex-1 border-r border-gray-100 last:border-r-0 border-dashed"></div>
            ))}
          </div>

          <div className="flex items-center hover:bg-gray-50 bg-[#714B67]/5">
            <div className="w-1/3 p-4 border-r border-gray-200">
              <h4 className="text-sm font-bold text-gray-900">{project.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">Parent Initiative</p>
            </div>
            <div className="w-2/3 p-4 relative flex items-center">
              {/* Project Bar */}
              <div className="absolute left-[10%] right-[30%] h-6 bg-[#714B67]/20 rounded-md border border-[#714B67]/40 opacity-80"></div>
            </div>
          </div>

          {sortedTasks.map((task, idx) => {
            // Simulated simplified positioning just for visual representation
            const leftOffset = Math.max(0, 5 + (idx * 15));
            const width = Math.max(10, 30 - (idx * 2));
            
            return (
              <div key={task.id} className="flex items-center bg-white hover:bg-gray-50 transition-colors group">
                <div className="w-1/3 p-4 border-r border-gray-200 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'Blocked' ? 'bg-red-500' : 'bg-[#00A09D]'}`}></div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">{task.title}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-500 font-medium px-1.5 py-0.5 bg-gray-100 rounded">
                        {task.assignees[0].department}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-2/3 p-4 relative flex items-center">
                  {/* Task Bar */}
                  <div 
                    className={`absolute h-8 rounded-md shadow-sm border flex items-center px-2 cursor-pointer
                      ${task.status === 'Completed' ? 'bg-green-500 border-green-600' : 
                        task.status === 'Blocked' ? 'bg-red-500 border-red-600' : 
                        'bg-[#00A09D] border-[#008a87] z-10'}`}
                    style={{ left: `${leftOffset}%`, width: `${width}%` }}
                  >
                    <span className="text-[10px] text-white font-medium truncate mix-blend-screen">{task.progress}%</span>
                  </div>
                  {/* Dependency Line Simulation */}
                  {task.dependencies && idx > 0 && (
                     <svg className="absolute left-0 top-0 w-full h-full pointer-events-none stroke-amber-400 stroke-2" style={{ zIndex: 1 }}>
                       <path d={`M ${leftOffset - 5}% 50% L ${leftOffset}% 50%`} />
                     </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
