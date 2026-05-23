import { Project, Task, User } from "./types";

export const mockUsers: User[] = [
  { id: "u1", name: "Alex Mercer", role: "Project Manager", department: "PMO", avatar: "https://i.pravatar.cc/150?u=u1" },
  { id: "u2", name: "Sarah Chen", role: "Lead Developer", department: "Engineering", avatar: "https://i.pravatar.cc/150?u=u2" },
  { id: "u3", name: "Marcus Johnson", role: "UX Designer", department: "Design", avatar: "https://i.pravatar.cc/150?u=u3" },
  { id: "u4", name: "Elena Rodriguez", role: "Product Owner", department: "Product", avatar: "https://i.pravatar.cc/150?u=u4" },
  { id: "u5", name: "David Kim", role: "DevOps Engineer", department: "Engineering", avatar: "https://i.pravatar.cc/150?u=u5" },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Launch New Commercial Retail Zone",
    description: "Orchestrating the rollout of the new retail sector across NA districts.",
    status: "Active",
    progress: 45,
    owner: mockUsers[0],
    team: mockUsers,
    startDate: "2026-05-01",
    dueDate: "2026-08-15",
  },
  {
    id: "p2",
    name: "Enterprise Data Migration",
    description: "Migrating legacy on-prem data to Azure Cloud infrastructure.",
    status: "At Risk",
    progress: 22,
    owner: mockUsers[3],
    team: [mockUsers[1], mockUsers[4]],
    startDate: "2026-04-15",
    dueDate: "2026-06-30",
  },
  {
    id: "p3",
    name: "MS Planner Synchronization API",
    description: "Building the two-way sync between internal PMO and MS Planner.",
    status: "Planning",
    progress: 5,
    owner: mockUsers[1],
    team: [mockUsers[0], mockUsers[1]],
    startDate: "2026-06-01",
    dueDate: "2026-07-20",
  }
];

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Initial Infrastructure Setup",
    projectId: "p1",
    status: "Completed",
    priority: "Critical",
    assignees: [mockUsers[4]],
    dueDate: "2026-05-10",
    progress: 100,
  },
  {
    id: "t2",
    title: "Design System Handoff",
    projectId: "p1",
    status: "In Progress",
    priority: "Medium",
    assignees: [mockUsers[2]],
    dueDate: "2026-05-25",
    progress: 60,
  },
  {
    id: "t3",
    title: "Vendor Onboarding & Procurement",
    projectId: "p1",
    status: "Blocked",
    priority: "High",
    assignees: [mockUsers[0], mockUsers[3]],
    dueDate: "2026-05-28",
    progress: 15,
    dependencies: ["t1"],
  },
  {
    id: "t4",
    title: "Digital Signage Deployment",
    projectId: "p1",
    status: "Planned",
    priority: "Medium",
    assignees: [mockUsers[1], mockUsers[4]],
    dueDate: "2026-06-15",
    progress: 0,
    dependencies: ["t3"],
  },
  {
    id: "t5",
    title: "Compliance Approvals (Legal)",
    projectId: "p1",
    status: "Backlog",
    priority: "High",
    assignees: [mockUsers[0]],
    dueDate: "2026-06-25",
    progress: 0,
  }
];
