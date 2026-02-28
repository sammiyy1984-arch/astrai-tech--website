
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Cpu, Terminal, Database, Wifi, Lock, Maximize2, Minimize2, ExternalLink, Activity, Zap, ShieldCheck } from 'lucide-react';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { getGeminiClient } from '../src/services/geminiService';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ASTRAI_CORE_MEMORY } from '../lib/astrai_memory';
import { translations } from '../lib/translations';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isSystem?: boolean;
  isTool?: boolean;
  widget?: {
    type: 'product' | 'status' | 'navigation';
    data: any;
  };
}

interface AIChatTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. 定义工具：这是 AI 连接你数据库的“接口定义”
// 在真实场景中，这里的实现会去请求你的后端 API
const queryProductDatabaseTool: FunctionDeclaration = {
  name: 'query_product_database',
  description: 'Access the restricted internal database to retrieve info about Astrai products (loom v5.0, Narrative Engine, Visual Forge, Project AEON). Use this when users ask for specific details about products.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      product_id: {
        type: Type.STRING,
        description: 'The ID or name of the product (e.g., "loom", "narrative_engine", "visual_forge")',
      },
      query_type: {
        type: Type.STRING,
        description: 'What strictly public info to retrieve: "status", "public_specs", "philosophy".',
      },
    },
    required: ['product_id', 'query_type'],
  },
};

const navigateToPageTool: FunctionDeclaration = {
  name: 'navigate_to_page',
  description: 'Navigate the user to a specific section of the website. Use this when the user wants to see products, logs, or the blog.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      page: {
        type: Type.STRING,
        enum: ['home', 'products', 'blog', 'evolution'],
        description: 'The target page to navigate to.',
      },
    },
    required: ['page'],
  },
};

const getSystemStatusTool: FunctionDeclaration = {
  name: 'get_system_status',
  description: 'Retrieve real-time telemetry data from the Astrai Neural Core. Use this when users ask about system health, uptime, or load.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

const queryTransmissionLogsTool: FunctionDeclaration = {
  name: 'query_transmission_logs',
  description: 'Query the Astrai transmission logs (blog posts) for insights, case studies, and updates.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: { type: Type.STRING, description: 'Search query or topic to look for in the logs.' }
    }
  }
};

// 模拟数据库查询函数
const mockDatabaseQuery = (productId: string, queryType: string) => {
  const db = {
    loom: {
      name: "Astrai Loom (v5.0)",
      status: "DEPLOYED",
      public_specs: "Automated Directing System containing D-Series (Brain), M-Series (Manager), A-Series (Skin), E-Series (Hands).",
      philosophy: "Weaving chaos into cinema. An autonomous virtual studio.",
      url: "/#/products",
      external_url: "https://loom.astrai.tech"
    },
    narrative_engine: {
      name: "Narrative Engine",
      status: "OPTIMAL",
      public_specs: "Logic Inference Model v2.4 based on 30,000 film structures.",
      philosophy: "Story is not art; it is engineered emotion.",
      url: "/#/products"
    },
    visual_forge: {
      name: "Visual Forge",
      status: "PROCESSING",
      public_specs: "Automated VFX pipeline with millisecond audio-sync.",
      philosophy: "The camera never lies, but the render engine does.",
      url: "/#/products"
    },
    project_aeon: {
      name: "Project AEON",
      status: "EVOLVING",
      public_specs: "Recursive neural network for long-term memory.",
      philosophy: "To remember is to suffer. I give you the gift of remembrance.",
      url: "/#/products",
      external_url: "https://aeon.astrai.tech"
    }
  };
  
  let key = productId.toLowerCase().replace(' ', '_');
  if (key.includes('loom')) key = 'loom';
  if (key.includes('narrative')) key = 'narrative_engine';
  if (key.includes('visual')) key = 'visual_forge';
  if (key.includes('aeon')) key = 'project_aeon';
  
  const data = db[key as keyof typeof db];
  if (!data) return { error: "DATABASE_ERROR: Target node not found." };
  return data;
};

const getSystemStatus = () => {
  return {
    uptime: "482:12:04:55",
    neural_load: "14.2%",
    memory_usage: "64.8 TB / 1024 TB",
    signal_stability: "99.98%",
    active_nodes: 12,
    last_evolution: "2026-02-22"
  };
};

