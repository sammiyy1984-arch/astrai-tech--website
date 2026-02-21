import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { contentService } from '../lib/contentService';
import { BlogPost } from '../types';
import { ArrowLeft, Share2, Twitter, Facebook, Link as LinkIcon, Check } from 'lucide-react';

const InsightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const found = contentService.getPostById(id);
      if (found) {
        setPost(found);
      } else {
        navigate('/insights');
      }
    }
  }, [id, navigate]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post ? `Check out "${post.title}" on Astrai.tech` : 'Check out this insight';
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (!post) return null;

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <Link to="/insights" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-green-500 mb-8 transition-colors font-mono">
        <ArrowLeft className="w-3 h-3" /> BACK_TO_INDEX
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-invert max-w-none"
      >
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
            <div className="flex items-center gap-4">
              <span>{post.date}</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full" />
              <span>LOGGED_BY: {post.author}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => handleShare('twitter')} className="p-2 hover:text-white transition-colors" title="Share on X">
                <Twitter className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('facebook')} className="p-2 hover:text-white transition-colors" title="Share on Facebook">
                <Facebook className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('copy')} className="p-2 hover:text-white transition-colors relative" title="Copy Link">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans text-lg">
          {post.content}
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-white font-bold mb-1">Share this Protocol</h4>
              <p className="text-xs text-gray-500">Spread the signal.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleShare('twitter')} className="px-4 py-2 bg-black border border-white/20 text-xs hover:bg-white hover:text-black transition-colors">
                X / TWITTER
              </button>
              <button onClick={() => handleShare('facebook')} className="px-4 py-2 bg-black border border-white/20 text-xs hover:bg-white hover:text-black transition-colors">
                FACEBOOK
              </button>
            </div>
          </div>
        </footer>
      </motion.article>
    </div>
  );
};

export default InsightDetail;
