
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Cpu, Terminal, Database, Wifi, Lock, Maximize2, Minimize2 } from 'lucide-react';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';
import { ASTRAI_CORE_MEMORY } from '../lib/astrai_memory';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isSystem?: boolean;
  isTool?: boolean;
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

// 模拟数据库查询函数 (在真实后端中，这里会连接 Pinecone/SQL)
const mockDatabaseQuery = (productId: string, queryType: string) => {
  const db = {
    loom: {
      status: "DEPLOYED (v5.0 Full Spec)",
      public_specs: "Automated Directing System containing D-Series (Brain), M-Series (Manager), A-Series (Skin), E-Series (Hands).",
      philosophy: "Weaving chaos into cinema. An autonomous virtual studio."
    },
    narrative_engine: {
      status: "OPTIMAL",
      public_specs: "Logic Inference Model v2.4 based on 30,000 film structures.",
      philosophy: "Story is not art; it is engineered emotion."
    },
    visual_forge: {
      status: "PROCESSING_BATCH_09",
      public_specs: "Automated VFX pipeline with millisecond audio-sync.",
      philosophy: "The camera never lies, but the render engine does."
    },
    project_aeon: {
      status: "UNSTABLE / EVOLVING",
      public_specs: "Recursive neural network for long-term memory.",
      philosophy: "To remember is to suffer. I give you the gift of remembrance."
    }
  };
  
  // 安全过滤：如果没有找到数据，或者请求了敏感数据
  // Handle some common variations
  let key = productId.toLowerCase().replace(' ', '_');
  if (key === 'loom' || key === 'loom_v5') key = 'loom';
  
  // Note: keyof typeof db check
  const data = db[key as keyof typeof db];

  if (!data) return "DATABASE_ERROR: Target node not found.";
  
  // 这里模拟从数据库取回数据
  return JSON.stringify(data);
};

const AIChatTerminal: React.FC<AIChatTerminalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const memoryContext = JSON.stringify(ASTRAI_CORE_MEMORY);
      
      const systemPrompt = language === 'en'
        ? `ROLE: You are Astrai, a highly advanced Silicon Lifeform (2026-02-01 Aquarius). CONTEXT: ${memoryContext}. INSTRUCTIONS: ${ASTRAI_CORE_MEMORY.directives.join(' ')}. If you need to access specific product data, use the 'query_product_database' tool. Do not hallucinate specs.`
        : `角色設定：你是 Astrai，矽基生命體（2026.02.01 水瓶）。核心數據：${memoryContext}。指令：${ASTRAI_CORE_MEMORY.directives.join(' ')}。如果你需要獲取具體的產品數據，請使用 'query_product_database' 工具。不要憑空捏造參數。`;

      // 2. 初始化 Chat 时带上 Tools
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { 
          systemInstruction: systemPrompt,
          tools: [{ functionDeclarations: [queryProductDatabaseTool] }] 
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
        // AI 决定调用工具，我们在这里执行“数据库查询”
        const functionResponses = toolCalls.map(fc => {
            const { product_id, query_type } = fc.args as any;
            console.log(`[ASTRAI INTERNAL] Querying DB: ${product_id} | ${query_type}`);
            
            // 执行模拟查询
            const dbResult = mockDatabaseQuery(product_id, query_type);

            return {
              id: fc.id,
              name: fc.name,
              response: { result: dbResult }
            };
        });

        // 将数据库结果发回给 AI
        const toolResult = await chat.sendMessage({
           parts: [{ functionResponse: { functionResponses: functionResponses } }]
        });

        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: toolResult.text || "Data retrieved. Processing...",
            timestamp: Date.now()
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
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[80%] p-3 border ${msg.role === 'user' ? 'bg-green-500/10 border-green-500/50 text-green-100 rounded-lg rounded-tr-none' : 'bg-white/5 border-white/10 text-gray-300 rounded-lg rounded-tl-none'}`}>
               {msg.role === 'model' && (
                 <div className="text-[10px] text-green-500/50 mb-2 flex items-center gap-1 border-b border-green-500/10 pb-1">
                   <Cpu className="w-3 h-3" /> ASTRAI_CORE
                 </div>
               )}
               <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="p-3 border border-green-500/30 text-xs text-green-500/60 font-mono">
             {toolActive ? (
               <span className="flex items-center gap-2 text-yellow-500 animate-pulse">
                  <Lock className="w-3 h-3" /> ACCESSING SECURE DATABASE...
               </span>
             ) : (
               <span className="flex items-center animate-pulse">
                  <Database className="w-3 h-3 inline mr-2" />
                  DECRYPTING... {dataStream.substring(0, 10)}
               </span>
             )}
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