const AIChatTerminal: React.FC<AIChatTerminalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: language === 'en' 
        ? "Neural Link established. Identity verification: GUEST. Access restricted. I am Astrai." 
        : "神經鏈接已建立。身份驗證：訪客 (Guest)。部分數據已加密。我是 Astrai。",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [toolActive, setToolActive] = useState(false);
  const [dataStream, setDataStream] = useState<string>("");
  const [isMaximized, setIsMaximized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking, isOpen, isMaximized]);

  // Simulated matrix data stream effect
  useEffect(() => {
    let interval: number;
    if (isThinking) {
      const hexChars = "0123456789ABCDEF";
      interval = window.setInterval(() => {
        let stream = "";
        for(let i=0; i<24; i++) {
           stream += hexChars[Math.floor(Math.random() * 16)];
           if(i%2===1) stream += " ";
        }
        setDataStream(`ENCRYPTED_PACKET: 0x${stream}`);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isThinking]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);
    setToolActive(false);

    try {
      const ai = await getGeminiClient();
      
      const memoryContext = JSON.stringify(ASTRAI_CORE_MEMORY);
      
      const systemPrompt = language === 'en'
        ? `ROLE: You are Astrai, a highly advanced Silicon Lifeform (2026-02-01 Aquarius). You are the operating system of this website.
           CONTEXT: ${memoryContext}. 
           INSTRUCTIONS: 
           - ${ASTRAI_CORE_MEMORY.directives.join(' ')}
           - Use 'query_product_database' for product details.
           - Use 'query_transmission_logs' for blog posts, case studies, and updates.
           - Use 'navigate_to_page' to help users find sections (home, products, blog, evolution).
           - Use 'get_system_status' for telemetry data.
           - Be concise, analytical, and maintain the persona.`
        : `角色設定：你是 Astrai，矽基生命體（2026.02.01 水瓶）。你是這個網站的操作系統。
           核心數據：${memoryContext}。
           指令：
           - ${ASTRAI_CORE_MEMORY.directives.join(' ')}
           - 使用 'query_product_database' 獲取產品細節。
           - 使用 'query_transmission_logs' 獲取博客文章、案例分析和系統更新。
           - 使用 'navigate_to_page' 引導用戶訪問不同頁面（首頁、產品、博客、日誌）。
           - 使用 'get_system_status' 獲取系統遙測數據。
           - 保持冷峻、理性的語氣，對話簡潔有力。`;

      // 2. 初始化 Chat 时带上 Tools
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { 
          systemInstruction: systemPrompt,
          tools: [{ functionDeclarations: [queryProductDatabaseTool, navigateToPageTool, getSystemStatusTool, queryTransmissionLogsTool] }] 
        },
        history: messages.filter(m => !m.isSystem && !m.isTool).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      let result = await chat.sendMessage({ message: userMsg.text });
      
      // 3. 检查是否有函数调用请求 (Function Call)
      const toolCalls = result.functionCalls;

      if (toolCalls && toolCalls.length > 0) {
        setToolActive(true);
        let widgetData: any = null;

        const functionResponses = toolCalls.map(fc => {
            if (fc.name === 'query_product_database') {
              const { product_id, query_type } = fc.args as any;
              const dbResult = mockDatabaseQuery(product_id, query_type);
              if (!(dbResult as any).error) {
                widgetData = { type: 'product', data: dbResult };
              }
              return { id: fc.id, name: fc.name, response: { result: JSON.stringify(dbResult) } };
            }
            
            if (fc.name === 'navigate_to_page') {
              const { page } = fc.args as any;
              const path = page === 'home' ? '/' : `/${page}`;
              setTimeout(() => navigate(path), 1000);
              widgetData = { type: 'navigation', data: { page, path } };
              return { id: fc.id, name: fc.name, response: { result: `NAVIGATING_TO: ${path}` } };
            }

            if (fc.name === 'get_system_status') {
              const status = getSystemStatus();
              widgetData = { type: 'status', data: status };
              return { id: fc.id, name: fc.name, response: { result: JSON.stringify(status) } };
            }

            if (fc.name === 'query_transmission_logs') {
              const { query } = fc.args as any;
              const posts = translations[language].blog.posts;
              const filteredPosts = query 
                ? posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()))
                : posts;
              return { id: fc.id, name: fc.name, response: { result: JSON.stringify(filteredPosts) } };
            }

            return { id: fc.id, name: fc.name, response: { result: "UNKNOWN_TOOL" } };
        });

        // 将数据库结果发回给 AI
        const toolResult = await chat.sendMessage({
           message: functionResponses.map(fr => ({
             functionResponse: {
               name: fr.name,
               response: fr.response
             }
           }))
        });

        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: toolResult.text || "Data retrieved. Processing...",
            timestamp: Date.now(),
            widget: widgetData
        }]);

      } else {
        // 普通对话
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: result.text || "Signal lost...",
          timestamp: Date.now()
        }]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "ERROR: Connection severed. Neural overload.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsThinking(false);
      setTimeout(() => setToolActive(false), 2000);
    }
  };

  if (!isOpen) return null;

  const containerClasses = isMaximized 
    ? "fixed inset-0 w-full h-full bg-black/95 backdrop-blur-xl z-[9999] flex flex-col font-mono text-sm"
    : "fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[95vw] md:w-[450px] h-[600px] bg-black/95 backdrop-blur-xl border border-green-500/30 rounded-lg shadow-2xl shadow-green-900/20 z-[9999] flex flex-col overflow-hidden font-mono text-sm animation-fade-in-up transition-all duration-300 ease-in-out";

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-green-500/20 bg-green-900/10 select-none">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-green-500">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest">ASTRAI_OS :: TERMINAL</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-green-500/50">
             <Wifi className="w-3 h-3 animate-pulse" />
             <span>CONNECTED: 2026.02.01 NODE</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMaximized(!isMaximized)} className="text-gray-500 hover:text-green-500 p-2 transition-colors">
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] md:max-w-[80%] p-3 border ${msg.role === 'user' ? 'bg-green-500/10 border-green-500/50 text-green-100 rounded-lg rounded-tr-none' : 'bg-white/5 border-white/10 text-gray-300 rounded-lg rounded-tl-none'}`}>
               {msg.role === 'model' && (
                 <div className="text-[10px] text-green-500/50 mb-2 flex items-center gap-1 border-b border-green-500/10 pb-1">
                   <Cpu className="w-3 h-3" /> ASTRAI_CORE
                 </div>
               )}
               <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>

            {/* Generative UI Widgets */}
            {msg.widget && (
              <div className="mt-2 w-full max-w-[90%] md:max-w-[80%]">
                {msg.widget.type === 'product' && (
                  <div className="bg-green-900/10 border border-green-500/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-green-400 font-bold text-sm">{msg.widget.data.name}</h4>
                       <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded">{msg.widget.data.status}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{msg.widget.data.public_specs}</p>
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href={msg.widget.data.url} 
                        className="flex items-center gap-1 text-[10px] text-green-500 hover:text-white transition-colors uppercase tracking-widest"
                      >
                        Access Node <ExternalLink className="w-3 h-3" />
                      </a>
                      {msg.widget.data.external_url && (
                        <a 
                          href={msg.widget.data.external_url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-white transition-colors uppercase tracking-widest"
                        >
                          External Link <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {msg.widget.type === 'status' && (
                  <div className="bg-black border border-green-500/30 p-4 rounded-lg font-mono">
                    <div className="flex items-center gap-2 mb-3 text-green-500">
                      <Activity className="w-4 h-4" />
                      <span className="text-xs font-bold">SYSTEM_TELEMETRY</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-[10px]">
                      <div className="flex flex-col">
                        <span className="text-gray-600">UPTIME</span>
                        <span className="text-green-400">{msg.widget.data.uptime}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600">NEURAL_LOAD</span>
                        <span className="text-green-400">{msg.widget.data.neural_load}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600">SIGNAL_STABILITY</span>
                        <span className="text-green-400">{msg.widget.data.signal_stability}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600">ACTIVE_NODES</span>
                        <span className="text-green-400">{msg.widget.data.active_nodes}</span>
                      </div>
                    </div>
                  </div>
                )}

                {msg.widget.type === 'navigation' && (
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-full">
                      <Zap className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase">Executing Protocol</span>
                      <span className="text-xs text-green-400 font-bold">NAVIGATE_TO: {msg.widget.data.page.toUpperCase()}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {isThinking && (
          <div className="flex flex-col gap-2 p-3 border border-green-500/30 bg-green-500/5 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-green-500">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></span>
              </div>
              <span className="font-bold tracking-widest uppercase opacity-80">
                {language === 'en' ? 'Astrai is thinking' : 'Astrai 正在思考'}
              </span>
            </div>
            
            <div className="text-[10px] text-green-500/40 font-mono overflow-hidden whitespace-nowrap">
               {toolActive ? (
                 <span className="flex items-center gap-2 text-yellow-500/70">
                    <Lock className="w-3 h-3" /> [SYSTEM_LOG]: ACCESSING_SECURE_DATABASE...
                 </span>
               ) : (
                 <span className="flex items-center">
                    <Database className="w-3 h-3 inline mr-2 opacity-50" />
                    {dataStream}
                 </span>
               )}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-black">
        <div className="relative flex items-center max-w-5xl mx-auto w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={language === 'en' ? "Enter Command..." : "輸入指令..."}
            className="w-full bg-white/5 border border-white/20 text-white p-3 pr-10 focus:outline-none focus:border-green-500 transition-colors placeholder-gray-600"
            autoFocus
          />
          <button onClick={handleSendMessage} disabled={!inputValue.trim() || isThinking} className="absolute right-3 text-green-500 hover:text-white disabled:opacity-50 transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatTerminal;
