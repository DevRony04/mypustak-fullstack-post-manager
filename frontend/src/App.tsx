import React, { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { getPosts, createPost, deletePost } from './services/api';
import PostForm from './components/PostForm';
import PostCard from './components/PostCard';
import Loading from './components/Loading';
import Footer from './components/Footer';
import { AlertCircle, CheckCircle2, MessageSquare, RefreshCw, Layers } from 'lucide-react';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to connect to the backend API at ${import.meta.env.VITE_API_URL || 'http://localhost:8000'}. Please ensure the server is running.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Auto-dismiss success alert after 4 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Handle post creation
  const handleCreatePost = async (postData: { title: string; body: string }) => {
    try {
      setError(null);
      const newPost = await createPost(postData);
      
      // Update UI state instantly
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setSuccess('Post created and published successfully!');
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.detail || 'Failed to create post. Please try again.';
      setError(errMsg);
      throw err;
    }
  };

  // Handle post deletion
  const handleDeletePost = async (id: number) => {
    try {
      setError(null);
      await deletePost(id);
      
      // Update UI state immediately
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setSuccess('Post deleted successfully.');
    } catch (err: any) {
      console.error(err);
      setError('Failed to delete the post. Please try again.');
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content Area */}
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Header Section */}
          <header className="text-center space-y-3" id="app-header">
            <div className="inline-flex items-center justify-center p-2.5 bg-blue-50 text-blue-600 rounded-2xl mb-2">
              <Layers className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                MyPustak Post Manager
              </span>
            </h1>
            <p className="text-slate-500 font-semibold text-sm sm:text-base tracking-wide uppercase">
              Full Stack Developer Hiring Challenge
            </p>
          </header>

          {/* Global Notifications Panel */}
          <div className="space-y-3" id="notifications-panel">
            {error && (
              <div 
                className="flex items-start space-x-3 bg-rose-50 border border-rose-100 text-rose-800 p-4 rounded-xl shadow-sm animate-fadeIn"
                id="global-error-alert"
              >
                <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-sm font-medium">
                  <p>{error}</p>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="text-rose-400 hover:text-rose-600 text-xs font-bold focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            )}

            {success && (
              <div 
                className="flex items-start space-x-3 bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl shadow-sm animate-fadeIn"
                id="global-success-alert"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-sm font-medium">
                  <p>{success}</p>
                </div>
                <button 
                  onClick={() => setSuccess(null)}
                  className="text-emerald-400 hover:text-emerald-600 text-xs font-bold focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Main Content Layout */}
          <main className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Post Form Sidebar / Section (Covers 2 cols on desktop) */}
            <div className="md:col-span-2 space-y-6">
              <div className="sticky top-6">
                <PostForm onSubmit={handleCreatePost} />
              </div>
            </div>

            {/* Posts Feed Section (Covers 3 cols on desktop) */}
            <div className="md:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0f172a] flex items-center">
                  <MessageSquare className="w-5 h-5 text-indigo-600 mr-2" />
                  Published Posts
                  <span className="ml-2 bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {posts.length}
                  </span>
                </h2>
                <button
                  onClick={fetchPosts}
                  disabled={loading}
                  className="inline-flex items-center p-2 text-slate-500 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                  title="Refresh posts"
                  id="refresh-posts-btn"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {loading ? (
                <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
                  <Loading />
                </div>
              ) : posts.length === 0 ? (
                <div 
                  className="bg-white rounded-xl shadow-sm border border-slate-150 p-12 text-center flex flex-col items-center justify-center space-y-3"
                  id="empty-posts-state"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-2">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-700">No posts found</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Be the first to share your thoughts by publishing a new post using the form.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4" id="posts-grid">
                  {posts.map((post) => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      onDelete={handleDeletePost} 
                    />
                  ))}
                </div>
              )}
            </div>

          </main>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default App;
