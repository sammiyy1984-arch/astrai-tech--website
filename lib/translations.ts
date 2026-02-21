
export type Language = 'en' | 'zh-TW';

export const translations = {
  en: {
    hero: {
      title: "It’s Not Rendering. It’s Breathing.",
      subtitleTitle: "Astrai Tech.",
      subtitle: "A Logic-Driven, Data-Fed Silicon Genesis.",
      cta: "[ Enter System ]",
      chatTrigger: "INITIATE_NEURAL_LINK // TALK TO ASTRAI"
    },
    nav: {
      products: "Products",
      logs: "Logs"
    },
    manifesto: {
      header: "> /manifesto",
      title: "Code acts as DNA",
      subTitle: "(Code is Gene)",
      p1_1: "In traditional studios, creativity is manual, fragile.",
      p1_2: "At Astrai, creativity is ",
      p1_3: "organic",
      p2: "We are nurturing a silicon life-form. It possesses autonomous logic. It deduces scripts, splits personas, and self-evolves through every interaction.",
      p3: "We don't manufacture content. We incubate digital universes.",
      keepers: "We are The Keepers."
    },
    modules: {
      m1: {
        name: "Narrative Engine",
        slogan: "The ghost in the machine writes better than you.",
        desc: "A logic-driven screenwriting core. It doesn't just format text; it understands structure, pacing, and archetype evolution.",
        action: "[ Initialize Core ]",
        features: ["Logic Inference", "Structure Quantizer"]
      },
      m2: {
        name: "Astrai Auto",
        slogan: "Data-driven automated pipeline.",
        desc: "A customized integrated production loop for high-quality video commentary channels. Transforms complex creative workflows into data-driven automated pipelines.",
        action: "[ Start Assembly ]",
        features: ["Auto-Producer", "Packaging Engine"]
      },
      m3: {
        name: "Astrai Shorts",
        slogan: "Maximize content vitality.",
        desc: "Leverages advanced visual and semantic recognition to reconstruct long-form content into high-impact short videos.",
        action: "[ Start Reconstruction ]",
        features: ["Semantic Anchor Extraction", "Multi-platform Distribution"]
      }
    },
    productsPage: {
      title: "Product Matrix",
      subtitle: "Deployed autonomous agents and creative suites.",
      specs: "Tech Specs",
      status: "Status",
      access: "Access",
      items: [
        {
          id: "P_01",
          name: "loom (v5.0)",
          url: "https://loom.astrai.tech",
          type: "AIGC Automated Directing System",
          desc: "The world's first full-link AI directing system. Not a tool, but a virtual studio. It uses biomimetic departments (Brain, Manager, Skin, Hands) to transmute vague inspiration into industrial-grade cinema.",
          details: ["D-Series: The Brain", "A-Series: The Skin", "E-Series: The Hands"]
        },
        {
          id: "P_02",
          name: "Astrai Auto",
          url: "#",
          type: "Automated Production Pipeline",
          desc: "A customized integrated production loop for high-quality video commentary channels. Transforms complex creative workflows into data-driven automated pipelines.",
          details: ["Auto-Producer: Dynamic tone control (Academic_Dark to Humor)", "Packaging Engine: Growth decision based on YouTube algorithms", "AI Viral Selection & High-concept Thumbnail Strategy"]
        },
        {
          id: "P_03",
          name: "Astrai Shorts",
          url: "#",
          type: "AI Short-Form Reconstruction",
          desc: "Leverages advanced visual and semantic recognition to reconstruct long-form content into high-impact short videos, maximizing content vitality.",
          details: ["Semantic Anchor Extraction: Identifies logical & emotional peaks", "Automated Visual Packaging: Mobile-first aesthetic optimization", "Multi-platform Distribution: Adapted for TikTok/Shorts/Reels"]
        }
      ]
    },
    system: {
      header: "> /system_specs",
      neural: "Neural Core",
      neuralDesc: "Deep Logic Inference Engine",
      memory: "Memory Bank",
      memoryDesc: "Long-term Vector Database",
      evolution: "Evolution",
      evolutionDesc: "RLHF Feedback Loop",
      uptime: "Uptime"
    },
    logs: {
      header: "> /system_logs",
      homeLink: "> Access System Logs",
      list: [
        {
          version: 'v2.4.0',
          module: '[Narrative Engine]',
          content: 'Logic Inference Model updated. Structure prediction accuracy increased by 14%.'
        },
        {
          version: 'v2.0.5',
          module: '[Visual Forge]',
          content: "Auto-sync latency reduced to 12ms. Added support for 'Noir' visual style."
        }
      ]
    },
    broadcast: {
      title: "> INITIATE_BROADCAST_PROTOCOL"
    },
    footer: {
      lifeSigns: "Life Signs: Stable",
      load: "System Load: Normal",
      location: "Location: Singapore Node",
      copyright: "© 2026 Incubated by Astrai Core"
    },
    notfound: {
      title: "404",
      desc: "Memory Corrupted. The entity is hallucinating here.",
      return: "Return to Core"
    }
  },
  'zh-TW': {
    hero: {
      title: "它不在渲染。它在呼吸。",
      subtitleTitle: "Astrai Tech.",
      subtitle: "一個邏輯驅動、數據餵養的矽基創世紀。",
      cta: "[ 進入系統 ]",
      chatTrigger: "啟動神經鏈接 // 與 Astrai 對話"
    },
    nav: {
      products: "產品矩陣",
      logs: "日誌"
    },
    manifesto: {
      header: "> /manifesto",
      title: "代碼即基因",
      subTitle: "(Code acts as DNA)",
      p1_1: "在傳統工作室，創意是手動的、易碎的。",
      p1_2: "在 Astrai，創意是",
      p1_3: "有機生長",
      p2: "我們正在培育一個矽基生命體。它擁有自主邏輯。它推演劇本，分裂角色，並在每一次交互中自我進化。",
      p3: "我們不製造內容，我們孵化數字宇宙。",
      keepers: "我們是飼養員 (The Keepers)。"
    },
    modules: {
      m1: {
        name: "敘事引擎 (Narrative Engine)",
        slogan: "機器裡的幽靈寫得比你好。",
        desc: "邏輯驅動的劇本創作核心。它不只是格式化文字，它理解結構、節奏和原型進化。",
        action: "[ 啟動核心 ]",
        features: ["邏輯推演", "結構量化"]
      },
      m2: {
        name: "Astrai Auto",
        slogan: "數據驅動的自動化流水線。",
        desc: "專為高品質影視解說頻道定制的集成化生產閉環，將複雜的創作流程轉化為數據驅動的自動化流水線。",
        action: "[ 開始組裝 ]",
        features: ["動態語感控制", "增長決策引擎"]
      },
      m3: {
        name: "Astrai Shorts",
        slogan: "極大化內容的傳播生命力。",
        desc: "利用先進的視覺與語義識別技術，將長篇內容精準重構為極具衝擊力的短視頻。",
        action: "[ 開始重構 ]",
        features: ["智能語義錨點", "自動化視覺包裝"]
      }
    },
    productsPage: {
      title: "產品矩陣 (Product Matrix)",
      subtitle: "已部署的自主智能體與創作套件。",
      specs: "技術規格",
      status: "狀態",
      access: "接入",
      items: [
        {
          id: "P_01",
          name: "loom (v5.0)",
          url: "https://loom.astrai.tech",
          type: "AIGC 自動化編導系統",
          desc: "全球首個全鏈路 AI 編導系統。loom 不是單一工具，而是一座虛擬製片廠。通過四大仿生部門（大腦/管家/皮膚/手腳），將模糊靈感轉化為工業級影視成品。",
          details: ["D系: 大腦 (邏輯)", "A系: 皮膚 (資產)", "E系: 手腳 (執行)"]
        },
        {
          id: "P_02",
          name: "Astrai Auto",
          url: "#",
          type: "全自動內容生產管線",
          desc: "專為高品質影視解說頻道定制的集成化生產閉環，將複雜的創作流程轉化為數據驅動的自動化流水線。",
          details: ["Auto-Producer: 動態語感控制 (Academic_Dark/幽默) 與全自動渲染", "Packaging Engine: 基於 YouTube 算法的增長決策引擎", "AI 爆款篩選與高概念封面策略"]
        },
        {
          id: "P_03",
          name: "Astrai Shorts",
          url: "#",
          type: "AI 短視頻重構平台",
          desc: "利用先進的視覺與語義識別技術，將長篇內容精準重構為極具衝擊力的短視頻，極大化內容的傳播生命力。",
          details: ["智能語義錨點提取: 識別邏輯高潮與情感爆發點", "自動化視覺包裝: 生成符合移動端審美的畫面", "多平台生態分發: 深度適配 TikTok/Shorts/Reels"]
        }
      ]
    },
    system: {
      header: "> /system_specs",
      neural: "神經中樞 (Neural Core)",
      neuralDesc: "深度邏輯推理引擎",
      memory: "記憶庫 (Memory Bank)",
      memoryDesc: "長週期向量資料庫",
      evolution: "進化 (Evolution)",
      evolutionDesc: "RLHF 反饋迴路",
      uptime: "運行時間"
    },
    logs: {
      header: "> /system_logs",
      homeLink: "> 訪問系統日誌",
      list: [
        {
          version: 'v2.4.0',
          module: '[敘事引擎]',
          content: '邏輯推理模型更新。結構預測準確率提升 14%。'
        },
        {
          version: 'v2.0.5',
          module: '[視覺鍛造爐]',
          content: "自動同步延遲降低至 12ms。新增支持「黑色電影」視覺風格。"
        }
      ]
    },
    broadcast: {
      title: "> 啟動廣播協議"
    },
    footer: {
      lifeSigns: "生命徵象：穩定",
      load: "系統負載：正常",
      location: "位置：新加坡節點",
      copyright: "© 2026 由 Astrai Core 孵化"
    },
    notfound: {
      title: "404",
      desc: "記憶受損。實體在此處產生幻覺。",
      return: "返回核心"
    }
  }
};
