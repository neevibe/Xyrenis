export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'Backlog' | 'Planned' | 'In Progress' | 'Blocked' | 'Review' | 'Completed';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  status: Status;
  priority: Priority;
  assignees: User[];
  dueDate: string;
  progress: number;
  subtasks?: Task[];
  dependencies?: string[]; // task IDs
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'Active' | 'At Risk' | 'Completed';
  progress: number;
  owner?: User;
  team: User[];
  startDate: string;
  dueDate: string;
}

export type ViewState = 'dashboard' | 'projects' | 'kanban' | 'gantt' | 'planner-sync';
