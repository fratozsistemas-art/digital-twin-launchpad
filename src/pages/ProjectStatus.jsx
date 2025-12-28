import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  Clock,
  Target,
  Layers,
  Zap,
  Shield,
  Brain,
  TrendingUp,
  Users,
  Globe2,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Database,
  Lock,
  Sparkles,
  History,
  Activity
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function ProjectStatus({ language = 'pt-BR' }) {
  const [viewMode, setViewMode] = useState('current'); // 'current' or 'baseline'
  const content = {
    'pt-BR': {
      title: 'Visão & Status do Projeto',
      subtitle: 'Marcos Prado Troyjo Digital Twin - Roadmap Completo',
      overview: {
        title: 'Visão Geral',
        description: 'Plataforma de Inteligência Cognitiva que replica com fidelidade máxima o raciocínio estratégico, retórica diplomática e frameworks analíticos de Marcos Prado Troyjo.',
        mission: 'Escalar expertise de nível mundial em geopolítica, comércio internacional e competitividade sistêmica através de um Digital Twin com arquitetura cognitiva robusta.'
      },
      tabs: {
        implemented: 'Implementado',
        inProgress: 'Em Progresso',
        planned: 'Planejado',
        architecture: 'Arquitetura'
      },
      progress: {
        frontend: 'Interface & UX',
        backend: 'Backend & IA',
        integrations: 'Integrações',
        governance: 'Governança'
      },
      viewMode: {
        current: 'Status Atual',
        baseline: 'Avaliação Inicial',
        updated: 'Atualizado em',
        baseline_date: '5 de dezembro, 2025',
        current_date: '28 de dezembro, 2025'
      }
    },
    'en-US': {
      title: 'Project Vision & Status',
      subtitle: 'Marcos Prado Troyjo Digital Twin - Complete Roadmap',
      overview: {
        title: 'Overview',
        description: 'Cognitive Intelligence Platform that replicates with maximum fidelity the strategic reasoning, diplomatic rhetoric, and analytical frameworks of Marcos Prado Troyjo.',
        mission: 'Scale world-class expertise in geopolitics, international trade, and systemic competitiveness through a Digital Twin with robust cognitive architecture.'
      },
      tabs: {
        implemented: 'Implemented',
        inProgress: 'In Progress',
        planned: 'Planned',
        architecture: 'Architecture'
      },
      progress: {
        frontend: 'Interface & UX',
        backend: 'Backend & AI',
        integrations: 'Integrations',
        governance: 'Governance'
      },
      viewMode: {
        current: 'Current Status',
        baseline: 'Initial Assessment',
        updated: 'Updated on',
        baseline_date: 'December 5, 2025',
        current_date: 'December 28, 2025'
      }
    }
  };

  const t = content[language];

  // Baseline items (Dec 5)
  const baselineImplemented = [
    {
      category: language === 'pt-BR' ? '🎨 Interface & Experiência' : '🎨 Interface & Experience',
      items: [
        { icon: Users, name: language === 'pt-BR' ? 'Sistema de Personas (Professor, Analista, Diplomata)' : 'Persona System (Professor, Analyst, Diplomat)', status: 'complete' },
        { icon: MessageSquare, name: language === 'pt-BR' ? 'Interface de Consulta Estratégica' : 'Strategic Consultation Interface', status: 'complete' },
        { icon: Globe2, name: language === 'pt-BR' ? 'Multilíngue (PT-BR / EN-US)' : 'Multilingual (PT-BR / EN-US)', status: 'complete' },
        { icon: Target, name: language === 'pt-BR' ? 'Onboarding Wizard Personalizado' : 'Personalized Onboarding Wizard', status: 'complete' },
        { icon: BarChart3, name: 'Dashboard Executivo', status: 'complete' },
        { icon: Settings, name: language === 'pt-BR' ? 'Perfil de Usuário com Preferências' : 'User Profile with Preferences', status: 'complete' }
      ]
    },
    {
      category: language === 'pt-BR' ? '📊 Governança & Qualidade' : '📊 Governance & Quality',
      items: [
        { icon: Shield, name: language === 'pt-BR' ? 'CRV Scoring (Confidence, Risk, Value)' : 'CRV Scoring (Confidence, Risk, Value)', status: 'complete' },
        { icon: FileText, name: 'Audit Trail (Rastreabilidade de Fontes)', status: 'complete' },
        { icon: Zap, name: language === 'pt-BR' ? 'Sistema de Resolução de Paradoxos' : 'Paradox Resolution System', status: 'complete' },
        { icon: TrendingUp, name: language === 'pt-BR' ? 'Rating & Feedback de Respostas' : 'Response Rating & Feedback', status: 'complete' },
        { icon: Lock, name: 'Governance Panel (CRV Settings)', status: 'complete' }
      ]
    },
    {
      category: language === 'pt-BR' ? '📚 Base de Conhecimento' : '📚 Knowledge Base',
      items: [
        { icon: Sparkles, name: language === 'pt-BR' ? 'Neologismos Proprietários (Trampulência, Três Coroas, Policrise, etc.)' : 'Proprietary Neologisms (Trampulence, Three Crowns, Polycrisis, etc.)', status: 'complete' },
        { icon: Clock, name: language === 'pt-BR' ? 'Timeline de Evolução Conceitual (desde 2002)' : 'Concept Evolution Timeline (since 2002)', status: 'complete' },
        { icon: Target, name: language === 'pt-BR' ? 'Trajetória Profissional (Prêmios, Posições, Publicações)' : 'Professional Journey (Awards, Positions, Publications)', status: 'complete' },
        { icon: Brain, name: language === 'pt-BR' ? 'Arquitetura Cognitiva Documentada' : 'Documented Cognitive Architecture', status: 'complete' }
      ]
    },
    {
      category: language === 'pt-BR' ? '🗂️ Organização & Gestão' : '🗂️ Organization & Management',
      items: [
        { icon: FileText, name: language === 'pt-BR' ? 'Sistema de Pastas para Consultas' : 'Folder System for Consultations', status: 'complete' },
        { icon: Users, name: language === 'pt-BR' ? 'Compartilhamento de Consultas' : 'Consultation Sharing', status: 'complete' },
        { icon: Database, name: language === 'pt-BR' ? 'Gestão de Data Sources' : 'Data Sources Management', status: 'complete' },
        { icon: TrendingUp, name: language === 'pt-BR' ? 'Análise de Sentimento (UI)' : 'Sentiment Analysis (UI)', status: 'complete' },
        { icon: Globe2, name: language === 'pt-BR' ? 'Integrações Externas (UI)' : 'External Integrations (UI)', status: 'complete' }
      ]
    }
  ];

  // Current items (Dec 28) - includes new features
  const currentImplemented = [
    ...baselineImplemented,
    {
      category: language === 'pt-BR' ? '🤖 Motor Adaptativo' : '🤖 Adaptive Engine',
      items: [
        { icon: Brain, name: language === 'pt-BR' ? 'PersonaMemory - Rastreamento de Interações' : 'PersonaMemory - Interaction Tracking', status: 'complete', badge: 'NEW' },
        { icon: Sparkles, name: language === 'pt-BR' ? 'Ajuste Dinâmico de Profundidade' : 'Dynamic Depth Adjustment', status: 'complete', badge: 'NEW' },
        { icon: Target, name: language === 'pt-BR' ? 'Deep Dive Suggestions Proativas' : 'Proactive Deep Dive Suggestions', status: 'complete', badge: 'NEW' },
        { icon: TrendingUp, name: language === 'pt-BR' ? 'Insights de Persona e Engajamento' : 'Persona & Engagement Insights', status: 'complete', badge: 'NEW' }
      ]
    },
    {
      category: language === 'pt-BR' ? '📱 Canais Multi-Plataforma' : '📱 Multi-Platform Channels',
      items: [
        { icon: MessageSquare, name: language === 'pt-BR' ? 'WhatsApp Agent (Ativo)' : 'WhatsApp Agent (Active)', status: 'complete', badge: 'NEW' },
        { icon: Users, name: language === 'pt-BR' ? 'Microsoft Teams Bot (Beta)' : 'Microsoft Teams Bot (Beta)', status: 'complete', badge: 'NEW' },
        { icon: Zap, name: language === 'pt-BR' ? 'Slack Assistant (Configurado)' : 'Slack Assistant (Configured)', status: 'complete', badge: 'NEW' }
      ]
    }
  ];

  const implemented = viewMode === 'baseline' ? baselineImplemented : currentImplemented;
    {
      category: language === 'pt-BR' ? '📊 Governança & Qualidade' : '📊 Governance & Quality',
      items: [
        { icon: Shield, name: language === 'pt-BR' ? 'CRV Scoring (Confidence, Risk, Value)' : 'CRV Scoring (Confidence, Risk, Value)', status: 'complete' },
        { icon: FileText, name: 'Audit Trail (Rastreabilidade de Fontes)', status: 'complete' },
        { icon: Zap, name: language === 'pt-BR' ? 'Sistema de Resolução de Paradoxos' : 'Paradox Resolution System', status: 'complete' },
        { icon: TrendingUp, name: language === 'pt-BR' ? 'Rating & Feedback de Respostas' : 'Response Rating & Feedback', status: 'complete' },
        { icon: Lock, name: 'Governance Panel (CRV Settings)', status: 'complete' }
      ]
    },
    {
      category: language === 'pt-BR' ? '📚 Base de Conhecimento' : '📚 Knowledge Base',
      items: [
        { icon: Sparkles, name: language === 'pt-BR' ? 'Neologismos Proprietários (Trampulência, Três Coroas, Policrise, etc.)' : 'Proprietary Neologisms (Trampulence, Three Crowns, Polycrisis, etc.)', status: 'complete' },
        { icon: Clock, name: language === 'pt-BR' ? 'Timeline de Evolução Conceitual (desde 2002)' : 'Concept Evolution Timeline (since 2002)', status: 'complete' },
        { icon: Target, name: language === 'pt-BR' ? 'Trajetória Profissional (Prêmios, Posições, Publicações)' : 'Professional Journey (Awards, Positions, Publications)', status: 'complete' },
        { icon: Brain, name: language === 'pt-BR' ? 'Arquitetura Cognitiva Documentada' : 'Documented Cognitive Architecture', status: 'complete' }
      ]
    },
    {
      category: language === 'pt-BR' ? '🗂️ Organização & Gestão' : '🗂️ Organization & Management',
      items: [
        { icon: FileText, name: language === 'pt-BR' ? 'Sistema de Pastas para Consultas' : 'Folder System for Consultations', status: 'complete' },
        { icon: Users, name: language === 'pt-BR' ? 'Compartilhamento de Consultas' : 'Consultation Sharing', status: 'complete' },
        { icon: Database, name: language === 'pt-BR' ? 'Gestão de Data Sources' : 'Data Sources Management', status: 'complete' },
        { icon: TrendingUp, name: language === 'pt-BR' ? 'Análise de Sentimento (UI)' : 'Sentiment Analysis (UI)', status: 'complete' },
        { icon: Globe2, name: language === 'pt-BR' ? 'Integrações Externas (UI)' : 'External Integrations (UI)', status: 'complete' }
      ]
    }
  ];

  const baselineInProgress = [
    {
      category: language === 'pt-BR' ? '🤖 Motor de IA Real' : '🤖 Real AI Engine',
      items: [
        { icon: Brain, name: language === 'pt-BR' ? 'Integração com LLM (GPT-4 / Claude)' : 'LLM Integration (GPT-4 / Claude)', status: 'progress', progress: 30 },
        { icon: Sparkles, name: 'RAG (Retrieval Augmented Generation)', status: 'progress', progress: 20 },
        { icon: Zap, name: language === 'pt-BR' ? 'Motor de Persona Adaptativo' : 'Adaptive Persona Engine', status: 'progress', progress: 25 }
      ]
    },
    {
      category: language === 'pt-BR' ? '⚙️ Backend Functions' : '⚙️ Backend Functions',
      items: [
        { icon: Database, name: language === 'pt-BR' ? 'Processamento de Consultas Real' : 'Real Query Processing', status: 'progress', progress: 15 },
        { icon: FileText, name: language === 'pt-BR' ? 'Análise de Documentos (RAG Real)' : 'Document Analysis (Real RAG)', status: 'progress', progress: 10 },
        { icon: TrendingUp, name: language === 'pt-BR' ? 'Sentiment Analysis Funcional' : 'Functional Sentiment Analysis', status: 'progress', progress: 5 }
      ]
    }
  ];

  const currentInProgress = [
    {
      category: language === 'pt-BR' ? '🤖 Motor de IA Real' : '🤖 Real AI Engine',
      items: [
        { icon: Brain, name: language === 'pt-BR' ? 'Integração com LLM (GPT-4 / Claude)' : 'LLM Integration (GPT-4 / Claude)', status: 'progress', progress: 40 },
        { icon: Sparkles, name: 'RAG (Retrieval Augmented Generation)', status: 'progress', progress: 30 },
        { icon: Zap, name: language === 'pt-BR' ? 'Motor de Persona Adaptativo - Backend Real' : 'Adaptive Persona Engine - Real Backend', status: 'progress', progress: 45 }
      ]
    },
    {
      category: language === 'pt-BR' ? '⚙️ Backend Functions' : '⚙️ Backend Functions',
      items: [
        { icon: Database, name: language === 'pt-BR' ? 'Processamento de Consultas Real' : 'Real Query Processing', status: 'progress', progress: 25 },
        { icon: FileText, name: language === 'pt-BR' ? 'Análise de Documentos (RAG Real)' : 'Document Analysis (Real RAG)', status: 'progress', progress: 20 },
        { icon: TrendingUp, name: language === 'pt-BR' ? 'Sentiment Analysis Funcional' : 'Functional Sentiment Analysis', status: 'progress', progress: 15 }
      ]
    }
  ];

  const inProgress = viewMode === 'baseline' ? baselineInProgress : currentInProgress;

  const planned = [
    {
      category: language === 'pt-BR' ? '🛡️ Protocolos de Elite' : '🛡️ Elite Protocols',
      items: [
        { icon: Shield, name: language === 'pt-BR' ? 'Protocolo HUA (Hierarchy, Utility, Adherence)' : 'HUA Protocol (Hierarchy, Utility, Adherence)', status: 'planned' },
        { icon: Lock, name: language === 'pt-BR' ? 'Protocolo AEGIS (Proteção de IP)' : 'AEGIS Protocol (IP Protection)', status: 'planned' },
        { icon: CheckCircle2, name: 'Human-Verified Content Pipeline', status: 'planned' }
      ]
    },
    {
      category: language === 'pt-BR' ? '🌐 Integrações Avançadas' : '🌐 Advanced Integrations',
      items: [
        { icon: Globe2, name: 'Bloomberg Terminal Integration', status: 'planned' },
        { icon: TrendingUp, name: 'Oxford Analytics Feed', status: 'planned' },
        { icon: Database, name: language === 'pt-BR' ? 'APIs Macroeconômicas (Banco Mundial, FMI, OMC)' : 'Macroeconomic APIs (World Bank, IMF, WTO)', status: 'planned' },
        { icon: Brain, name: language === 'pt-BR' ? 'Monitoramento Geopolítico em Tempo Real' : 'Real-Time Geopolitical Monitoring', status: 'planned' }
      ]
    },
    {
      category: language === 'pt-BR' ? '📱 Canais de Comunicação' : '📱 Communication Channels',
      items: [
        { icon: MessageSquare, name: language === 'pt-BR' ? 'WhatsApp Agent (Ativo com Personas Adaptativas)' : 'WhatsApp Agent (Active with Adaptive Personas)', status: 'complete' },
        { icon: Users, name: language === 'pt-BR' ? 'Microsoft Teams Bot (Beta)' : 'Microsoft Teams Bot (Beta)', status: 'complete' },
        { icon: Globe2, name: language === 'pt-BR' ? 'Slack Assistant (Configurado)' : 'Slack Assistant (Configured)', status: 'complete' }
      ]
    },
    {
      category: language === 'pt-BR' ? '🧠 Capacidades Avançadas' : '🧠 Advanced Capabilities',
      items: [
        { icon: FileText, name: language === 'pt-BR' ? 'Geração de Policy Papers' : 'Policy Paper Generation', status: 'planned' },
        { icon: BarChart3, name: language === 'pt-BR' ? 'Simulação de Cenários' : 'Scenario Simulation', status: 'planned' },
        { icon: Brain, name: language === 'pt-BR' ? 'Memória de Longo Prazo (Cross-Session)' : 'Long-Term Memory (Cross-Session)', status: 'planned' },
        { icon: Sparkles, name: language === 'pt-BR' ? 'Aprendizado Contínuo Adaptativo' : 'Adaptive Continuous Learning', status: 'planned' }
      ]
    },
    {
      category: language === 'pt-BR' ? '📊 Analytics & Insights' : '📊 Analytics & Insights',
      items: [
        { icon: TrendingUp, name: language === 'pt-BR' ? 'Dashboard de Métricas de Uso' : 'Usage Metrics Dashboard', status: 'planned' },
        { icon: BarChart3, name: language === 'pt-BR' ? 'Análise de Tópicos Trending' : 'Trending Topics Analysis', status: 'planned' },
        { icon: Users, name: language === 'pt-BR' ? 'Benchmarking de Personas' : 'Persona Benchmarking', status: 'planned' }
      ]
    }
  ];

  const statusColors = {
    complete: 'text-green-400',
    progress: 'text-blue-400',
    planned: 'text-slate-500'
  };

  const statusIcons = {
    complete: CheckCircle2,
    progress: Clock,
    planned: Circle
  };

  // Baseline (Initial Assessment - Dec 5)
  const baselineProgress = {
    frontend: 85,
    backend: 25,
    integrations: 15,
    governance: 70
  };

  // Current Status (Dec 28)
  const currentProgress = {
    frontend: 90,
    backend: 35,
    integrations: 40,
    governance: 75
  };

  const progressData = viewMode === 'baseline' ? baselineProgress : currentProgress;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-slate-400 mb-6">{t.subtitle}</p>
          
          {/* View Mode Toggle */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('current')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                viewMode === 'current'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              {t.viewMode.current}
            </button>
            <button
              onClick={() => setViewMode('baseline')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                viewMode === 'baseline'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              {t.viewMode.baseline}
            </button>
          </div>
          
          <p className="text-sm text-slate-500 mt-4">
            {t.viewMode.updated}: {viewMode === 'baseline' ? t.viewMode.baseline_date : t.viewMode.current_date}
          </p>
        </motion.div>

        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/50 border border-slate-800 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Target className="w-6 h-6 text-cyan-400" />
            {t.overview.title}
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            {t.overview.description}
          </p>
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/20">
            <p className="text-cyan-400 font-semibold mb-2">MISSÃO:</p>
            <p className="text-slate-300">
              {t.overview.mission}
            </p>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {Object.entries(progressData).map(([key, value], index) => {
            const baseline = baselineProgress[key];
            const current = currentProgress[key];
            const delta = current - baseline;
            
            return (
              <div key={key} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">{t.progress[key]}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{value}%</span>
                    {viewMode === 'current' && delta > 0 && (
                      <span className="text-xs font-semibold text-green-400">+{delta}%</span>
                    )}
                  </div>
                </div>
                <Progress value={value} className="h-2" />
                {viewMode === 'current' && delta > 0 && (
                  <p className="text-xs text-green-400 mt-2">
                    {language === 'pt-BR' ? 'Progresso desde baseline' : 'Progress since baseline'}
                  </p>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Detailed Status Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="implemented" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border border-slate-800 mb-8">
              <TabsTrigger value="implemented" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {t.tabs.implemented}
              </TabsTrigger>
              <TabsTrigger value="inProgress" className="gap-2">
                <Clock className="w-4 h-4" />
                {t.tabs.inProgress}
              </TabsTrigger>
              <TabsTrigger value="planned" className="gap-2">
                <Circle className="w-4 h-4" />
                {t.tabs.planned}
              </TabsTrigger>
            </TabsList>

            {/* Implemented Tab */}
            <TabsContent value="implemented" className="mt-0">
              <div className="space-y-8">
                {implemented.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h3 className="text-xl font-bold text-white mb-6">{section.category}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                          <item.icon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-slate-200 text-sm">{item.name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && viewMode === 'current' && (
                              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                                {item.badge}
                              </span>
                            )}
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* In Progress Tab */}
            <TabsContent value="inProgress" className="mt-0">
              <div className="space-y-8">
                {inProgress.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h3 className="text-xl font-bold text-white mb-6">{section.category}</h3>
                    <div className="space-y-4">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-800/30">
                          <div className="flex items-center gap-3 mb-3">
                            <item.icon className="w-5 h-5 text-blue-400" />
                            <p className="text-slate-200 flex-1">{item.name}</p>
                            <span className="text-blue-400 font-semibold text-sm">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Planned Tab */}
            <TabsContent value="planned" className="mt-0">
              <div className="space-y-8">
                {planned.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h3 className="text-xl font-bold text-white mb-6">{section.category}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/30">
                          <item.icon className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-slate-300 text-sm">{item.name}</p>
                          </div>
                          <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}