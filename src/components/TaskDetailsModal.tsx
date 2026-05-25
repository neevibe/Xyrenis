import React from 'react';
import { X, Calendar, Flag, Activity } from 'lucide-react';
import { Task } from '../types';
import { TaskComments } from './TaskComments';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetailsModal({ task, onClose }: TaskDetailsModalProps) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-[#F0F2F5] h-full w-full md:w-[600px] md:rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right-full">
        {/* Header */}
        <div className="bg-white p-5 border-b border-gray-200 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex gap-2 items-center mb-2">
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm
                ${task.priority === 'Critical' ? 'bg-red-100 text-red-700' : 
                  task.priority === 'High' ? 'bg-orange-100 text-orange-700' : 
                  'bg-blue-100 text-blue-700'}`}>
                {task.priority}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm bg-gray-100 text-gray-600">
                {task.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {task.title}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide space-y-6">
          {/* Metadata */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">
                Assignees
              </label>
              <div className="flex flex-col gap-2">
                {task.assignees.map((user, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img className="h-6 w-6 rounded-full border border-gray-200" src={user.avatar} alt={user.name} />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1 block">Due Date</label>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <Calendar className="w-4 h-4 text-[#00A09D]" />
                  {task.dueDate}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1 block">Progress</label>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <Activity className="w-4 h-4 text-[#714B67]" />
                  {task.progress}%
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#714B67] h-full rounded-full" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <TaskComments projectId={task.projectId} taskId={task.id} />
        </div>
      </div>
    </div>
  );
}
