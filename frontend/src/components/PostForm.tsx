import React, { useState } from 'react';
import { PlusCircle, Loader2, AlertCircle } from 'lucide-react';

interface PostFormProps {
  onSubmit: (post: { title: string; body: string }) => Promise<void>;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    // Field level validation
    if (!trimmedTitle && !trimmedBody) {
      setError('Title and Body are both required.');
      return;
    }
    if (!trimmedTitle) {
      setError('Post Title is required.');
      return;
    }
    if (!trimmedBody) {
      setError('Post Body content is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ title: trimmedTitle, body: trimmedBody });
      setTitle('');
      setBody('');
    } catch (err: any) {
      // Parent component handles global errors, but we can capture form-specific failures if needed
      setError(err.response?.data?.detail || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 sm:p-8" id="post-form-container">
      <h2 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center">
        <PlusCircle className="w-5 h-5 text-blue-600 mr-2" />
        Create New Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" id="post-form">
        {error && (
          <div 
            className="flex items-center space-x-2 bg-rose-50 text-rose-700 p-3 rounded-lg text-sm font-medium border border-rose-100 animate-fadeIn"
            id="form-error-alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter a descriptive title..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Post Content
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (error) setError(null);
            }}
            placeholder="What would you like to write about?..."
            rows={4}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium resize-none"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id="submit-post-btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Post...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Publish Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
