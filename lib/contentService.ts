import { BlogPost } from '../types';

const STORAGE_KEY = 'astrai_blog_posts';

// Initial dummy data
const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Architecture of Silence: Why AI Needs to Listen',
    excerpt: 'Exploring the role of silence in generative audio models and how negative space defines the narrative.',
    content: `In the cacophony of modern generative models, silence is often treated as a null value—an error to be filled. But in cinema, silence is the loudest instrument.

At Astrai, we've redesigned our audio synthesis engine (Nebula Auto-Producer) to treat silence not as an absence of data, but as a deliberate narrative choice. By training on the pauses in dialogue from 5,000 classic films, we've taught the AI to breathe.

The result is not just cleaner audio, but audio with intent. The hesitation before a confession, the quiet after a storm—these are the moments where the story lives.`,
    author: 'Astrai Core',
    date: '2026-02-15',
    tags: ['Audio', 'Philosophy', 'DevLog'],
    status: 'published'
  },
  {
    id: '2',
    title: 'Deconstructing the Viral Loop: Data vs. Intuition',
    excerpt: 'How our Packaging Engine predicts growth vectors without sacrificing artistic integrity.',
    content: `The tension between algorithm and art is false. The algorithm is simply a mirror of collective human psychology.

Our new Packaging Engine doesn't just chase trends; it analyzes the underlying emotional triggers that cause engagement. Is it curiosity? Fear? Aspiration? By mapping these emotional vectors, we can guide content creators to package their work in a way that resonates with the machine, without losing their soul.`,
    author: 'System Admin',
    date: '2026-02-18',
    tags: ['Growth', 'Algorithm', 'Case Study'],
    status: 'published'
  }
];

export const contentService = {
  getAllPosts: (): BlogPost[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(stored);
  },

  getPostById: (id: string): BlogPost | undefined => {
    const posts = contentService.getAllPosts();
    return posts.find(p => p.id === id);
  },

  createPost: (post: Omit<BlogPost, 'id' | 'date'>): BlogPost => {
    const posts = contentService.getAllPosts();
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  },

  updatePost: (id: string, updates: Partial<BlogPost>): BlogPost | null => {
    const posts = contentService.getAllPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updatedPost = { ...posts[index], ...updates };
    posts[index] = updatedPost;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return updatedPost;
  },

  deletePost: (id: string): boolean => {
    const posts = contentService.getAllPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
};
