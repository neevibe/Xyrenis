import { User, Project, Task } from '../types';
import { mockUsers } from '../data';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface Session {
  user: User;
  token: string;
  expiresAt: number;
}

class AuthService {
  private currentSession: Session | null = null;
  private authStateListener: (() => void) | null = null;
  private subscribers: ((session: Session | null) => void)[] = [];

  constructor() {
    this.setupAuthStateListener();
  }

  private setupAuthStateListener() {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await this.syncUserToFirestore(firebaseUser);
      } else {
        this.currentSession = null;
        this.notifySubscribers();
      }
    });
  }

  private async syncUserToFirestore(firebaseUser: FirebaseUser) {
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      let xyrenisUser: User;
      
      if (!userDoc.exists()) {
        // Create matching user format for the app
        xyrenisUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Enterprise User',
          avatar: firebaseUser.photoURL || undefined,
          role: 'Contributor',
          department: 'Teams' // Default department, wait PMO needed to bypass RLS in the rules!
        };
        // For demonstration to allow the user to immediately work as an admin, if it's the specific test user we upgrade them.
        if (firebaseUser.email === 'neevibe27@gmail.com') {
           xyrenisUser.department = 'PMO';
           xyrenisUser.role = 'Admin';
        }

        await setDoc(userDocRef, xyrenisUser);
      } else {
        xyrenisUser = userDoc.data() as User;
      }

      this.currentSession = {
        user: xyrenisUser,
        token: await firebaseUser.getIdToken(),
        expiresAt: Date.now() + 1000 * 60 * 60 * 24 
      };
      this.notifySubscribers();
    } catch (err) {
      console.error('Failed to sync user to Firestore:', err);
    }
  }

  subscribe(callback: (session: Session | null) => void) {
    this.subscribers.push(callback);
    callback(this.getSession());
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(sub => sub(this.getSession()));
  }

  async login(email?: string, password?: string): Promise<Session | null> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return new Promise<Session | null>((resolve) => {
        const unsubscribe = this.subscribe((session) => {
          if (session) {
            unsubscribe();
            resolve(session);
          }
        });
      });
    } catch (error) {
      console.error("Firebase Login failed:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    await firebaseSignOut(auth);
    this.currentSession = null;
    this.notifySubscribers();
  }

  getSession(): Session | null {
    return this.currentSession;
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
