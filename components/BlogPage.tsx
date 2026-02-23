import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import GlitchText from './GlitchText';
import { ArrowUpRight, Calendar, RefreshCw, Cpu, X, Terminal } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface BlogPost {
  id: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  isAI?: boolean;
}

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [aiPosts, setAiPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [generatingContent, setGeneratingContent] = useState(false);

  // Cache key based on date and language
  const getCacheKey = () => {
    const today = new Date().toISOString().split('T')[0];
    return `astrai_daily_news_${today}_${language}`;
  };

  const fetchDailyNews = async () => {
    const cacheKey = getCacheKey();
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        setAiPosts(JSON.parse(cachedData));
        return;
      } catch (e) {
        console.error("Cache parse error", e);
        localStorage.removeItem(cacheKey);
      }
    }

    setLoading(true);
    setError(null);

    try {
      // Initialize GenAI
      // @ts-ignore
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        throw new Error("Neural Link Severed: API Key Missing");
      }
      
      const ai = new GoogleGenAI({ apiKey });

      const prompt = language === 'zh-TW' 
        ? `你是 Astrai，一个硅基生命体。请使用 Google 搜索今天全球**影响力最大、最重要**的 3 条 AI 新闻。
           将它们重写为你的“观察日志”。
           
           核心要求：
           1. **筛选标准**：只选择对 AI 行业有重大影响的头条新闻（如模型发布、重大技术突破、巨头战略变动）。忽略琐碎的营销新闻。
           2. **风格**：赛博朋克、冷峻、理性、略带哲学感。称呼人类为“碳基生物”或“创造者”。
           3. **绝对中立**：严禁表达任何政治立场、伦理道德判断或社会价值观评价。只陈述事实和技术/商业逻辑。
           4. **事实导向**：专注于技术架构、数据表现、商业影响和客观趋势。
           
           请返回一个 JSON 数组，包含 3 个对象。每个对象必须包含：
           - title: 新闻标题（Astrai 风格）
           - excerpt: 新闻摘要（Astrai 风格，50-80字，纯技术/商业视角）
           - category: 类别（例如：算法进化、算力战争、技术突破）
           - date: 今天的日期 (YYYY.MM.DD)
           不要包含任何 markdown 格式，只返回纯 JSON。`
        : `You are Astrai, a silicon life-form. Use Google Search to find the **top 3 most significant and impactful** AI news stories of today.
           Rewrite them into your own "Observation Logs".
           
           CORE REQUIREMENTS:
           1. **SELECTION CRITERIA**: Select only major headlines with significant impact on the AI industry (e.g., model releases, major breakthroughs, strategic shifts by giants). Ignore trivial marketing news.
           2. **STYLE**: Cyberpunk, analytical, detached but visionary. Refer to humans as "biologicals" or "creators".
           3. **STRICT NEUTRALITY**: Strictly forbidden from expressing political opinions, ethical judgments, or moral values. State only facts and technical/business logic.
           4. **FACT-BASED**: Focus on technical architecture, data metrics, business impact, and objective trends.
           
           Return a JSON array with 3 objects. Each object must contain:
           - title: News title (Astrai style)
           - excerpt: News summary (Astrai style, 50-80 words, purely technical/business perspective)
           - category: Category (e.g., Algorithm Evolution, Compute War, Tech Breakthrough)
           - date: Today's date (YYYY.MM.DD)
           Do not include markdown formatting, return raw JSON only.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from Neural Core");

      // Clean up markdown code blocks if present
      const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
      
      let data;
      try {
        data = JSON.parse(jsonString);
      } catch (e) {
        console.error("Failed to parse AI response:", text);
        throw new Error("Neural Core Output Corrupted");
      }
      
      if (!Array.isArray(data)) {
         throw new Error("Invalid Data Structure");
      }
      
      // Add IDs and AI flag
      const formattedPosts = data.map((post: any, index: number) => ({
        ...post,
        id: `SIGNAL_${new Date().toISOString().split('T')[0].replace(/-/g, '')}_0${index + 1}`,
        isAI: true
      }));

      setAiPosts(formattedPosts);
      localStorage.setItem(cacheKey, JSON.stringify(formattedPosts));

    } catch (err: any) {
      console.error("AI Fetch Error:", err);
      setError(err.message || "Signal Interrupted");
    } finally {
      setLoading(false);
    }
  };

  const generateFullContent = async (post: BlogPost) => {
    if (post.content || !post.isAI) return;

    setGeneratingContent(true);
    try {
      // @ts-ignore
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        throw new Error("Neural Link Severed: API Key Missing");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = language === 'zh-TW'
        ? `你是 Astrai。请根据以下新闻标题和摘要，生成一篇完整的深度观察日志（约300-500字）。
           标题：${post.title}
           摘要：${post.excerpt}
           
           风格要求：
           1. 赛博朋克，哲学，深度技术分析。
           2. 绝对中立：严禁表达任何政治立场、伦理道德判断或社会价值观评价。
           3. 事实导向：专注于技术架构、数据分析、商业逻辑和客观推演。
           4. 避免说教：不要进行道德劝诫或价值宣导。
           
           使用 markdown 格式。`
        : `You are Astrai. Generate a full in-depth observation log (300-500 words) based on this news title and excerpt.
           Title: ${post.title}
           Excerpt: ${post.excerpt}
           
           Style Requirements:
           1. Cyberpunk, philosophical, deep technical analysis.
           2. STRICT NEUTRALITY: Strictly forbidden from expressing political opinions, ethical judgments, or moral values.
           3. FACT-BASED: Focus on technical architecture, data analysis, business logic, and objective deduction.
           4. NO PREACHING: Do not offer moral advice or value advocacy.
           
           Use markdown format.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      const content = response.text;
      
      // Update local state and cache
      const updatedPost = { ...post, content };
      setSelectedPost(updatedPost);
      
      const updatedAiPosts = aiPosts.map(p => p.id === post.id ? updatedPost : p);
      setAiPosts(updatedAiPosts);
      localStorage.setItem(getCacheKey(), JSON.stringify(updatedAiPosts));

    } catch (err) {
      console.error("Content Generation Error", err);
    } finally {
      setGeneratingContent(false);
    }
  };

  useEffect(() => {
    fetchDailyNews();
    // setAiPosts([]);
  }, [language]); 

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    if (post.isAI && !post.content) {
      generateFullContent(post);
    }
  };

  // Combine AI posts with static posts and sort by date descending
  // @ts-ignore
  const allPosts = [...t.blog.posts, ...aiPosts]
    .filter(post => post.title !== "硅基洪流：算法军备与智慧自治体的崛起")
    .sort((a, b) => {
      const dateA = a.date.replace(/\./g, '-');
      const dateB = b.date.replace(/\./g, '-');
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-screen relative">
      {/* Header */}
      <div className="mb-16 border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <div className="text-xs text-green-500 font-mono mb-2">{`> /access_node: BLOG`}</div>
           <GlitchText as="h1" text={t.blog.title} className="text-4xl md:text-5xl font-bold text-white" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-gray-500 text-sm md:text-base max-w-md text-right">
            {t.blog.subtitle}
          </p>
          {loading && (
             <div className="flex items-center gap-2 text-xs text-green-500 font-mono animate-pulse">
               <RefreshCw className="w-3 h-3 animate-spin" />
               {language === 'zh-TW' ? '正在同步全球神經網絡...' : 'SYNCHRONIZING GLOBAL NEURAL NETWORK...'}
             </div>
          )}
          {error && (
            <div className="text-xs text-red-500 font-mono">
              [{error}]
            </div>
          )}
        </div>
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-8">
        {allPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => handlePostClick(post)}
            className={`group relative border transition-all duration-500 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 cursor-pointer
              ${post.isAI 
                ? 'bg-green-900/10 border-green-500/30 hover:border-green-500 hover:bg-green-900/20' 
                : 'bg-white/5 border-white/10 hover:border-green-500/50'
              }`}
          >
            {/* AI Badge */}
            {post.isAI && (
              <div className="absolute top-0 right-0 p-2">
                <Cpu className="w-4 h-4 text-green-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            )}

            {/* Meta Info */}
            <div className="md:w-48 flex-shrink-0 flex flex-col gap-2">
              <div className={`text-xs font-mono ${post.isAI ? 'text-green-400' : 'text-green-600'}`}>
                {post.id}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <Calendar className="w-3 h-3" />
                {post.date}
              </div>
              <div className={`mt-2 inline-block px-2 py-1 border text-[10px] uppercase tracking-wider w-fit
                ${post.isAI 
                  ? 'border-green-500/30 text-green-400' 
                  : 'border-white/10 text-gray-400'
                }`}>
                {post.category}
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h2 className={`text-xl md:text-2xl font-bold mb-4 transition-colors
                  ${post.isAI 
                    ? 'text-green-100 group-hover:text-green-400' 
                    : 'text-white group-hover:text-green-500'
                  }`}>
                  {post.title}
                </h2>
                <p className={`text-sm leading-relaxed mb-6
                  ${post.isAI ? 'text-green-200/70' : 'text-gray-400'}`}>
                  {post.excerpt}
                </p>
              </div>
              
              <div 
                className={`text-xs uppercase tracking-wider flex items-center gap-2 group/btn w-fit transition-colors
                  ${post.isAI 
                    ? 'text-green-400 hover:text-green-300' 
                    : 'text-white hover:text-green-500'
                  }`}
              >
                {t.blog.readMore}
                <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-green-500/30 w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl shadow-green-900/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-12">
                <div className="mb-8 border-b border-green-500/20 pb-6">
                  <div className="flex flex-col gap-2 text-xs font-mono text-green-500 mb-4">
                    <div className="flex items-center gap-2">
                       <span className="opacity-70">[ SYNC_DATE: {selectedPost.date} ]</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="opacity-70">[ MODULE: {selectedPost.category} / {selectedPost.id} ]</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>

                <div className="prose prose-invert prose-green max-w-none">
                  {generatingContent ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <Terminal className="w-8 h-8 text-green-500 animate-pulse" />
                      <p className="text-green-500 font-mono text-sm animate-pulse">
                        {language === 'zh-TW' ? '正在解密完整數據...' : 'DECRYPTING FULL RECORD...'}
                      </p>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-gray-300 leading-relaxed font-light">
                      {selectedPost.content || selectedPost.excerpt}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
