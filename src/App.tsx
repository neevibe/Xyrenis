/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DashboardView } from './views/DashboardView';
import { ProjectsView } from './views/ProjectsView';
import { KanbanView } from './views/KanbanView';
import { GanttView } from './views/GanttView';
import { PlannerSyncView } from './views/PlannerSyncView';
import { LandingView } from './views/LandingView';
import { ViewState } from './types';
import { authService } from './lib/auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  useEffect(() => {
    const unsubscribe = authService.subscribe((session) => {
      setIsAuthenticated(!!session);
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return <LandingView onLogin={() => {}} />;
  }

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'projects' && <ProjectsView />}
      {currentView === 'kanban' && <KanbanView />}
      {currentView === 'gantt' && <GanttView />}
      {currentView === 'planner-sync' && <PlannerSyncView />}
    </Layout>
  );
}
