import React, { useState } from "react";
import { mockTasks, mockUsers } from "../data";
import { Status, Task } from "../types";
import { MoreHorizontal, MessageSquare, Paperclip, AlertCircle, Plus } from "lucide-react";
import { AddTaskModal } from "../components/AddTaskModal";
import { TaskDetailsModal } from "../components/TaskDetailsModal";

const COLUMNS: Status[] = ['Backlog', 'Planned', 'In Progress', 'Blocked', 'Review', 'Completed'];

export function KanbanView() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('Backlog');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Task Orchestration</h1>
          <p className="text-sm text-gray-500 mt-1">Multi-level task fragmentation & MS Planner synced boards.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-4">
            {mockUsers.slice(0, 4).map((user, i) => (
              <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer hover:z-10 relative transition-transform hover:scale-110" src={user.avatar} title={user.name} />
            ))}
          </div>
          <button className="px-4 py-2 bg-[#00A09D] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#008a87] transition-colors">
            AI Auto-Assign
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((column) => {
          const columnTasks = mockTasks.filter(t => t.status === column);
          return (
            <div key={column} className="flex-shrink-0 w-80 flex flex-col bg-[#F0F2F5]/80 border border-gray-200 rounded-xl">
              <div className="p-4 flex items-center justify-between border-b border-gray-200 bg-white/50 rounded-t-xl">
                <h3 className="font-semibold text-gray-700 text-sm">{column}</h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2.5 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[500px]">
                {columnTasks.map(task => (
                  <div 
                    key={task.id} 
                    onClick={() => setSelectedTask(task)}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm
                        ${task.priority === 'Critical' ? 'bg-red-100 text-red-700' : 
                          task.priority === 'High' ? 'bg-orange-100 text-orange-700' : 
                          'bg-blue-100 text-blue-700'}`}>
                        {task.priority}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-3">
                      {task.title}
                    </h4>
                    
                    {task.dependencies && task.dependencies.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded w-fit mb-3">
                        <AlertCircle className="w-3 h-3" />
                        Dependencies
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="flex items-center gap-1 hover:text-gray-600">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">3</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-gray-600">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">1</span>
                        </div>
                      </div>
                      <div className="flex -space-x-1.5">
                        {task.assignees.map((user, i) => (
                          <img key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={user.avatar} title={user.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => { setSelectedStatus(column); setIsAddTaskOpen(true); }}
                  className="w-full py-2 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium hover:bg-gray-100 rounded-lg transition-colors border border-dashed border-gray-300">
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isAddTaskOpen && (
        <AddTaskModal 
          isOpen={isAddTaskOpen} 
          onClose={() => setIsAddTaskOpen(false)} 
          defaultStatus={selectedStatus} 
        />
      )}

      {selectedTask && (
        <TaskDetailsModal 
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
