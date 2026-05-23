import React from "react";
import { ArrowRightLeft, Database, CheckCircle2, RefreshCw } from "lucide-react";

export function PlannerSyncView() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#00A09D]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Database className="w-8 h-8 text-[#00A09D]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Microsoft Planner Integration</h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Synchronize plans, buckets, and tasks seamlessly between the Enterprise PMO and your organization's Microsoft Planner via Graph API.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Connected to Azure AD
            </div>
            <span className="text-sm font-medium text-gray-600">Tenant: org-contoso-pmo</span>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-[#00A09D] hover:text-[#008a87] bg-[#00A09D]/10 px-3 py-1.5 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
            Force Sync Now
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Sync Configuration</h3>
          <div className="space-y-4">
            {[
              { title: "Two-way Task Sync", desc: "Sync task creation, updates, and completion status across both platforms." },
              { title: "Bucket Mapping", desc: "Map Odoo-style Kanban columns to MS Planner buckets automatically." },
              { title: "User Assignment Sync", desc: "Match users via Azure AD email mapping." },
              { title: "Subtask Fragmentation", desc: "Roll up internal fragmented subtasks into single MS Planner checklist items." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50/30">
                <div className="mt-0.5">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#00A09D] rounded border-gray-300 focus:ring-[#00A09D]" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block cursor-pointer">{item.title}</label>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
