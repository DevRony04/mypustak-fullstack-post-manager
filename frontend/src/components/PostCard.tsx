import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Trash2, AlertTriangle, Check, X } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => Promise<void>;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setShowConfirm(false);
    try {
      await onDelete(post.id);
    } catch (error) {
      // Reset deletion state if something fails
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-200 flex flex-col justify-between min-h-[160px]"
      id={`post-card-${post.id}`}
    >
      <div>
        <h3 className="text-lg font-bold text-[#0f172a] leading-snug tracking-tight mb-2 break-words">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {post.body}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between min-h-[40px]">
        {/* Post ID Badge */}
        <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
          ID: {post.id}
        </span>

        {showConfirm ? (
          <div className="flex items-center space-x-2 animate-fadeIn">
            <div className="flex items-center text-xs font-semibold text-rose-500 mr-1">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              <span>Confirm?</span>
            </div>
            <button
              onClick={handleConfirmDelete}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors focus:outline-none"
              title="Yes, delete"
              id={`post-card-${post.id}-confirm-delete`}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelDelete}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none"
              title="Cancel"
              id={`post-card-${post.id}-cancel-delete`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-rose-400"
            id={`post-card-${post.id}-delete-btn`}
          >
            <Trash2 className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
