import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { contentService } from '../lib/contentService';
import { BlogPost } from '../types';
import GlitchText from './GlitchText';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

const Insights: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const allPosts = contentService.getAllPosts();
    setPosts(allPosts.filter(p => p.status === 'published'));
  }, []);

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-16 border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <div className="text-xs text-green-500 font-mono mb-2">{`> /access_node: INSIGHTS`}</div>
           <GlitchText as="h1" text="System Insights" className="text-4xl md:text-5xl font-bold text-white" />
        </div>
        <p className="text-gray-500 text-sm md:text-base max-w-md text-right">
          DevLogs, Philosophy, and System Updates from the Core.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 border border-white/10 hover:border-green-500/50 transition-colors duration-300 flex flex-col overflow-hidden"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
                <span className="flex items-center gap-1 text-green-500/80">
                  <User className="w-3 h-3" /> {post.author}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-green-500 transition-colors leading-tight">
                <Link to={`/insights/${post.id}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <Link 
                to={`/insights/${post.id}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-green-500 hover:text-white transition-colors mt-auto"
              >
                Read Protocol <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
