import React, { useState, useEffect } from 'react';
import { contentService } from '../../lib/contentService';
import { BlogPost } from '../../types';
import { Plus, Edit, Trash2, LogOut, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simple auth check
    const isAuth = sessionStorage.getItem('astrai_admin_auth');
    if (!isAuth) {
      navigate('/admin/login');
      return;
    }
    loadPosts();
  }, [navigate]);

  const loadPosts = () => {
    setPosts(contentService.getAllPosts());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('astrai_admin_auth');
    navigate('/admin/login');
  };

  const handleEdit = (post?: BlogPost) => {
    if (post) {
      setCurrentPost(post);
    } else {
      setCurrentPost({
        title: '',
        excerpt: '',
        content: '',
        author: 'Astrai Core',
        tags: [],
        status: 'draft'
      });
    }
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Terminate this data node?')) {
      contentService.deletePost(id);
      loadPosts();
    }
  };

  const handleSave = () => {
    if (!currentPost.title || !currentPost.content) return;

    if (currentPost.id) {
      contentService.updatePost(currentPost.id, currentPost);
    } else {
      contentService.createPost(currentPost as Omit<BlogPost, 'id' | 'date'>);
    }
    setIsEditing(false);
    loadPosts();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-green-900/30 pb-4">
          <h1 className="text-2xl text-green-500 font-bold tracking-widest">ASTRAI_ADMIN // DASHBOARD</h1>
          <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-2">
            <LogOut className="w-4 h-4" /> DISCONNECT
          </button>
        </header>

        {isEditing ? (
          <div className="bg-white/5 border border-white/10 p-8 rounded-lg animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{currentPost.id ? 'EDIT_NODE' : 'NEW_NODE'}</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs text-gray-500 mb-2">TITLE</label>
                <input
                  type="text"
                  value={currentPost.title || ''}
                  onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                  className="w-full bg-black border border-white/20 p-3 text-white focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">EXCERPT</label>
                <textarea
                  value={currentPost.excerpt || ''}
                  onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  className="w-full bg-black border border-white/20 p-3 text-white h-20 focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">CONTENT (Markdown Supported)</label>
                <textarea
                  value={currentPost.content || ''}
                  onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
                  className="w-full bg-black border border-white/20 p-3 text-white h-64 font-mono text-sm focus:border-green-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">AUTHOR</label>
                  <input
                    type="text"
                    value={currentPost.author || ''}
                    onChange={e => setCurrentPost({...currentPost, author: e.target.value})}
                    className="w-full bg-black border border-white/20 p-3 text-white focus:border-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2">TAGS (Comma separated)</label>
                  <input
                    type="text"
                    value={currentPost.tags?.join(', ') || ''}
                    onChange={e => setCurrentPost({...currentPost, tags: e.target.value.split(',').map(t => t.trim())})}
                    className="w-full bg-black border border-white/20 p-3 text-white focus:border-green-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <select
                  value={currentPost.status || 'draft'}
                  onChange={e => setCurrentPost({...currentPost, status: e.target.value as any})}
                  className="bg-black border border-white/20 p-2 text-xs text-white"
                >
                  <option value="draft">DRAFT</option>
                  <option value="published">PUBLISHED</option>
                </select>

                <button 
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-500 text-black px-6 py-2 font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> SAVE_NODE
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => handleEdit()}
                className="bg-white/10 hover:bg-green-500 hover:text-black border border-white/20 text-white px-4 py-2 flex items-center gap-2 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" /> CREATE_NEW_NODE
              </button>
            </div>

            <div className="grid gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white/5 border border-white/10 p-4 flex justify-between items-center hover:border-white/30 transition-colors">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className={`px-2 py-0.5 rounded ${post.status === 'published' ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                        {post.status.toUpperCase()}
                      </span>
                      <span>{post.date}</span>
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(post)} className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
