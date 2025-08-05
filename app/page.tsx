"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Monitor,
  Smartphone,
  Send,
  TrendingUp,
  DollarSign,
  Settings,
  Home,
  BarChart3,
  Code,
  Shield,
  Target,
  Mic,
  MicOff,
  Globe,
  Bell,
  Lock,
  User,
  Palette,
  Calculator,
  PieChart,
  CreditCard,
  Wallet,
  CheckCircle,
  Star,
  Zap,
  Brain,
  FileText,
  RefreshCw,
  Copy,
  Heart,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { callAIAssistant } from "./actions/ai-assistant" // Import the server action

// Language translations
const translations = {
  en: {
    welcome: "Welcome to Tail AI",
    tagline: "Artificial Spending Intelligence",
    webPlatform: "Web Platform",
    mobileApp: "Mobile App",
    dashboard: "Dashboard",
    tailAI: "TAIL AI",
    analytics: "Analytics",
    developerAPI: "Developer API",
    settings: "Settings",
    financialManagement: "Financial Management Dashboard",
    professionalAI: "Professional AI-powered financial platform",
    creditScore: "Credit Score",
    totalBalance: "Total Balance",
    monthlySpending: "Monthly Spending",
    savingsRate: "Savings Rate",
    aiEfficiency: "AI Efficiency",
    voiceAssistant: "Voice Assistant",
    ready: "Ready",
    listening: "Listening...",
    voiceEnabled: "Voice commands enabled",
    chatAssistant: "AI Assistant",
    askFinances: "Ask me anything...",
    securityStatus: "Security Status",
    accountSecure: "Account Secure",
    fraudAlerts: "fraud alerts",
    transactionsVerified: "All transactions verified",
    home: "Home",
    api: "API",
    budgetPlanner: "Budget Planner",
    investmentTracker: "Investment Tracker",
    debtManager: "Debt Manager",
    goalSetter: "Goal Setter",
    expenseTracker: "Expense Tracker",
    creditMonitor: "Credit Monitor",
    taxCalculator: "Tax Calculator",
    savingsGoals: "Savings Goals",
    billReminders: "Bill Reminders",
    portfolioAnalysis: "Portfolio Analysis",
  },
  ru: {
    welcome: "Добро пожаловать в Tail AI",
    tagline: "Искусственный интеллект расходов",
    webPlatform: "Веб-платформа",
    mobileApp: "Мобильное приложение",
    dashboard: "Панель управления",
    tailAI: "TAIL AI",
    analytics: "Аналитика",
    developerAPI: "API разработчика",
    settings: "Настройки",
    financialManagement: "Панель управления финансами",
    professionalAI: "Профессиональная финансовая платформа на базе ИИ",
    creditScore: "Кредитный рейтинг",
    totalBalance: "Общий баланс",
    monthlySpending: "Месячные расходы",
    savingsRate: "Норма сбережений",
    aiEfficiency: "Эффективность ИИ",
    voiceAssistant: "Голосовой помощник",
    ready: "Готов",
    listening: "Слушаю...",
    voiceEnabled: "Голосовые команды включены",
    chatAssistant: "ИИ Помощник",
    askFinances: "Спросите меня о чем угодно...",
    securityStatus: "Статус безопасности",
    accountSecure: "Аккаунт защищен",
    fraudAlerts: "предупреждения о мошенничестве",
    transactionsVerified: "Все транзакции проверены",
    home: "Главная",
    api: "API",
    budgetPlanner: "Планировщик бюджета",
    investmentTracker: "Трекер инвестиций",
    debtManager: "Менеджер долгов",
    goalSetter: "Постановка целей",
    expenseTracker: "Трекер расходов",
    creditMonitor: "Кредитный монитор",
    taxCalculator: "Налоговый калькулятор",
    savingsGoals: "Цели сбережений",
    billReminders: "Напоминания о счетах",
    portfolioAnalysis: "Анализ портфеля",
  },
  es: {
    welcome: "Bienvenido a Tail AI",
    tagline: "Inteligencia Artificial de Gastos",
    webPlatform: "Plataforma Web",
    mobileApp: "Aplicación Móvil",
    dashboard: "Panel de Control",
    tailAI: "TAIL AI",
    analytics: "Análisis",
    developerAPI: "API de Desarrollador",
    settings: "Configuración",
    financialManagement: "Panel de Gestión Financiera",
    professionalAI: "Plataforma financiera profesional impulsada por IA",
    creditScore: "Puntuación de Crédito",
    totalBalance: "Balance Total",
    monthlySpending: "Gasto Mensual",
    savingsRate: "Tasa de Ahorro",
    aiEfficiency: "Eficiencia de IA",
    voiceAssistant: "Asistente de Voz",
    ready: "Listo",
    listening: "Escuchando...",
    voiceEnabled: "Comandos de voz habilitados",
    chatAssistant: "Asistente IA",
    askFinances: "Pregúntame cualquier cosa...",
    securityStatus: "Estado de Seguridad",
    accountSecure: "Cuenta Segura",
    fraudAlerts: "alertas de fraude",
    transactionsVerified: "Todas las transacciones verificadas",
    home: "Inicio",
    api: "API",
    budgetPlanner: "Planificador de Presupuesto",
    investmentTracker: "Rastreador de Inversiones",
    debtManager: "Gestor de Deudas",
    goalSetter: "Establecedor de Metas",
    expenseTracker: "Rastreador de Gastos",
    creditMonitor: "Monitor de Crédito",
    taxCalculator: "Calculadora de Impuestos",
    savingsGoals: "Metas de Ahorro",
    billReminders: "Recordatorios de Facturas",
    portfolioAnalysis: "Análisis de Cartera",
  },
  zh: {
    welcome: "欢迎使用 Tail AI",
    tagline: "人工智能消费管理",
    webPlatform: "网络平台",
    mobileApp: "移动应用",
    dashboard: "仪表板",
    tailAI: "TAIL AI",
    analytics: "分析",
    developerAPI: "开发者 API",
    settings: "设置",
    financialManagement: "财务管理仪表板",
    professionalAI: "专业的AI驱动金融平台",
    creditScore: "信用评分",
    totalBalance: "总余额",
    monthlySpending: "月度支出",
    savingsRate: "储蓄率",
    aiEfficiency: "AI效率",
    voiceAssistant: "语音助手",
    ready: "准备就绪",
    listening: "正在聆听...",
    voiceEnabled: "语音命令已启用",
    chatAssistant: "AI助手",
    askFinances: "问我任何问题...",
    securityStatus: "安全状态",
    accountSecure: "账户安全",
    fraudAlerts: "欺诈警报",
    transactionsVerified: "所有交易已验证",
    home: "首页",
    api: "API",
    budgetPlanner: "预算规划师",
    investmentTracker: "投资跟踪器",
    debtManager: "债务管理器",
    goalSetter: "目标设定器",
    expenseTracker: "支出跟踪器",
    creditMonitor: "信用监控器",
    taxCalculator: "税务计算器",
    savingsGoals: "储蓄目标",
    billReminders: "账单提醒",
    portfolioAnalysis: "投资组合分析",
  },
}

