import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { mockUsers, mockProjects, mockTasks } from '../data';
import { db } from '../lib/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { authService } from '../lib/auth';
import { Task } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus?: string;
  defaultProjectId?: string;
}

export function AddTaskModal({ isOpen, onClose, defaultStatus = 'Backlog', defaultProjectId = '' }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(defaultProjectId);
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (projectId) {
      const accessibleProjects = authService.getSecureProjects(mockProjects);
      const allSecureTasks = authService.getSecureTasks(mockTasks, accessibleProjects);
      setAvailableTasks(allSecureTasks.filter(t => t.projectId === projectId));
      setDependencies([]); // reset dependencies when project changes
    } else {
      setAvailableTasks([]);
      setDependencies([]);
    }
  }, [projectId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !projectId || !dueDate || assigneeIds.length === 0) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const tasksRef = collection(db, 'projects', projectId, 'tasks');
      const newTaskRef = doc(tasksRef);
      
      await setDoc(newTaskRef, {
        id: newTaskRef.id,
        title,
        projectId,
        status: defaultStatus,
        priority,
        assigneeIds,
        dueDate,
        progress: progress,
        dependencies
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create task. Check your permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#F0F2F5]">
          <h2 className="font-bold text-gray-800">Add New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">{error}</div>}
          
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Task Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D] text-sm bg-gray-50"
              placeholder="e.g. Design System Handoff"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Project *</label>
            <select 
              value={projectId}
              onChange={e => setProjectId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D] text-sm bg-gray-50"
            >
              <option value="">Select a project...</option>
              {mockProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Priority</label>
              <select 
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D] text-sm bg-gray-50"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Due Date *</label>
              <input 
                type="date" 
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D] text-sm bg-gray-50"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Initial Progress</label>
              <span className="text-xs font-bold text-[#00A09D]">{progress}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              className="w-full accent-[#00A09D]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Assignees *</label>
              <div className="border border-gray-200 rounded-md p-2 h-40 overflow-y-auto space-y-1 bg-gray-50">
                {mockUsers.map(user => (
                  <label key={user.id} className="flex items-center gap-3 p-2 hover:bg-white border border-transparent hover:border-gray-100 rounded-md cursor-pointer transition-colors shadow-sm">
                    <input 
                      type="checkbox" 
                      checked={assigneeIds.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) setAssigneeIds([...assigneeIds, user.id]);
                        else setAssigneeIds(assigneeIds.filter(id => id !== user.id));
                      }}
                      className="w-4 h-4 text-[#00A09D] rounded border-gray-300 focus:ring-[#00A09D]"
                    />
                    <img src={user.avatar} className="w-6 h-6 rounded-full" alt="" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-gray-900 block truncate">{user.name}</span>
                      <span className="text-[10px] uppercase text-gray-500 tracking-widest block truncate">{user.department}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Dependencies</label>
              <div className="border border-gray-200 rounded-md p-2 h-40 overflow-y-auto space-y-1 bg-gray-50 text-sm">
                {availableTasks.length === 0 ? (
                  <div className="p-2 text-gray-500 italic text-center text-xs mt-4">
                    No tasks available in this project.
                  </div>
                ) : (
                  availableTasks.map(task => (
                    <label key={task.id} className="flex items-start gap-3 p-2 hover:bg-white border border-transparent hover:border-gray-100 rounded-md cursor-pointer transition-colors shadow-sm">
                      <input 
                        type="checkbox" 
                        checked={dependencies.includes(task.id)}
                        onChange={(e) => {
                          if (e.target.checked) setDependencies([...dependencies, task.id]);
                          else setDependencies(dependencies.filter(id => id !== task.id));
                        }}
                        className="w-4 h-4 text-[#00A09D] rounded border-gray-300 focus:ring-[#00A09D] mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-gray-900 block truncate leading-tight">{task.title}</span>
                        <span className="text-[10px] uppercase text-gray-500 tracking-widest block truncate mt-0.5">{task.status}</span>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-5 py-2.5 bg-[#00A09D] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#008a87] disabled:opacity-70 flex items-center gap-2 transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
