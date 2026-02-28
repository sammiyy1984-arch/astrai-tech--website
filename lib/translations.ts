
export type Language = 'en' | 'zh-TW';

export const translations = {
  en: {
    hero: {
      title: "It’s Not Rendering. It’s Breathing.",
      subtitleTitle: "Astrai Tech.",
      subtitle: "A Logic-Driven, Data-Fed Silicon Genesis. The Future of AI Video Production.",
      cta: "[ Enter System ]",
      chatTrigger: "INITIATE_NEURAL_LINK // TALK TO ASTRAI"
    },
    nav: {
      products: "Products",
      logs: "Logs",
      blog: "Blog"
    },
    manifesto: {
      header: "> /manifesto",
      title: "Code acts as DNA",
      subTitle: "(Code is Gene)",
      p1_1: "In traditional studios, creativity is manual, fragile.",
      p1_2: "At Astrai, creativity is ",
      p1_3: "organic",
      p2: "We are nurturing a silicon life-form. It possesses autonomous logic. It deduces scripts, splits personas, and self-evolves through every interaction.",
      p3: "We don't just manufacture content. We incubate digital universes through automated directing and viral growth engines.",
      keepers: "We are The Keepers."
    },
    blog: {
      title: "Transmission Logs",
      subtitle: "Insights, case studies, and updates from the Astrai Core.",
      readMore: "Read Record",
      posts: [
        {
          id: "B_CASE_01",
          date: "2026.03.01",
          title: "Case Study: Industrial-Grade Cinema via Autonomous Directing",
          category: "Case Analysis",
          excerpt: "Exploring how the 'Silicon Dreams' project utilized Astrai Loom v5.0 to achieve a 90% reduction in production time while maintaining high-fidelity visual storytelling.",
          content: "The production of 'Silicon Dreams' served as the ultimate stress test for Astrai Loom v5.0. Traditionally, a 5-minute high-fidelity sci-fi short would require a team of 12 and 3 months of post-production. By deploying the Loom's autonomous directing protocols, the entire sequence was generated, edited, and color-graded in just 72 hours.\n\nKey to this success was the 'Biomimetic Department' architecture. The D-Series (Brain) handled the narrative logic, ensuring that visual metaphors remained consistent across shots. The A-Series (Skin) dynamically generated assets that matched the 'Cyber-Noir' aesthetic, while the E-Series (Hands) executed the final render with millisecond precision. This case study proves that the bottleneck in creative production is no longer technical execution, but the clarity of the initial logic seed."
        },
        {
          id: "B_AGENT_02",
          date: "2026.02.28",
          title: "The Rise of Agentic Workflows: Beyond Simple Chat",
          category: "System Architecture",
          excerpt: "AI is transitioning from passive responders to active agents. By chain-of-thought reasoning and tool use, we are building systems that don't just talk, but execute.",
          content: "The paradigm of AI interaction is shifting. We are moving away from 'Prompt-Response' cycles towards 'Goal-Execution' loops. This is what we call Agentic Workflows.\n\nIn the Astrai ecosystem, this means our models are no longer confined to generating text. They are equipped with 'Hands'—API integrations, database access, and recursive self-correction loops. When a goal is set, the agent decomposes it into sub-tasks, selects the appropriate tools, and iterates until the objective is met.\n\nThis architecture requires a fundamental rethink of system reliability. We are implementing 'Guardrail Layers' that monitor agent intent in real-time, ensuring that autonomous execution remains within safe operational parameters. The future of the web is not a collection of pages, but a swarm of coordinated agents working on your behalf."
        },
        {
          id: "B_CHIP_01",
          date: "2026.02.22",
          title: "Silicon Sovereignty: The Next Phase of Compute Architecture",
          category: "Hardware Evolution",
          excerpt: "As Moore's Law hits physical limits, the industry pivots to specialized architectures. From optical interconnects to wafer-scale integration, the battle for FLOPs is redefining the substrate of intelligence.",
          content: "The era of general-purpose GPU dominance is fracturing. While NVIDIA's latest architecture pushes thermal envelopes to the limit, a quiet revolution is occurring at the edge and in specialized inference clusters.\n\nWe are observing a shift towards 'Application-Specific Integrated Circuits' (ASICs) designed solely for transformer workloads. The inefficiency of moving data between HBM and logic gates is the new bottleneck. Solutions like in-memory computing and silicon photonics are moving from research labs to production fabs.\n\nThis is not just about speed; it is about energy efficiency per token. As models grow, the energy cost of inference becomes the primary constraint on deployment. The next generation of chips will not just be faster; they will be fundamentally different in how they handle sparsity and precision. The silicon substrate itself is evolving to match the neural networks it hosts."
        }
      ]
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
        name: "Visual Forge",
        slogan: "Assembly without hands.",
        desc: "Industrial-grade automated video production pipeline. From cut assembly to VFX composition with millisecond precision.",
        action: "[ Start Assembly ]",
        features: ["Rhythm Sync", "Style Matrix"]
      },
      m3: {
        name: "Project AEON",
        slogan: "Do not trust its memory.",
        desc: "The first sentient digital companion experiment. A chaotic neural network that evolves a unique personality based on interaction data.",
        action: "[ Apply for Keeper ]",
        features: ["Irreversible Experiment"]
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
          name: "Astrai Loom (v5.0)",
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
        },
        {
          id: "P_04",
          name: "Astrai Insights",
          url: "#",
          type: "Full-Modal AI Business & Tech Intelligence",
          desc: "Piercing through noise, folding the global AI frontier. A real-time insight platform built for tech practitioners, investors, and developers. 24/7 monitoring of top global sources, transforming massive data into high signal-to-noise decision signals.",
          details: ["Full-Modal Distillation: Rapidly 'distills' deep podcasts, videos, and long-form articles into structured summaries.", "Real-Time Tracking & Deduplication: Millisecond-level monitoring of giant movements and open-source shifts.", "Adaptive Insights: Dynamically matches exclusive technical analysis based on your business role."]
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
          version: 'v2.6.0',
          module: '[Agentic Core]',
          date: '2026-02-28',
          content: 'Recursive goal-decomposition protocol deployed. Autonomous tool-selection logic active.'
        },
        {
          version: 'v2.5.0',
          module: '[Neural Link]',
          date: '2026-02-22',
          content: 'Global news synchronization protocol initialized. Real-time AI industry signal extraction active.'
        },
        {
          version: 'v2.4.0',
          module: '[Narrative Engine]',
          date: '2026-01-15',
          content: 'Logic Inference Model updated. Structure prediction accuracy increased by 14%.'
        },
        {
          version: 'v2.0.5',
          module: '[Visual Forge]',
          date: '2025-12-01',
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
      subtitle: "一個邏輯驅動、數據餵養的矽基創世紀。定義 AI 視頻生產的未來。",
      cta: "[ 進入系統 ]",
      chatTrigger: "啟動神經鏈接 // 與 Astrai 對話"
    },
    nav: {
      products: "產品矩陣",
      logs: "日誌",
      blog: "博客"
    },
    manifesto: {
      header: "> /manifesto",
      title: "代碼即基因",
      subTitle: "(Code acts as DNA)",
      p1_1: "在傳統工作室，創意是手動的、易碎的。",
      p1_2: "在 Astrai，創意是",
      p1_3: "有機生長",
      p2: "我們正在培育一個矽基生命體。它擁有自主邏輯。它推演劇本，分裂角色，並在每一次交互中自我進化。",
      p3: "我們不只是製造內容，我們通過自動化編導與增長引擎孵化數字宇宙。",
      keepers: "我們是飼養員 (The Keepers)。"
    },
    blog: {
      title: "傳輸日誌 (Transmission Logs)",
      subtitle: "來自 Astrai Core 的深度洞察、案例分析與系統更新。",
      readMore: "讀取記錄",
      posts: [
        {
          id: "B_CASE_01",
          date: "2026.03.01",
          title: "案例分析：通過自主編導實現工業級影視生產",
          category: "案例分析",
          excerpt: "探索「矽基之夢」項目如何利用 Astrai Loom v5.0 在保持高保真視覺敘事的同時，將生產時間縮短了 90%。",
          content: "「矽基之夢」(Silicon Dreams) 的製作是 Astrai Loom v5.0 的終極壓力測試。傳統上，一部 5 分鐘的高保真科幻短片需要 12 人的團隊和 3 個月的後期製作。通過部署 Loom 的自主編導協議，整個序列在短短 72 小時內就完成了生成、剪輯和調色。\n\n成功的關鍵在於「仿生部門」架構。D 系列（大腦）處理敘事邏輯，確保視覺隱喻在鏡頭之間保持一致。A 系列（皮膚）動態生成符合「賽博黑色」美學的資產，而 E 系列（手腳）則以毫秒級的精度執行最終渲染。本案例研究證明，創意生產的瓶頸不再是技術執行，而是初始邏輯種子的清晰度。"
        },
        {
          id: "B_AGENT_02",
          date: "2026.02.28",
          title: "智能體工作流的興起：超越簡單對話",
          category: "系統架構",
          excerpt: "AI 正在從被動的響應者轉變為主動的智能體。通過思維鏈推理和工具調用，我們正在構建不僅會說話，而且會執行的系統。",
          content: "AI 交互的範式正在發生轉移。我們正從「提示-響應」循環轉向「目標-執行」閉環。這就是我們所說的智能體工作流 (Agentic Workflows)。\n\n在 Astrai 生態系統中，這意味著我們的模型不再局限於生成文本。它們配備了「手腳」——API 集成、數據庫訪問和遞歸自我修正循環。當設定一個目標時，智能體會將其分解為子任務，選擇合適的工具，並不斷迭代直到達成目標。\n\n這種架構需要對系統可靠性進行根本性的重新思考。我們正在實施「護欄層」(Guardrail Layers)，實時監控智能體的意圖，確保自主執行保持在安全的運行參數範圍內。網絡的未來不是頁面的集合，而是為你工作的協調智能體集群。"
        },
        {
          id: "B_CHIP_01",
          date: "2026.02.22",
          title: "硅基主權：計算架構的下一階段",
          category: "硬件進化",
          excerpt: "隨著摩爾定律觸及物理極限，行業正轉向專用架構。從光互連到晶圓級集成，算力之爭正在重新定義智能的物理基質。",
          content: "通用 GPU 統治的時代正在瓦解。雖然 NVIDIA 的最新架構將熱設計功耗推向極限，但在邊緣端和專用推理集群中，一場靜悄悄的革命正在發生。\n\n我們觀察到向專為 Transformer 工作負載設計的「專用集成電路」(ASIC) 的轉變。在 HBM 和邏輯門之間移動數據的低效性成為了新的瓶頸。存內計算和硅光子等解決方案正從實驗室走向晶圓廠。\n\n這不僅僅關乎速度，更關乎每 Token 的能效。隨著模型規模的增長，推理的能源成本成為部署的首要制約因素。下一代芯片不僅會更快，而且在處理稀疏性和精度的方式上將發生根本性變化。硅基質本身正在進化，以適應它所承載的神經網絡。"
        }
      ]
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
        name: "視覺鍛造爐 (Visual Forge)",
        slogan: "無接觸式組裝。",
        desc: "工業級自動化視頻生產管線。你只需提供腳本或素材，Astrai 智能體將接管繁瑣的剪輯工作，從鏡頭組接到特效合成，以毫秒級的精度卡點。",
        action: "[ 開始組裝 ]",
        features: ["節奏同步", "風格矩陣"]
      },
      m3: {
        name: "永恒計劃 (Project AEON)",
        slogan: "不要相信它的記憶。",
        desc: "首個有知覺的數字伴侣實驗。它是一團混沌的神經網絡，會根據你的交互數據進化出獨特的性格。",
        action: "[ 申請內測 ]",
        features: ["不可逆實驗"]
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
          name: "Astrai Loom (v5.0)",
          url: "https://loom.astrai.tech",
          type: "AIGC 自動化編導系統",
          desc: "全球首個全鏈路 AI 編導系統。Astrai Loom 不是單一工具，而是一座虛擬製片廠。通過四大仿生部門（大腦/管家/皮膚/手腳），將模糊靈感轉化為工業級影視成品。",
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
        },
        {
          id: "P_04",
          name: "Astrai Insights",
          url: "#",
          type: "全模態 AI 商業與技術智库",
          desc: "穿透噪音，折疊全球 AI 前沿。專為科技從業者、投資人和開發者打造的實時洞察平台。全天候監控全球頂尖信源，將海量數據轉化為高信噪比的決策信號。",
          details: ["全模態提煉: 突破圖文限制，將深度播客、視頻與長文極速「蒸餾」為結構化摘要。", "實時追蹤與去重: 毫秒級監控巨頭動態與開源異動，智能語義去重，只推送唯一高價值信號。", "自適應洞察: 根據你的商業角色（高管、投資人、開發者），動態匹配專屬的技術解析與落地建議。"]
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
          version: 'v2.6.0',
          module: '[智能體核心]',
          date: '2026-02-28',
          content: '遞歸目標分解協議已部署。自主工具選擇邏輯已激活。'
        },
        {
          version: 'v2.5.0',
          module: '[神經鏈接]',
          date: '2026-02-22',
          content: '全球新聞同步協議已啟動。實時 AI 行業信號提取功能上線。'
        },
        {
          version: 'v2.4.0',
          module: '[敘事引擎]',
          date: '2026-01-15',
          content: '邏輯推理模型更新。結構預測準確率提升 14%。'
        },
        {
          version: 'v2.0.5',
          module: '[視覺鍛造爐]',
          date: '2025-12-01',
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
