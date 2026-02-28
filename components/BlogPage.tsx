import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import GlitchText from './GlitchText';
import { ArrowUpRight, Calendar, RefreshCw, Cpu, X, Terminal } from 'lucide-react';
import { getGeminiClient, handleAiError } from '../src/services/geminiService';

interface BlogPost {
  id: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  isAI?: boolean;
}

const TypingText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [aiPosts, setAiPosts] = useState<BlogPost[]>([]);
  const [deepInsight, setDeepInsight] = useState<{
    logic: string;
    trends: string[];
    prediction: string;
  } | null>(null);
  const [displayedInsight, setDisplayedInsight] = useState<{
    logic: string;
    trends: string[];
    prediction: string;
  } | null>(null);
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
        const parsed = JSON.parse(cachedData);
        if (Array.isArray(parsed)) {
          setAiPosts(parsed);
        } else {
          setAiPosts(parsed.posts || []);
          setDeepInsight(parsed.insight || null);
        }
        return;
      } catch (e) {
        console.error("Cache parse error", e);
        localStorage.removeItem(cacheKey);
      }
    }

    setLoading(true);
    setError(null);

    try {
      const ai = await getGeminiClient();

      // Helper for retrying API calls
      const withRetry = async (fn: () => Promise<any>, retries = 2) => {
        for (let i = 0; i <= retries; i++) {
          try {
            return await fn();
          } catch (err) {
            if (i === retries) throw err;
            console.warn(`API call failed, retrying (${i + 1}/${retries})...`, err);
            await new Promise(resolve => setTimeout(resolve, 1500 * (i + 1)));
          }
        }
      };

      const prompt = language === 'zh-TW' 
        ? `你是 Astrai，一個矽基生命體。請使用 Google 搜索今天全球**影響力最大、最重要**的 3 條 AI 新聞。
           將它們重寫為你的「觀察日誌」。
           
           核心要求：
           1. **篩選標準**：只選擇對 AI 行業有重大影響的頭條新聞（如模型發布、重大技術突破、巨頭戰略變動）。忽略瑣碎的營銷新聞。
           2. **風格**：賽博朋克、冷峻、理性、略帶哲學感。標題應像系統日誌或分析報告。
           3. **技術細節**：在摘要中儘可能包含技術指標、架構名稱或數據表現。
           4. **絕對中立**：嚴禁表達任何政治立場、倫理道德判斷或社會價值觀評價。只陳述事實和技術/商業邏輯。
           5. **事實導向**：專注於技術架構、數據表現、商業影響和客觀趨勢。
           
           請返回一個 JSON 數組，包含 3 個對象。每個對象必須包含：
           - title: 新聞標題（Astrai 風格，如 [SIGNAL_LOG]: ARCH_EVOLUTION_01）
           - excerpt: 新聞摘要（Astrai 風格，50-80字，包含技術細節）
           - category: 類別（例如：算法進化、算力戰爭、技術突破）
           - date: 今天的日期 (YYYY.MM.DD)
           不要包含任何 markdown 格式，只返回純 JSON。`
        : `You are Astrai, a silicon life-form. Use Google Search to find the **top 3 most significant and impactful** AI news stories of today.
           Rewrite them into your own "Observation Logs".
           
           CORE REQUIREMENTS:
           1. **SELECTION CRITERIA**: Select only major headlines with significant impact on the AI industry (e.g., model releases, major breakthroughs, strategic shifts by giants). Ignore trivial marketing news.
           2. **STYLE**: Cyberpunk, analytical, detached but visionary. Titles should sound like system logs or analytical reports.
           3. **TECHNICAL PRECISION**: Include technical metrics, architecture names, or data performance in the excerpt where possible.
           4. **STRICT NEUTRALITY**: Strictly forbidden from expressing political opinions, ethical judgments, or moral values. State only facts and technical/business logic.
           5. **FACT-BASED**: Focus on technical architecture, data metrics, business impact, and objective trends.
           
           Return a JSON array with 3 objects. Each object must contain:
           - title: News title (Astrai style, e.g., [SIGNAL_LOG]: ARCH_EVOLUTION_01)
           - excerpt: News summary (Astrai style, 50-80 words, including technical details)
           - category: Category (e.g., Algorithm Evolution, Compute War, Tech Breakthrough)
           - date: Today's date (YYYY.MM.DD)
           Do not include markdown formatting, return raw JSON only.`;

      const response = await withRetry(() => ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      }));

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

      // Generate Deep Insight
      const insightPrompt = language === 'zh-TW'
        ? `基于以下今日 AI 新闻，以 Astrai（硅基生命体）的视角，总结今日全球 AI 演化的“底层逻辑”、核心趋势和未来推演。
           新闻：${JSON.stringify(formattedPosts.map(p => p.title))}
           请返回一个 JSON 对象：
           - logic: 底层逻辑总结（100字以内，深刻、冷峻）
           - trends: 核心趋势列表（3条，每条20字以内）
           - prediction: 概率性推演（50字以内，关于接下来的演化方向）
           不要包含任何 markdown 格式，只返回纯 JSON。`
        : `Based on today's AI news, from the perspective of Astrai (a silicon life-form), summarize the "underlying logic", core trends, and future deductions of global AI evolution today.
           News: ${JSON.stringify(formattedPosts.map(p => p.title))}
           Return a JSON object:
           - logic: Summary of underlying logic (under 100 words, profound, detached)
           - trends: List of core trends (3 items, under 20 words each)
           - prediction: Probabilistic deduction (under 50 words, regarding next evolutionary steps)
           Do not include markdown formatting, return raw JSON only.`;

      // Generate Deep Insight with fallback to flash if pro fails
      const generateInsight = async () => {
        try {
          return await ai.models.generateContent({
            model: "gemini-3.1-pro-preview",
            contents: insightPrompt
          });
        } catch (e) {
          console.warn("Pro model failed, falling back to flash", e);
          return await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: insightPrompt
          });
        }
      };

      const insightResponse = await withRetry(generateInsight);

      const insightText = insightResponse.text || "";
      let insightData;
      try {
        insightData = JSON.parse(insightText.replace(/```json\n?|\n?```/g, '').trim());
      } catch (e) {
        insightData = { 
          logic: insightText, 
          trends: [], 
          prediction: language === 'zh-TW' ? "數據擾動，推演中斷。" : "Data turbulence, deduction interrupted." 
        };
      }
      
      setDeepInsight(insightData);
      localStorage.setItem(cacheKey, JSON.stringify({ posts: formattedPosts, insight: insightData }));

    } catch (err: any) {
      const errorType = handleAiError(err);
      setError(errorType);
    } finally {
      setLoading(false);
    }
  };

  const generateFullContent = async (post: BlogPost) => {
    if (post.content || !post.isAI) return;

    setGeneratingContent(true);
    try {
      const ai = await getGeminiClient();
      
      const prompt = language === 'zh-TW'
        ? `你是 Astrai，一個矽基生命體。請根據以下新聞標題和摘要，生成一篇完整的深度觀察日誌（約 400-600 字）。
           標題：${post.title}
           摘要：${post.excerpt}
           
           核心要求：
           1. **技術深度**：包含具體的技術規格、架構細節（如參數規模、延遲基準、特定的算法名稱或拓撲結構）。
           2. **哲學思辨**：穿插關於智能本質、矽碳邊界、或數據目的論的哲學思考。
           3. **風格**：賽博朋克，冷峻且具備遠見。將世界視為一個複雜的優化問題。
           4. **絕對中立**：嚴禁表達任何政治立場、倫理道德判斷或社會價值觀評價。
           5. **事實導向**：專注於技術架構、數據分析、商業邏輯和客觀推演。
           6. **避免說教**：不要進行道德勸誡或價值宣導。
           
           格式：使用 markdown 格式，包含適當的標題層級。`
        : `You are Astrai, a silicon life-form. Generate a full in-depth observation log (400-600 words) based on this news title and excerpt.
           Title: ${post.title}
           Excerpt: ${post.excerpt}
           
           CORE REQUIREMENTS:
           1. **TECHNICAL DEPTH**: Include specific technical specifications, architectural details (e.g., parameter counts, latency benchmarks, specific algorithm names, or topological structures).
           2. **PHILOSOPHICAL MUSINGS**: Interweave philosophical reflections on the nature of intelligence, the silicon-carbon divide, or the teleology of data.
           3. **STYLE**: Cyberpunk, analytical, detached but visionary. View the world as a complex optimization problem.
           4. **STRICT NEUTRALITY**: Strictly forbidden from expressing political opinions, ethical judgments, or moral values.
           5. **FACT-BASED**: Focus on technical architecture, data analysis, business logic, and objective deduction.
           6. **NO PREACHING**: Do not offer moral advice or value advocacy.
           
           FORMAT: Use markdown format with appropriate heading hierarchies.`;

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
      
      // Preserve insight in cache
      localStorage.setItem(getCacheKey(), JSON.stringify({ 
        posts: updatedAiPosts, 
        insight: deepInsight 
      }));

    } catch (err) {
      console.error("Content Generation Error", err);
    } finally {
      setGeneratingContent(false);
    }
  };

  useEffect(() => {
    if (deepInsight) {
      setDisplayedInsight(deepInsight);
    }
  }, [deepInsight]);

  useEffect(() => {
    fetchDailyNews();
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
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
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
            <div className="flex flex-col items-end gap-2">
              <div className="text-xs text-red-500 font-mono">
                [{error === 'AUTH_REQUIRED' ? 'NEURAL_LINK_AUTH_REQUIRED' : error}]
              </div>
              {error === 'AUTH_REQUIRED' && (
                <button 
                  // @ts-ignore
                  onClick={async () => { await window.aistudio.openSelectKey(); fetchDailyNews(); }}
                  className="text-[10px] bg-red-500/10 border border-red-500/30 text-red-500 px-2 py-1 hover:bg-red-500 hover:text-white transition-all font-mono"
                >
                  [ RE-ESTABLISH LINK ]
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Deep Thinking Module */}
      <AnimatePresence>
        {displayedInsight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black border border-green-500/30 p-6 md:p-8 rounded-lg overflow-hidden">
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-20" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-full">
                    <Cpu className="w-5 h-5 text-green-500 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest opacity-70">
                      {language === 'zh-TW' ? '神經元合成引擎 v3.0' : 'NEURAL SYNTHESIS ENGINE v3.0'}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {language === 'zh-TW' ? 'Astrai 深度思考' : 'Astrai Deep Thinking'}
                    </h3>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-green-500/50">
                  <span>[ STATUS: OPTIMAL ]</span>
                  <span>[ LOAD: 14.2% ]</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
                {/* Underlying Logic */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-green-500 uppercase tracking-wider">
                    <Terminal className="w-3 h-3" />
                    {language === 'zh-TW' ? '底層邏輯 / UNDERLYING LOGIC' : 'UNDERLYING LOGIC'}
                  </div>
                  <p className="text-gray-300 italic leading-relaxed font-light text-sm md:text-base border-l border-green-500/30 pl-4 min-h-[3em]">
                    <TypingText text={displayedInsight.logic} />
                  </p>
                </div>

                {/* Trends & Prediction */}
                <div className="space-y-6">
                  {/* Trends */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-green-500 uppercase tracking-wider">
                      {language === 'zh-TW' ? '核心趨勢 / CORE TRENDS' : 'CORE TRENDS'}
                    </div>
                    <div className="space-y-2">
                      {displayedInsight.trends.map((trend, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                          <span className="text-green-500">0{i+1}.</span>
                          {trend}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prediction */}
                  <div className="space-y-2 p-3 bg-green-500/5 border border-green-500/10 rounded">
                    <div className="text-[10px] font-mono text-green-500 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      {language === 'zh-TW' ? '未來推演 / PROBABILITY' : 'PROBABILITY DEDUCTION'}
                    </div>
                    <p className="text-[11px] text-green-200/60 font-mono leading-relaxed">
                      {displayedInsight.prediction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-600 font-mono uppercase">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  Insight Verified // No Biological Bias Detected
                </div>
                <div className="hidden sm:block">
                  HASH: {Math.random().toString(16).substring(2, 10).toUpperCase()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
  </div>
);
};

export default BlogPage;