export default function TailAIDemo() {
  const [currentView, setCurrentView] = useState("loading")
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [language, setLanguage] = useState("en")
  const [isListening, setIsListening] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm TAIL AI, your intelligent assistant created by Zuhayr, Erkebai, and Nurtilek in January 2025. I can help you with financial analysis, spending optimization, investment advice, and much more. What would you like to explore today?",
      sender: "ai",
      time: "2:30 PM",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [generatedApiKey, setGeneratedApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [showDocumentation, setShowDocumentation] = useState(false)

  // Feature states
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [showFeatureModal, setShowFeatureModal] = useState(false)

  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setCurrentView("intro"), 1000)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: inputMessage,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages([...chatMessages, newMessage])
      const currentInput = inputMessage
      setInputMessage("")
      setIsTyping(true)
      setIsLoading(true)

      try {
        // Call the server action
        const aiResponse = await callAIAssistant(currentInput)

        const response = {
          id: chatMessages.length + 2,
          text: aiResponse,
          sender: "ai",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setChatMessages((prev) => [...prev, response])
      } catch (error) {
        console.error("AI Assistant Error:", error)

        // Fallback response
        const fallbackResponse = getFallbackResponse(currentInput)
        const errorResponse = {
          id: chatMessages.length + 2,
          text: fallbackResponse,
          sender: "ai",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setChatMessages((prev) => [...prev, errorResponse])
      } finally {
        setIsTyping(false)
        setIsLoading(false)
      }
    }
  }

  // Add fallback function for when server action fails
  const getFallbackResponse = (userInput: string) => {
    const input = userInput.toLowerCase()

    if (input.includes("budget") || input.includes("plan")) {
      return "💰 I'd love to help you create a budget! Here's a quick tip: Follow the 50/30/20 rule - 50% for needs, 30% for wants, and 20% for savings. Would you like me to help you break down your specific income and expenses?"
    }

    if (input.includes("credit") || input.includes("score")) {
      return "📊 Great question about credit! To improve your credit score: 1) Pay bills on time, 2) Keep credit utilization below 30%, 3) Don't close old accounts, 4) Monitor your credit report regularly. What's your current credit situation?"
    }

    if (input.includes("invest") || input.includes("portfolio")) {
      return "📈 Investment advice coming up! For beginners, I recommend starting with: 1) Emergency fund first, 2) Low-cost index funds, 3) Diversified portfolio, 4) Dollar-cost averaging. What's your investment timeline and risk tolerance?"
    }

    return "Hi! I'm TAIL AI, your financial assistant created by Zuhayr, Erkebai, and Nurtilek. I can help with budgeting, investments, credit scores, and more! What financial topic would you like to explore? 💡"
  }

  const toggleVoiceListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false)
        setInputMessage("Hey Tail, can you help me create a budget plan for this month?")
      }, 3000)
    }
  }

  const generateProductionApiKey = () => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 15)
    const apiKey = `tail_prod_${timestamp}${random}`
    setGeneratedApiKey(apiKey)
    setShowApiKey(true)
    setTimeout(() => setShowApiKey(false), 10000)
  }

  const generateSandboxApiKey = () => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 15)
    const apiKey = `tail_test_${timestamp}${random}`
    setGeneratedApiKey(apiKey)
    setShowApiKey(true)
    setTimeout(() => setShowApiKey(false), 10000)
  }

  const showCompleteDocumentation = () => {
    setShowDocumentation(true)
  }

  // Financial Features Data
  const financialFeatures = [
    {
      id: "budget-planner",
      name: t.budgetPlanner,
      icon: Calculator,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Create and manage your monthly budget with AI insights",
      features: ["Income tracking", "Expense categorization", "Budget alerts", "Savings recommendations"],
    },
    {
      id: "investment-tracker",
      name: t.investmentTracker,
      icon: TrendingUp,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Track your investments and get portfolio analysis",
      features: ["Portfolio overview", "Performance tracking", "Risk analysis", "Rebalancing suggestions"],
    },
    {
      id: "debt-manager",
      name: t.debtManager,
      icon: CreditCard,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "Manage and optimize your debt repayment strategy",
      features: ["Debt snowball", "Payment scheduling", "Interest tracking", "Payoff timeline"],
    },
    {
      id: "goal-setter",
      name: t.goalSetter,
      icon: Target,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Set and track your financial goals with AI guidance",
      features: ["Goal planning", "Progress tracking", "Milestone alerts", "Achievement rewards"],
    },
    {
      id: "expense-tracker",
      name: t.expenseTracker,
      icon: PieChart,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "Track and categorize all your expenses automatically",
      features: ["Auto-categorization", "Receipt scanning", "Spending insights", "Monthly reports"],
    },
    {
      id: "credit-monitor",
      name: t.creditMonitor,
      icon: Shield,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      description: "Monitor your credit score and get improvement tips",
      features: ["Score tracking", "Credit alerts", "Improvement tips", "Report analysis"],
    },
    {
      id: "tax-calculator",
      name: t.taxCalculator,
      icon: FileText,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Calculate taxes and optimize your tax strategy",
      features: ["Tax estimation", "Deduction finder", "Filing assistance", "Refund tracking"],
    },
    {
      id: "savings-goals",
      name: t.savingsGoals,
      icon: Wallet,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      description: "Set and achieve your savings goals with smart planning",
      features: ["Goal setting", "Auto-saving", "Progress tracking", "Reward system"],
    },
    {
      id: "bill-reminders",
      name: t.billReminders,
      icon: Bell,
      color: "bg-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      description: "Never miss a bill with smart reminders and auto-pay",
      features: ["Bill tracking", "Payment reminders", "Auto-pay setup", "Late fee alerts"],
    },
    {
      id: "portfolio-analysis",
      name: t.portfolioAnalysis,
      icon: BarChart3,
      color: "bg-teal-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      description: "Deep analysis of your investment portfolio performance",
      features: ["Performance metrics", "Risk assessment", "Diversification analysis", "Optimization tips"],
    },
  ]

  const openFeatureModal = (feature: any) => {
    setSelectedFeature(feature)
    setShowFeatureModal(true)
  }

  if (currentView === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          {/* Language Selector */}
          <div className="absolute top-8 right-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Globe className="w-4 h-4 text-slate-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="en">EN</option>
                <option value="ru">RU</option>
                <option value="es">ES</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>

          {/* Loading Title */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-slate-800 mb-4">Tail AI Demo Version</h1>
            <p className="text-xl text-slate-600">Initializing AI-powered financial platform...</p>
          </div>

          {/* Main Credit Card */}
          <div className="w-[420px] h-64 bg-gradient-to-r from-slate-800 to-slate-600 rounded-3xl shadow-2xl p-6 mb-12 mx-auto">
            <div className="text-white h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-8 bg-yellow-400 rounded-lg"></div>
                <div className="text-right">
                  <div className="text-sm font-bold tracking-wider">TAIL AI</div>
                  <div className="text-xs opacity-90">PREMIUM</div>
                </div>
              </div>

              <div className="flex items-center justify-center flex-1">
                <div className="bg-white/20 rounded-full p-3">
                  <Image
                    src="/tail-official-logo.png"
                    alt="Tail AI"
                    width={50}
                    height={50}
                    className="brightness-0 invert"
                  />
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-lg font-mono tracking-[0.15em] mb-2">•••• •••• •••• 2024</div>
                  <div className="text-sm font-semibold">JARED FRIEDMAN</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-90 mb-1">EXPIRES</div>
                  <div className="text-sm font-semibold">12/28</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-8">
            <div className="w-96 mx-auto mb-6">
              <div className="bg-slate-200 rounded-full h-2 shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300 relative overflow-hidden"
                  style={{ width: `${loadingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between text-slate-600 mt-3">
                <span className="font-medium">Progress</span>
                <span className="font-bold text-indigo-600">{Math.round(loadingProgress)}%</span>
              </div>
            </div>

            <div className="text-slate-700 text-lg font-medium">
              {loadingProgress < 20 && <span className="text-blue-600">🔄 Initializing systems...</span>}
              {loadingProgress >= 20 && loadingProgress < 40 && (
                <span className="text-purple-600">🏦 Connecting database...</span>
              )}
              {loadingProgress >= 40 && loadingProgress < 60 && (
                <span className="text-emerald-600">📊 Loading data...</span>
              )}
              {loadingProgress >= 60 && loadingProgress < 80 && (
                <span className="text-orange-600">🔐 Securing environment...</span>
              )}
              {loadingProgress >= 80 && loadingProgress < 95 && (
                <span className="text-rose-600">⚡ Finalizing setup...</span>
              )}
              {loadingProgress >= 95 && <span className="text-emerald-600">✨ Ready to launch!</span>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 relative">
        {/* Language Selector */}
        <div className="absolute top-8 right-8">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <Globe className="w-4 h-4 text-slate-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="es">ES</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>

        {/* Logo in top left */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Tail AI" width={48} height={48} />
            <div className="text-slate-800 font-bold text-xl">Tail AI</div>
          </div>
        </div>

        {/* Main content centered */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl font-bold text-slate-800 mb-4">{t.welcome}</h1>
            <p className="text-2xl text-slate-600 mb-12">{t.tagline}</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setCurrentView("computer")}
                className="flex items-center gap-4 px-8 py-4 bg-slate-800 text-white rounded-2xl shadow-xl hover:bg-slate-700 transition-all hover:scale-105"
              >
                <Monitor className="w-6 h-6" />
                <span className="text-lg font-bold">{t.webPlatform}</span>
              </button>

              <button
                onClick={() => setCurrentView("mobile")}
                className="flex items-center gap-4 px-8 py-4 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-500 transition-all hover:scale-105"
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-lg font-bold">{t.mobileApp}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "computer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200 shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <Button onClick={() => setCurrentView("intro")} variant="ghost" className="text-slate-700 mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-slate-800">Tail AI {t.dashboard}</h1>

            {/* Language Selector in Sidebar */}
            <div className="mt-4">
              <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                <Globe className="w-4 h-4 text-slate-600" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none flex-1"
                >
                  <option value="en">English</option>
                  <option value="ru">Русский</option>
                  <option value="es">Español</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  currentPage === "dashboard"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <Home className="w-5 h-5" />
                {t.dashboard}
              </button>

              <button
                onClick={() => setCurrentPage("ai-assistant")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  currentPage === "ai-assistant"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <Brain className="w-5 h-5" />
                {t.tailAI}
              </button>

              <button
                onClick={() => setCurrentPage("analytics")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  currentPage === "analytics"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                {t.analytics}
              </button>

              <button
                onClick={() => setCurrentPage("api")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  currentPage === "api"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <Code className="w-5 h-5" />
                {t.developerAPI}
              </button>
            </div>
          </div>

          {/* Settings at bottom */}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={() => setCurrentPage("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                currentPage === "settings"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Settings className="w-5 h-5" />
              {t.settings}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {currentPage === "dashboard" && (
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">{t.financialManagement}</h2>
                <p className="text-xl text-slate-600">{t.professionalAI}</p>
              </div>

              {/* Main Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <button
                  onClick={() => setCurrentPage("ai-assistant")}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-left hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Brain className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{t.tailAI}</h3>
                  <p className="text-slate-600">Chat with your intelligent AI assistant</p>
                  <div className="mt-4 flex items-center text-indigo-600 font-semibold">
                    <span>Explore</span>
                    <Sparkles className="w-4 h-4 ml-2" />
                  </div>
                </button>

                <button
                  onClick={() => setCurrentPage("analytics")}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-left hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{t.analytics}</h3>
                  <p className="text-slate-600">View spending analytics and AI Card</p>
                  <div className="mt-4 flex items-center text-emerald-600 font-semibold">
                    <span>Analyze</span>
                    <BarChart3 className="w-4 h-4 ml-2" />
                  </div>
                </button>

                <button
                  onClick={() => setCurrentPage("api")}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-left hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Code className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{t.developerAPI}</h3>
                  <p className="text-slate-600">Access developer tools and APIs</p>
                  <div className="mt-4 flex items-center text-orange-600 font-semibold">
                    <span>Develop</span>
                    <Zap className="w-4 h-4 ml-2" />
                  </div>
                </button>
              </div>

              {/* Financial Features Grid */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Financial Tools & Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {financialFeatures.map((feature) => {
                    const IconComponent = feature.icon
                    return (
                      <button
                        key={feature.id}
                        onClick={() => openFeatureModal(feature)}
                        className={`${feature.bgColor} ${feature.borderColor} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm">{feature.name}</h4>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mb-3">{feature.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500">Click to explore</span>
                          <Star className="w-4 h-4 text-yellow-500" />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Credit Score Section */}
              <div className="bg-white rounded-2xl p-8 shadow-xl mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{t.creditScore}</h3>
                    <p className="text-slate-600">Powered by Experian</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-bold text-slate-800">742</span>
                      <span className="text-lg font-semibold text-blue-600">Very Good</span>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span>300</span>
                        <span>850</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 to-green-500 h-4 rounded-full relative"
                          style={{ width: "100%" }}
                        >
                          <div
                            className="absolute top-0 w-1 h-4 bg-slate-800 rounded-full"
                            style={{ left: `${((742 - 300) / 550) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-800 mb-1">Goal: Premium Credit</p>
                          <p className="text-sm text-slate-600">
                            You need a credit score of 750+ for premium rates. You're only 8 points away!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-800 mb-1">According to Tail AI</p>
                          <p className="text-sm text-green-700">
                            You will have +20 points next month with your current payment habits.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-blue-800 mb-1">Credit Utilization</p>
                          <p className="text-sm text-blue-700">
                            Keep it below 30% for optimal score growth. Currently at 23%.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-purple-800 mb-1">Payment History</p>
                          <p className="text-sm text-purple-700">
                            Perfect 100% on-time payments for the last 12 months.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">$24,580</div>
                  <div className="text-slate-600 text-sm">{t.totalBalance}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$3,892</div>
                  <div className="text-slate-600 text-sm">{t.monthlySpending}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-purple-600 mb-2">26%</div>
                  <div className="text-slate-600 text-sm">{t.savingsRate}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-orange-600 mb-2">94%</div>
                  <div className="text-slate-600 text-sm">{t.aiEfficiency}</div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "ai-assistant" && (
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <Brain className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">{t.tailAI} Assistant</h2>
                </div>
                <p className="text-slate-600 text-lg">Professional AI Assistant</p>
                <p className="text-slate-500 text-sm mt-2">Created by Zuhayr, Erkebai & Nurtilek • January 2025</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Voice Assistant - Enhanced */}
                <div className="xl:col-span-1">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-800 mb-6">{t.voiceAssistant}</h3>

                      {/* Voice Button - Enhanced */}
                      <div className="flex justify-center mb-6">
                        <button
                          onClick={toggleVoiceListening}
                          className={`w-32 h-32 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
                            isListening
                              ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse scale-110"
                              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105"
                          }`}
                        >
                          {isListening ? (
                            <div className="flex flex-col items-center">
                              <MicOff className="w-12 h-12 text-white mb-1" />
                              <span className="text-white text-xs font-semibold">Stop</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <Mic className="w-12 h-12 text-white mb-1" />
                              <span className="text-white text-xs font-semibold">Talk</span>
                            </div>
                          )}
                        </button>
                      </div>

                      {/* Status */}
                      <div className="text-slate-800 mb-6">
                        <div className="text-lg font-bold mb-2">{isListening ? t.listening : t.ready}</div>
                        <div className="text-sm text-slate-600">{t.voiceEnabled}</div>
                      </div>

                      {/* Quick Actions - Enhanced */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Quick Commands</h4>
                        <button
                          onClick={() => setInputMessage("Hey Tail, can you analyze my spending patterns?")}
                          className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg text-sm transition-all border border-blue-200"
                        >
                          <div className="flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">Analyze spending</span>
                          </div>
                        </button>
                        <button
                          onClick={() => setInputMessage("I want to create a budget for next month")}
                          className="w-full text-left px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-lg text-sm transition-all border border-green-200"
                        >
                          <div className="flex items-center gap-2">
                            <Calculator className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Create budget</span>
                          </div>
                        </button>
                        <button
                          onClick={() => setInputMessage("How can I improve my credit score quickly?")}
                          className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg text-sm transition-all border border-purple-200"
                        >
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-purple-600" />
                            <span className="font-medium">Improve credit</span>
                          </div>
                        </button>
                        <button
                          onClick={() => setInputMessage("What are the best investment options for me?")}
                          className="w-full text-left px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-lg text-sm transition-all border border-orange-200"
                        >
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-600" />
                            <span className="font-medium">Investment advice</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Interface - Enhanced */}
                <div className="xl:col-span-2">
                  <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col">
                    {/* Chat Header - Enhanced */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                          <Brain className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">{t.tailAI} Chat</h3>
                          <p className="text-slate-600 text-sm">{t.chatAssistant}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-semibold">Online</span>
                      </div>
                    </div>

                    {/* Messages Area - Enhanced */}
                    <div className="flex-1 p-6 overflow-y-auto max-h-[500px]">
                      <div className="space-y-6">
                        {chatMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex items-start gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                            >
                              {message.sender === "ai" && (
                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Brain className="w-5 h-5 text-indigo-600" />
                                </div>
                              )}
                              {message.sender === "user" && (
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-slate-600 font-bold text-sm">JF</span>
                                </div>
                              )}
                              <div
                                className={`px-4 py-3 rounded-2xl shadow-lg ${
                                  message.sender === "user"
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                    : "bg-slate-50 text-slate-800 border border-slate-200"
                                }`}
                              >
                                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                                <p className="text-xs opacity-70 mt-2">{message.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="flex items-start gap-3 max-w-[85%]">
                              <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Brain className="w-5 h-5 text-indigo-600" />
                              </div>
                              <div className="px-4 py-3 rounded-2xl shadow-lg bg-slate-50 text-slate-800 border border-slate-200">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                  <span className="text-xs text-slate-600 ml-2">
                                    {isLoading ? "Thinking..." : "Typing..."}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Input Area - Enhanced */}
                    <div className="p-6 border-t border-slate-200">
                      <div className="flex gap-3">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && !isLoading && sendMessage()}
                          placeholder={t.askFinances}
                          className="flex-1 text-base"
                          disabled={isLoading}
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!inputMessage.trim() || isLoading}
                          size="lg"
                          className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        >
                          {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 text-center">
                        Powered by OpenAI GPT-3.5 • Ask me anything about finance, budgeting, or investments!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature Modal */}
          {showFeatureModal && selectedFeature && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${selectedFeature.color} rounded-xl flex items-center justify-center`}>
                      <selectedFeature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{selectedFeature.name}</h2>
                      <p className="text-slate-600">{selectedFeature.description}</p>
                    </div>
                  </div>
                  <Button onClick={() => setShowFeatureModal(false)} variant="ghost" size="sm">
                    ✕
                  </Button>
                </div>

                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedFeature.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                    <h4 className="text-lg font-bold text-slate-800 mb-3">Coming Soon!</h4>
                    <p className="text-slate-600 mb-4">
                      This feature is currently in development. Our team is working hard to bring you the best financial
                      tools.
                    </p>
                    <div className="flex gap-3">
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Me
                      </Button>
                      <Button variant="outline">
                        <Heart className="w-4 h-4 mr-2" />
                        Add to Wishlist
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue with other pages... */}
          {currentPage === "analytics" && (
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Financial {t.analytics} & AI Card</h2>
                <p className="text-slate-600 text-lg">Professional spending insights and AI-powered card management</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                {/* AI Card - Enhanced */}
                <div className="flex flex-col items-center justify-start">
                  <div className="relative w-full max-w-md">
                    <div className="w-full aspect-[1.6/1] bg-gradient-to-r from-slate-800 to-slate-600 rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-shadow">
                      <div className="text-white h-full flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div className="bg-white/20 rounded-full px-3 py-1">
                            <span className="text-white font-bold text-xs">AI POWERED</span>
                          </div>
                          <div className="w-12 h-8 bg-yellow-400 rounded-lg"></div>
                        </div>

                        <div className="flex items-center justify-center flex-1">
                          <div className="bg-white/20 rounded-full p-4">
                            <Image
                              src="/tail-logo-official.png"
                              alt="Tail AI"
                              width={60}
                              height={60}
                              className="brightness-0 invert"
                            />
                          </div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-white font-mono text-lg mb-2">•••• •••• •••• 2024</div>
                            <div className="text-white text-sm">JARED FRIEDMAN</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white/90 text-xs mb-1">TAIL AI</div>
                            <div className="text-white text-sm">PREMIUM</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Details - Enhanced */}
                    <div className="mt-8 space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <Shield className="w-6 h-6 text-green-600" />
                          <div>
                            <h4 className="font-bold text-green-800">{t.securityStatus}</h4>
                            <p className="text-sm text-green-700">0 {t.fraudAlerts} detected</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Professional AI Card</h3>
                        <p className="text-slate-600 mb-6">Intelligent spending with real-time AI insights</p>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-emerald-600 font-bold text-xl">$2,450</div>
                            <div className="text-slate-600 text-xs mt-1">Available Balance</div>
                          </div>
                          <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-blue-600 font-bold text-xl">94%</div>
                            <div className="text-slate-600 text-xs mt-1">{t.aiEfficiency}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spending Categories - Enhanced */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Spending {t.analytics}</h3>

                  {[
                    {
                      name: "Food & Dining",
                      amount: "$1,245",
                      percentage: 35,
                      color: "bg-red-500",
                      bgColor: "bg-red-50",
                      borderColor: "border-red-200",
                      trend: "+5%",
                      trendColor: "text-red-600",
                    },
                    {
                      name: "Travel",
                      amount: "$890",
                      percentage: 25,
                      color: "bg-blue-500",
                      bgColor: "bg-blue-50",
                      borderColor: "border-blue-200",
                      trend: "-12%",
                      trendColor: "text-green-600",
                    },
                    {
                      name: "Shopping",
                      amount: "$567",
                      percentage: 20,
                      color: "bg-emerald-500",
                      bgColor: "bg-emerald-50",
                      borderColor: "border-emerald-200",
                      trend: "+8%",
                      trendColor: "text-red-600",
                    },
                    {
                      name: "Subscriptions",
                      amount: "$156",
                      percentage: 15,
                      color: "bg-purple-500",
                      bgColor: "bg-purple-50",
                      borderColor: "border-purple-200",
                      hasButton: true,
                      trend: "0%",
                      trendColor: "text-slate-600",
                    },
                    {
                      name: "Utilities",
                      amount: "$234",
                      percentage: 5,
                      color: "bg-orange-500",
                      bgColor: "bg-orange-50",
                      borderColor: "border-orange-200",
                      trend: "-3%",
                      trendColor: "text-green-600",
                    },
                  ].map((category, index) => (
                    <div
                      key={index}
                      className={`${category.bgColor} ${category.borderColor} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-slate-800 font-bold text-lg">{category.name}</h4>
                          <p className="text-slate-600 text-sm">{category.percentage}% of total spending</p>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div>
                            <div className="text-slate-800 font-bold text-xl">{category.amount}</div>
                            <div className={`text-xs font-semibold ${category.trendColor}`}>{category.trend}</div>
                          </div>
                          {category.hasButton && (
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              Manage
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-white/60 rounded-full h-3 shadow-inner">
                        <div
                          className={`h-full ${category.color} rounded-full transition-all duration-700 shadow-sm`}
                          style={{ width: `${Math.min(category.percentage * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-slate-800 font-bold text-xl mb-2">Total {t.monthlySpending}</h4>
                        <p className="text-slate-600">Across all categories</p>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-800 font-bold text-3xl">$3,892</div>
                        <div className="text-emerald-600 font-bold text-sm">↓ 12% from last month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "api" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">TAIL AI {t.developerAPI}</h2>
                <p className="text-slate-600 text-lg mb-2">Advanced AI-powered financial intelligence platform</p>
                <p className="text-slate-500 text-sm">
                  Fraud detection • Compliance analysis • Spending insights • Credit monitoring
                </p>
              </div>

              {/* API Documentation */}
              <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{t.api} Documentation</h3>
                    <p className="text-slate-600 text-sm">Complete integration guide and endpoints</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Base URL and Authentication */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Base URL</h4>
                      <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm border">
                        https://api.tailai.com/v1
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Authentication</h4>
                      <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                        <div className="font-mono text-sm">Authorization: Bearer YOUR_API_KEY</div>
                        <div className="font-mono text-sm">Content-Type: application/json</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Sample API Keys</h4>
                      <div className="space-y-2">
                        <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs">
                          <div className="text-slate-600 mb-1">Production:</div>
                          <div className="text-slate-800">tail_A8x9Bm3nQ7wE2rT5yU8oP1aS6dF9gH4j</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs">
                          <div className="text-slate-600 mb-1">Sandbox:</div>
                          <div className="text-slate-800">test_tail_Xur4yedir3jbffjrnf7jrni9k2m8n5p</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Test */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Quick Test</h4>
                      <div className="bg-slate-900 rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                        <div className="text-green-400 mb-2"># Fraud Detection Test</div>
                        <div className="text-white">curl -X POST https://api.tailai.com/v1/fraud-check \ </div>
                        <div className="text-white ml-2">-H "Authorization: Bearer YOUR_KEY" \ </div>
                        <div className="text-white ml-2">-H "Content-Type: application/json" \ </div>
                        <div className="text-white ml-2">
                          -d{" "}
                          {
                            '"{"transaction_id": "txn_001","user_id": "user_001","amount": 1250.00,"merchant": "Restaurant"}"'
                          }
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Expected Response</h4>
                      <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                        <div className="text-slate-800">{`{
  "transaction_id": "txn_001",
  "risk_score": 0.084,
  "flagged": false,
  "action": "approve",
  "confidence": "high",
  "ai_engine": "Tail AI v2.1"
}`}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Key Generation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Generate {t.api} Keys</h3>
                      <p className="text-slate-600 text-sm">Secure access to TAIL AI services</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={generateProductionApiKey}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-base font-semibold"
                    >
                      Generate Production {t.api} Key
                    </Button>

                    <Button
                      onClick={generateSandboxApiKey}
                      className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 text-base font-semibold"
                    >
                      Generate Sandbox {t.api} Key
                    </Button>

                    <Button
                      onClick={showCompleteDocumentation}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-base font-semibold"
                    >
                      View Complete Documentation
                    </Button>
                  </div>
                </div>

                {/* API Capabilities */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{t.api} Capabilities</h3>
                      <p className="text-slate-600 text-sm">Comprehensive financial intelligence</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Fraud Detection Engine</h4>
                      <p className="text-sm text-slate-600">
                        Real-time transaction monitoring and suspicious activity detection using advanced AI algorithms.
                      </p>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Compliance {t.analytics}</h4>
                      <p className="text-sm text-slate-600">
                        Automated compliance scanning and regulatory reporting for financial institutions.
                      </p>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Spending Intelligence</h4>
                      <p className="text-sm text-slate-600">
                        Deep analysis of user spending patterns, habits, and behavioral insights.
                      </p>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Credit Usage Monitoring</h4>
                      <p className="text-sm text-slate-600">
                        Comprehensive credit utilization tracking and score optimization recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Key Modal */}
              {showApiKey && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{t.api} Key Generated</h3>
                      <p className="text-slate-600 text-sm">Copy and save this key securely</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                      <div className="font-mono text-sm text-slate-800 break-all">{generatedApiKey}</div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => navigator.clipboard.writeText(generatedApiKey)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Key
                      </Button>
                      <Button onClick={() => setShowApiKey(false)} variant="outline" className="flex-1">
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Documentation Modal */}
              {showDocumentation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-slate-800">TAIL AI Complete {t.api} Documentation</h2>
                      <Button onClick={() => setShowDocumentation(false)} variant="ghost" size="sm">
                        ✕
                      </Button>
                    </div>

                    <div className="p-8 space-y-8">
                      <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Overview</h3>
                        <p className="text-slate-600 mb-4">
                          The TAIL AI {t.api} provides comprehensive financial intelligence services including fraud
                          detection, compliance analysis, spending insights, and credit monitoring. Our {t.api}{" "}
                          processes over 10,000 transactions daily with 99.9% uptime.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Key Features</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Real-time fraud detection with AI scoring</li>
                            <li>• Automated compliance checking and reporting</li>
                            <li>• Advanced spending pattern analysis</li>
                            <li>• Credit score monitoring and optimization</li>
                            <li>• 10,000+ daily transaction processing capacity</li>
                          </ul>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              )}

              {/* Usage Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
                  <div className="text-slate-600 text-sm">{t.api} Uptime</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-green-600 mb-2">10K</div>
                  <div className="text-slate-600 text-sm">Daily Transactions</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-red-600 mb-2">847</div>
                  <div className="text-slate-600 text-sm">Fraud Cases Detected</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl font-bold text-purple-600 mb-2">156ms</div>
                  <div className="text-slate-600 text-sm">Average Response Time</div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "settings" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">{t.settings}</h2>
                <p className="text-slate-600 mb-8 text-lg">Manage your Tail AI preferences</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Account Settings */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Account {t.settings}</h3>
                      <p className="text-slate-600 text-sm">Manage your profile and preferences</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Profile Information</h4>
                      <p className="text-sm text-slate-600 mb-3">Update your personal details</p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Edit Profile</Button>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Language Preferences</h4>
                      <p className="text-sm text-slate-600 mb-3">Current: {language.toUpperCase()}</p>
                      <div className="flex gap-2">
                        {Object.keys(translations).map((lang) => (
                          <Button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            variant={language === lang ? "default" : "outline"}
                            size="sm"
                          >
                            {lang.toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Security</h3>
                      <p className="text-slate-600 text-sm">Protect your account and data</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-600 mb-3">Add an extra layer of security</p>
                      <Button className="w-full bg-red-600 hover:bg-red-700">Enable 2FA</Button>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Password</h4>
                      <p className="text-sm text-slate-600 mb-3">Change your account password</p>
                      <Button className="w-full bg-slate-600 hover:bg-slate-700">Change Password</Button>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <Bell className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Notifications</h3>
                      <p className="text-slate-600 text-sm">Control your notification preferences</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-800">Email Notifications</h4>
                        <Button size="sm" variant="outline">
                          On
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600">Receive updates via email</p>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-800">Fraud Alerts</h4>
                        <Button size="sm" variant="outline">
                          On
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600">Instant fraud detection alerts</p>
                    </div>
                  </div>
                </div>

                {/* App Preferences */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                      <Palette className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">App Preferences</h3>
                      <p className="text-slate-600 text-sm">Customize your app experience</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Theme</h4>
                      <p className="text-sm text-slate-600 mb-3">Choose your preferred theme</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Light
                        </Button>
                        <Button size="sm" variant="outline">
                          Dark
                        </Button>
                        <Button size="sm" variant="outline">
                          Auto
                        </Button>
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-2">Currency</h4>
                      <p className="text-sm text-slate-600 mb-3">Display currency preference</p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">USD ($)</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentView === "mobile") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button onClick={() => setCurrentView("intro")} variant="ghost" className="text-slate-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-slate-800">Tail AI Mobile</h1>
            <div className="w-24"></div>
          </div>

          <div className="flex justify-center">
            <div className="w-80 h-[700px] bg-gray-800 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                <div className="bg-gradient-to-br from-white to-blue-50 h-full flex flex-col overflow-y-auto">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-slate-800 text-sm pt-12 px-6 pb-4 flex-shrink-0">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-slate-800 rounded-sm">
                        <div className="w-3 h-1 bg-slate-800 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div className="px-6 mb-4 flex-shrink-0">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1">
                        <Globe className="w-3 h-3 text-slate-600" />
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none"
                        >
                          <option value="en">EN</option>
                          <option value="ru">RU</option>
                          <option value="es">ES</option>
                          <option value="zh">中文</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center px-6 mb-6 flex-shrink-0">
                    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-4 inline-block mb-4 shadow-lg">
                      <Brain className="w-12 h-12 text-indigo-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Tail AI</h1>
                    <p className="text-slate-600 text-sm">Your AI Assistant</p>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto px-6 space-y-6">
                    {/* Balance Card */}
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-6 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-emerald-100 text-sm mb-1">{t.totalBalance}</p>
                          <p className="text-3xl font-bold">$24,580</p>
                        </div>
                        <div className="bg-white/20 rounded-full p-2">
                          <DollarSign className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-100">Available: $2,450</span>
                        <span className="text-emerald-100">{t.creditScore}: 742</span>
                      </div>
                    </div>

                    {/* Main Action Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setCurrentView("computer")}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Brain className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{t.tailAI}</h3>
                        <p className="text-slate-600 text-xs">{t.chatAssistant}</p>
                      </button>

                      <button
                        onClick={() => setCurrentView("computer")}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation"
                      >
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <BarChart3 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{t.analytics}</h3>
                        <p className="text-slate-600 text-xs">Spending Insights</p>
                      </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">$3,892</div>
                        <div className="text-xs text-blue-700">Monthly Spend</div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">26%</div>
                        <div className="text-xs text-purple-700">{t.savingsRate}</div>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">94%</div>
                        <div className="text-xs text-orange-700">{t.aiEfficiency}</div>
                      </div>
                    </div>

                    {/* Security Status */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-green-800 text-sm">{t.accountSecure}</h4>
                          <p className="text-xs text-green-700">
                            0 {t.fraudAlerts} • {t.transactionsVerified}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Financial Features Grid */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-slate-800 text-center">Financial Tools</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {financialFeatures.slice(0, 6).map((feature) => {
                          const IconComponent = feature.icon
                          return (
                            <button
                              key={feature.id}
                              onClick={() => openFeatureModal(feature)}
                              className={`${feature.bgColor} ${feature.borderColor} border rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation text-left`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 ${feature.color} rounded-lg flex items-center justify-center`}>
                                  <IconComponent className="w-4 h-4 text-white" />
                                </div>
                                <h5 className="font-bold text-slate-800 text-xs">{feature.name}</h5>
                              </div>
                              <p className="text-xs text-slate-600">{feature.description.slice(0, 40)}...</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Additional Features */}
                    <div className="space-y-3">
                      <button
                        onClick={() => setCurrentView("computer")}
                        className="w-full bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <Code className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm">{t.developerAPI}</h4>
                            <p className="text-xs text-slate-600">Access developer tools</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setCurrentView("computer")}
                        className="w-full bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Settings className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm">{t.settings}</h4>
                            <p className="text-xs text-slate-600">Manage preferences</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Navigation - Fixed */}
                  <div className="bg-white border-t border-slate-200 px-6 py-4 flex-shrink-0">
                    <div className="grid grid-cols-4 gap-2">
                      <button className="flex flex-col items-center py-3 px-2 rounded-xl bg-indigo-50 border border-indigo-200 touch-manipulation">
                        <Home className="w-5 h-5 text-indigo-600 mb-1" />
                        <span className="text-xs font-semibold text-indigo-600">{t.home}</span>
                      </button>
                      <button
                        onClick={() => setCurrentView("computer")}
                        className="flex flex-col items-center py-3 px-2 rounded-xl hover:bg-slate-50 transition-colors touch-manipulation"
                      >
                        <BarChart3 className="w-5 h-5 text-slate-400 mb-1" />
                        <span className="text-xs text-slate-400">{t.analytics}</span>
                      </button>
                      <button
                        onClick={() => setCurrentView("computer")}
                        className="flex flex-col items-center py-3 px-2 rounded-xl hover:bg-slate-50 transition-colors touch-manipulation"
                      >
                        <Code className="w-5 h-5 text-slate-400 mb-1" />
                        <span className="text-xs text-slate-400">{t.api}</span>
                      </button>
                      <button
                        onClick={() => setCurrentView("computer")}
                        className="flex flex-col items-center py-3 px-2 rounded-xl hover:bg-slate-50 transition-colors touch-manipulation"
                      >
                        <Settings className="w-5 h-5 text-slate-400 mb-1" />
                        <span className="text-xs text-slate-400">{t.settings}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
