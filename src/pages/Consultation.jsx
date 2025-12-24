import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Globe2, 
  TrendingUp, 
  Users, 
  Building,
  Coins,
  BarChart3,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import MessageBubble from '@/components/chat/MessageBubble';
import TopicCard from '@/components/chat/TopicCard';

export default function Consultation({ language = 'pt-BR' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paradoxResolutions, setParadoxResolutions] = useState([]);
  const messagesEndRef = useRef(null);

  const content = {
    'pt-BR': {
      title: 'Consulta Estratégica',
      subtitle: 'Converse diretamente com o Digital Twin de Marcos Prado Troyjo',
      greeting: 'Prezado interlocutor, É com prazer que o recebo neste espaço. Sou Marcos Prado Troyjo – ou, mais precisamente, meu Digital Twin construído com máxima fidelidade até dezembro de 2025. Em que tema de economia global, comércio internacional, competitividade ou futuro do Brasil posso ajudá-lo hoje?',
      placeholder: 'Digite sua pergunta estratégica...',
      send: 'Enviar',
      quickTopics: 'Tópicos em Destaque',
      topics: [
        {
          icon: Globe2,
          title: 'BRICS e Nova Ordem',
          description: 'Multipolaridade, banco do BRICS e reconfiguração geoeconômica',
          prompt: 'Qual é a sua visão sobre o papel dos BRICS na nova ordem mundial?'
        },
        {
          icon: TrendingUp,
          title: 'Competitividade Brasileira',
          description: 'As três coroas do Brasil: alimentos, energia e sustentabilidade',
          prompt: 'Como o Brasil pode maximizar suas vantagens competitivas globais?'
        },
        {
          icon: Building,
          title: 'Geopolítica e Comércio',
          description: 'Trampulência, policrise e navegação estratégica',
          prompt: 'Como navegar o cenário de "trampulência" global em 2025?'
        },
        {
          icon: Coins,
          title: 'Diplomacia Econômica',
          description: 'Estratégias para emergentes e países em desenvolvimento',
          prompt: 'Qual deve ser a estratégia de diplomacia econômica do Brasil?'
        }
      ]
    },
    'en-US': {
      title: 'Strategic Consultation',
      subtitle: 'Chat directly with Marcos Prado Troyjo\'s Digital Twin',
      greeting: 'Dear interlocutor, It is with pleasure that I welcome you to this space. I am Marcos Prado Troyjo – or, more precisely, my Digital Twin built with maximum fidelity through December 2025. On what topic of global economics, international trade, competitiveness, or Brazil\'s future may I assist you today?',
      placeholder: 'Type your strategic question...',
      send: 'Send',
      quickTopics: 'Featured Topics',
      topics: [
        {
          icon: Globe2,
          title: 'BRICS and New Order',
          description: 'Multipolarity, BRICS Bank, and geoeconomic reconfiguration',
          prompt: 'What is your view on the role of BRICS in the new world order?'
        },
        {
          icon: TrendingUp,
          title: 'Brazilian Competitiveness',
          description: 'Brazil\'s three crowns: food, energy, and sustainability',
          prompt: 'How can Brazil maximize its global competitive advantages?'
        },
        {
          icon: Building,
          title: 'Geopolitics and Trade',
          description: 'Trampulence, polycrisis, and strategic navigation',
          prompt: 'How to navigate the global "trampulence" scenario in 2025?'
        },
        {
          icon: Coins,
          title: 'Economic Diplomacy',
          description: 'Strategies for emerging and developing countries',
          prompt: 'What should be Brazil\'s economic diplomacy strategy?'
        }
      ]
    }
  };

  const t = content[language];

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: t.greeting,
        timestamp: new Date()
      }]);
    }
  }, [language]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTopicClick = (prompt) => {
    setInput(prompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Randomly decide if this query triggers a paradox (30% chance for demo)
    const shouldTriggerParadox = Math.random() < 0.3 && input.toLowerCase().includes('brasil');
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      if (shouldTriggerParadox) {
        // Generate paradox scenario
        const paradoxScenario = language === 'pt-BR' ? {
          paradox_id: `paradox_${Date.now()}`,
          scenario: 'Detectei um conflito estratégico em sua consulta. Os dados econômicos sugerem priorizar eficiência e abertura comercial, enquanto o contexto geopolítico atual indica necessidade de proteção de setores estratégicos.',
          option_a: {
            label: 'Eficiência Econômica',
            description: 'Priorizar abertura comercial, redução de custos e competitividade sistêmica para maximizar ganhos de curto prazo.'
          },
          option_b: {
            label: 'Segurança Nacional',
            description: 'Proteger setores estratégicos, garantir autonomia em cadeias críticas e construir resiliência de longo prazo.'
          }
        } : {
          paradox_id: `paradox_${Date.now()}`,
          scenario: 'I detected a strategic conflict in your query. Economic data suggests prioritizing efficiency and trade openness, while the current geopolitical context indicates the need to protect strategic sectors.',
          option_a: {
            label: 'Economic Efficiency',
            description: 'Prioritize trade openness, cost reduction, and systemic competitiveness to maximize short-term gains.'
          },
          option_b: {
            label: 'National Security',
            description: 'Protect strategic sectors, ensure autonomy in critical chains, and build long-term resilience.'
          }
        };

        setMessages(prev => [...prev, {
          role: 'assistant',
          type: 'paradox',
          paradox: paradoxScenario,
          timestamp: new Date()
        }]);
        setIsLoading(false);
        return;
      }
      const sampleResponse = language === 'pt-BR'
      ? `Prezado interlocutor,\n\nPermita-me contextualizar sua pergunta no cenário atual. A questão que você levanta toca em aspectos fundamentais da reconfiguração geoeconômica global.\n\n**Três pontos centrais:**\n\n1. **Contexto Histórico**: Estamos atravessando um "time-out" na globalização, um momento de reavaliação das cadeias globais de valor.\n\n2. **Competitividade Sistêmica**: O Brasil possui vantagens comparativas únicas - somos a "Arábia Saudita dos alimentos" e detemos as três coroas estratégicas: alimentos, energia e sustentabilidade.\n\n3. **Diplomacia Pragmática**: A estratégia ótima é "surfar três ondas" simultaneamente - EUA, China e União Europeia - sem viés ideológico, com foco em ganhos comerciais concretos.\n\nEstou à disposição para aprofundar qualquer um desses aspectos.\n\nCom distintíssima consideração,\nMarcos Prado Troyjo`
      : `Dear interlocutor,\n\nAllow me to contextualize your question within the current scenario. The issue you raise touches on fundamental aspects of the global geoeconomic reconfiguration.\n\n**Three central points:**\n\n1. **Historical Context**: We are going through a "time-out" in globalization, a moment of reassessment of global value chains.\n\n2. **Systemic Competitiveness**: Brazil has unique comparative advantages - we are the "Saudi Arabia of food" and hold three strategic crowns: food, energy, and sustainability.\n\n3. **Pragmatic Diplomacy**: The optimal strategy is to "surf three waves" simultaneously - USA, China, and European Union - without ideological bias, focusing on concrete commercial gains.\n\nI remain at your disposal to deepen any of these aspects.\n\nWith distinguished consideration,\nMarcos Prado Troyjo`;

      // Simulate CRV scoring and audit trail
      const crvScore = {
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100
      risk: Math.floor(Math.random() * 30) + 10, // 10-40
      value: Math.floor(Math.random() * 15) + 85 // 85-100
      };

      const sources = [
      {
      type: 'knowledge_base',
      title: 'Nação-Comerciante: Uma Piscina de Piranha em Águas Globalizadas',
      url: '#',
      confidence: 95,
      excerpt: 'A análise histórica demonstra que o Brasil possui vantagens comparativas estruturais em três pilares: alimentos, energia e sustentabilidade.'
      },
      {
      type: 'bloomberg',
      title: 'Global Trade Flows Analysis - December 2025',
      url: '#',
      confidence: 92,
      excerpt: 'Current macroeconomic data indicates a temporary pause in globalization trends, with regional trade blocs gaining prominence.'
      },
      {
      type: 'oxford_analytics',
      title: 'Geopolitical Risk Assessment: Latin America',
      url: '#',
      confidence: 88,
      excerpt: 'Brazil\'s strategic positioning allows for simultaneous engagement with multiple economic spheres without ideological constraints.'
      }
      ];

      setMessages(prev => [...prev, {
      role: 'assistant',
      content: sampleResponse,
      timestamp: new Date(),
      crv_score: crvScore,
      sources: sources
      }]);
      setIsLoading(false);
    }, 2000);
  };

  const handleParadoxResolve = (paradoxId, choice) => {
    // Store the user's choice
    const resolution = {
      paradox_id: paradoxId,
      user_choice: choice,
      timestamp: new Date()
    };
    setParadoxResolutions(prev => [...prev, resolution]);

    // Generate refined response based on user's priority
    setIsLoading(true);
    
    setTimeout(() => {
      const refinedResponse = choice === 'option_a'
        ? (language === 'pt-BR'
          ? `Excelente escolha estratégica. Priorizando **eficiência econômica**, minha recomendação é:\n\n1. **Aceleração de Acordos Comerciais**: Priorizar negociações com blocos de alto potencial (UE, MERCOSUL-UE, CPTPP).\n\n2. **Reformas Microeconômicas**: Desburocratização, simplificação tributária e redução do Custo Brasil.\n\n3. **Atração de IED**: Posicionar o Brasil como hub logístico para cadeias globais de valor.\n\nEsta abordagem maximiza ganhos de curto prazo, mas requer monitoramento de riscos geopolíticos.\n\nCom distintíssima consideração,\nMarcos Prado Troyjo`
          : `Excellent strategic choice. Prioritizing **economic efficiency**, my recommendation is:\n\n1. **Acceleration of Trade Agreements**: Prioritize negotiations with high-potential blocs (EU, MERCOSUR-EU, CPTPP).\n\n2. **Microeconomic Reforms**: Deregulation, tax simplification, and reduction of Brazil Cost.\n\n3. **FDI Attraction**: Position Brazil as a logistics hub for global value chains.\n\nThis approach maximizes short-term gains but requires monitoring of geopolitical risks.\n\nWith distinguished consideration,\nMarcos Prado Troyjo`)
        : (language === 'pt-BR'
          ? `Decisão prudente e estratégica. Priorizando **segurança nacional**, minha orientação é:\n\n1. **Mapeamento de Setores Críticos**: Identificar cadeias estratégicas (defesa, energia, alimentos, saúde).\n\n2. **Políticas de Resiliência**: Criar incentivos para produção local em setores sensíveis, sem fechar mercado.\n\n3. **Diplomacia Multivetor**: Diversificar parcerias para reduzir dependências únicas (China, EUA, Europa).\n\nEsta abordagem sacrifica eficiência de curto prazo em favor de autonomia estratégica de longo prazo.\n\nCom distintíssima consideração,\nMarcos Prado Troyjo`
          : `Prudent and strategic decision. Prioritizing **national security**, my guidance is:\n\n1. **Mapping Critical Sectors**: Identify strategic chains (defense, energy, food, health).\n\n2. **Resilience Policies**: Create incentives for local production in sensitive sectors, without closing markets.\n\n3. **Multi-Vector Diplomacy**: Diversify partnerships to reduce single dependencies (China, USA, Europe).\n\nThis approach sacrifices short-term efficiency in favor of long-term strategic autonomy.\n\nWith distinguished consideration,\nMarcos Prado Troyjo`);

      const crvScore = {
        confidence: 92,
        risk: choice === 'option_a' ? 35 : 20,
        value: 88
      };

      const sources = [
        {
          type: 'knowledge_base',
          title: choice === 'option_a' ? 'Trading Up - Post-Pandemic Trade Strategies' : 'Desglobalização - Fragmentação e Resiliência',
          confidence: 94,
          excerpt: choice === 'option_a' 
            ? 'Efficient markets require institutional frameworks that balance openness with strategic safeguards.'
            : 'Strategic autonomy in critical sectors is essential for navigating polycrisis scenarios.'
        }
      ];

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: refinedResponse,
        timestamp: new Date(),
        crv_score: crvScore,
        sources: sources
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-slate-400">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Topics Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                {t.quickTopics}
              </h3>
              <div className="space-y-3">
                {t.topics.map((topic, index) => (
                  <TopicCard
                    key={index}
                    topic={topic}
                    onClick={() => handleTopicClick(topic.prompt)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 250px)' }}>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message, index) => (
                  <MessageBubble 
                    key={index} 
                    message={message} 
                    language={language}
                    onParadoxResolve={handleParadoxResolve}
                  />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">
                      {language === 'pt-BR' ? 'Analisando...' : 'Analyzing...'}
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-800 p-4 bg-slate-900/80">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 min-h-[60px] max-h-[120px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-6"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  {language === 'pt-BR' 
                    ? 'Dados atualizados até 05 de dezembro de 2025' 
                    : 'Data updated through December 5, 2025'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}