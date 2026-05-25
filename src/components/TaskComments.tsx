import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { authService } from '../lib/auth';
import { mockUsers } from '../data';
import { Send, Loader2, MessageSquare } from 'lucide-react';
import { User } from '../types';

interface TaskCommentsProps {
  projectId: string;
  taskId: string;
}

interface Comment {
  id: string;
  text: string;
  authorId: string;
  createdAt: number;
}

export function TaskComments({ projectId, taskId }: TaskCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const session = authService.getSession();

  useEffect(() => {
    if (!projectId || !taskId) return;

    const commentsRef = collection(db, 'projects', projectId, 'tasks', taskId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(fetchedComments);
    }, (err) => {
      console.error("Failed to subscribe to comments:", err);
      // Optional: Handle permission errors gracefully
    });

    return () => unsubscribe();
  }, [projectId, taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setIsSubmitting(true);
    setError('');

    try {
      const commentsRef = collection(db, 'projects', projectId, 'tasks', taskId, 'comments');
      await addDoc(commentsRef, {
        text: newComment.trim(),
        authorId: session.user.id,
        createdAt: Date.now()
      });
      setNewComment('');
    } catch (err: any) {
      console.error("Error adding comment:", err);
      setError(err.message || 'Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserDetails = (userId: string): User | undefined => {
    // In a real app we'd fetch this from the users collection and cache it.
    // Here we use mockUsers but we should handle the current session user too if they were just created.
    if (session?.user.id === userId) return session.user;
    return mockUsers.find(u => u.id === userId);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
      <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-[#F0F2F5]/50">
        <MessageSquare className="w-5 h-5 text-gray-500" />
        <h3 className="font-bold text-gray-800">Comments</h3>
        <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
          {comments.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
        {comments.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-6 italic">
            No comments yet. Be the first to start the discussion.
          </div>
        ) : (
          comments.map(comment => {
            const author = getUserDetails(comment.authorId);
            const isMe = session?.user.id === comment.authorId;

            return (
              <div key={comment.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                <img 
                  src={author?.avatar || 'https://i.pravatar.cc/150?u=fallback'} 
                  alt={author?.name || 'User'} 
                  className="w-8 h-8 rounded-full border border-gray-200 flex-shrink-0"
                />
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-700">{author?.name || 'Unknown User'}</span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${isMe ? 'bg-[#00A09D] text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                    {comment.text}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-gray-100">
        {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00A09D]/20 focus:border-[#00A09D]"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="w-10 h-10 rounded-full bg-[#00A09D] text-white flex items-center justify-center shadow-sm hover:bg-[#008a87] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
