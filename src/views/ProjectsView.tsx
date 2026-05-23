import React from "react";
import { mockProjects } from "../data";
import { MoreHorizontal, Plus, Filter, Calendar } from "lucide-react";

export function ProjectsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Active Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage project portfolios and fragment large milestones.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00A09D] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#008a87] transition-colors">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F0F2F5]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Timeline</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-4 relative"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {mockProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">{project.name}</p>
                  <p className="text-gray-500 text-xs mt-1 max-w-sm truncate">{project.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${project.status === 'Active' ? 'bg-blue-100 text-blue-800' : 
                      project.status === 'At Risk' ? 'bg-red-100 text-red-800' : 
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${project.progress > 80 ? 'bg-[#00A09D]' : project.progress < 30 ? 'bg-red-500' : 'bg-[#714B67]'}`} 
                        style={{ width: `${project.progress}%` }}
                      >
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-600 w-8">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {project.startDate} - {project.dueDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2 overflow-hidden">
                    {project.team.slice(0, 3).map((user, i) => (
                      <img key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={user.avatar} alt="" />
                    ))}
                    {project.team.length > 3 && (
                      <div className="relative inline-flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white bg-gray-100 text-[10px] font-medium text-gray-600">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
