import { User, Project, Task } from '../types';
import { mockUsers } from '../data';

export interface Session {
  user: User;
  token: string;
  expiresAt: number;
}

class AuthService {
  private currentSession: Session | null = null;

  async login(email: string, password?: string): Promise<Session> {
    // For demonstration, map an email like 'alex@xyrenis.com' to a specific mock user
    const normalizedEmail = email.toLowerCase();
    let user = mockUsers.find(u => {
      const expectedEmail = `${u.name.split(' ')[0].toLowerCase()}@xyrenis.com`;
      return expectedEmail === normalizedEmail;
    });

    if (!user) {
      // Default fallback to PMO Administrator (Alex Mercer)
      user = mockUsers[0];
    }
    
    this.currentSession = {
      user,
      token: btoa(`${user.id}:${Date.now()}`),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
    };
    
    localStorage.setItem('xyrenis_session', JSON.stringify(this.currentSession));
    return this.currentSession;
  }

  logout(): void {
    this.currentSession = null;
    localStorage.removeItem('xyrenis_session');
  }

  getSession(): Session | null {
    if (this.currentSession && this.currentSession.expiresAt > Date.now()) {
        return this.currentSession;
    }
    
    try {
      const stored = localStorage.getItem('xyrenis_session');
      if (stored) {
        const session = JSON.parse(stored) as Session;
        if (session.expiresAt > Date.now()) {
          this.currentSession = session;
          return session;
        } else {
            this.logout();
        }
      }
    } catch (e) {
        this.logout();
    }
    return null;
  }

  // --- Row-Level Security (RLS) Enforcement Layer ---

  /**
   * Applies RLS to Projects. Users can only see projects they own or are assigned to,
   * unless they have the 'PMO' (Project Management Office) role which has global visibility.
   */
  getSecureProjects(allProjects: Project[]): Project[] {
    const session = this.getSession();
    if (!session) return [];

    const { user } = session;
    
    // PMO Department overrides RLS for cross-team visibility
    if (user.department === 'PMO') {
      return allProjects;
    }

    return allProjects.filter(project => 
      project.owner?.id === user.id || 
      project.team.some(member => member.id === user.id)
    );
  }

  /**
   * Applies RLS to Tasks based on project-level access and individual assignments.
   */
  getSecureTasks(allTasks: Task[], accessibleProjects: Project[]): Task[] {
    const session = this.getSession();
    if (!session) return [];

    const accessibleProjectIds = new Set(accessibleProjects.map(p => p.id));

    return allTasks.filter(task => accessibleProjectIds.has(task.projectId));
  }
}

export const authService = new AuthService();
