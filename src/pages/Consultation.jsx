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
import PersonaSelector from '@/components/chat/PersonaSelector';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function Consultation({ language = 'pt-BR' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paradoxResolutions, setParadoxResolutions] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState('professor');
  const messagesEndRef = useRef(null);

  // Fetch user profile for access level
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: userProfile } = useQuery({
    queryKey: ['user-profile', user?.email],
    queryFn: async () => {
      const profiles = await base44.entities.UserProfile.filter({ created_by: user.email });
      return profiles[0] || null;
    },
    enabled: !!user?.email,
  });

  // Set persona from profile
  useEffect(() => {
    if (userProfile?.preferred_persona) {
      setSelectedPersona(userProfile.preferred_persona);
    }
  }, [userProfile]);

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
      // Generate persona-specific response
      const personaResponses = {
        professor: {
          'pt-BR': `Prezado estudante,\n\nVamos desdobrar essa questão em camadas mais simples para facilitar a compreensão.\n\n**Pense nos BRICS como uma orquestra sem maestro único**\n\nImagine cinco instrumentistas (Brasil, Rússia, Índia, China e África do Sul) que decidiram tocar juntos, mas cada um tem sua própria partitura. Não há um regente central — e isso é proposital.\n\n**As "Três Coroas" do Brasil — uma metáfora útil:**\n\n1. 🌾 **Alimentos**: Somos a "Arábia Saudita dos grãos" — controlamos o estoque global de soja, milho e proteína animal.\n2. ⚡ **Energia**: Transição energética? O Brasil tem matriz limpa, biodiesel e potencial eólico/solar imbatível.\n3. 🌱 **Sustentabilidade**: O mundo precisará de "créditos de carbono" — e temos a Amazônia como ativo estratégico.\n\n**Por que isso importa?**\n\nEm termos simples: enquanto o mundo discute ideologia, o Brasil tem recursos tangíveis. Nossa estratégia deve ser pragmática — "surfar três ondas" (EUA, China, Europa) sem amarras ideológicas.\n\nEspero ter esclarecido. Estou à disposição para aprofundar qualquer ponto.\n\nCordialmente,\nMarcos Prado Troyjo`,
          'en-US': `Dear student,\n\nLet's unpack this question in simpler layers to facilitate understanding.\n\n**Think of BRICS as an orchestra without a single conductor**\n\nImagine five instrumentalists (Brazil, Russia, India, China, and South Africa) who decided to play together, but each has their own score. There's no central conductor — and this is intentional.\n\n**Brazil's "Three Crowns" — a useful metaphor:**\n\n1. 🌾 **Food**: We are the "Saudi Arabia of grains" — we control the global stock of soybeans, corn, and animal protein.\n2. ⚡ **Energy**: Energy transition? Brazil has a clean matrix, biodiesel, and unbeatable wind/solar potential.\n3. 🌱 **Sustainability**: The world will need "carbon credits" — and we have the Amazon as a strategic asset.\n\n**Why does this matter?**\n\nIn simple terms: while the world debates ideology, Brazil has tangible resources. Our strategy should be pragmatic — "surf three waves" (USA, China, Europe) without ideological ties.\n\nI hope this clarifies. I remain available to deepen any point.\n\nCordially,\nMarcos Prado Troyjo`
        },
        analyst: {
          'pt-BR': `**POLICY BRIEF — ANÁLISE QUANTITATIVA**\n\n**Decomposição Setorial: Vantagens Comparativas Reveladas (VCR)**\n\n| Setor | VCR Index | Participação Global | Tendência 2025 |\n|-------|-----------|---------------------|----------------|\n| Soja | 4.2 | 38% | ↑ Expansão |\n| Carnes | 3.8 | 21% | ↗ Estável |\n| Etanol | 5.1 | 45% | ↑ Alta demanda |\n\n**Análise Geoeconômica — Triangulação Estratégica:**\n\n1. **EUA (Trade Partner #2):** Relação assimétrica mas estável. Risco: protecionismo agrícola (Farm Bill 2024).\n2. **China (Trade Partner #1):** 32% das exportações brasileiras. Risco: desaceleração imobiliária afeta demanda por commodities.\n3. **UE (Trade Partner #3):** Acordo MERCOSUL-UE travado. Oportunidade: pressão francesa vs. pragmatismo alemão.\n\n**Modelagem de Cenários (Monte Carlo, 10k iterações):**\n- Prob(Recessão Global 2025) = 28%\n- Prob(China >5% GDP) = 62%\n- Impacto no PIB BR: elasticidade de +0.4 para cada 1% de crescimento chinês.\n\n**Recomendação Estratégica:**\nDiversificar destinos de exportação. Priorizar acordos bilaterais com ASEAN e África (crescimento demográfico = demanda estrutural).\n\n**Marcos Prado Troyjo**\n*Ex-Presidente, Banco dos BRICS*`,
          'en-US': `**POLICY BRIEF — QUANTITATIVE ANALYSIS**\n\n**Sectoral Decomposition: Revealed Comparative Advantages (RCA)**\n\n| Sector | RCA Index | Global Share | 2025 Trend |\n|--------|-----------|--------------|------------|\n| Soy | 4.2 | 38% | ↑ Expansion |\n| Meat | 3.8 | 21% | ↗ Stable |\n| Ethanol | 5.1 | 45% | ↑ High demand |\n\n**Geoeconomic Analysis — Strategic Triangulation:**\n\n1. **USA (Trade Partner #2):** Asymmetric but stable relationship. Risk: agricultural protectionism (Farm Bill 2024).\n2. **China (Trade Partner #1):** 32% of Brazilian exports. Risk: real estate slowdown affects commodity demand.\n3. **EU (Trade Partner #3):** MERCOSUR-EU deal stalled. Opportunity: French pressure vs. German pragmatism.\n\n**Scenario Modeling (Monte Carlo, 10k iterations):**\n- Prob(Global Recession 2025) = 28%\n- Prob(China >5% GDP) = 62%\n- Impact on BR GDP: elasticity of +0.4 for each 1% of Chinese growth.\n\n**Strategic Recommendation:**\nDiversify export destinations. Prioritize bilateral agreements with ASEAN and Africa (demographic growth = structural demand).\n\n**Marcos Prado Troyjo**\n*Former President, BRICS Bank*`
        },
        diplomat: {
          'pt-BR': `Excelentíssimo interlocutor,\n\nÉ com especial apreço que recebo Vossa consulta, a qual toca em aspectos nevrálgicos da reconfiguração geoeconômica contemporânea.\n\nPermita-me, com a devida vênia, tecer algumas considerações que julgo pertinentes ao esclarecimento da matéria em tela.\n\n**Sobre a Arquitetura Institucional dos BRICS**\n\nOs BRICS representam, em sua essência, uma plataforma de coordenação entre economias emergentes que, embora heterogêneas em suas estruturas políticas e trajetórias históricas, convergem no propósito comum de reformular a governança global.\n\nCabe aqui destacar que não se trata de um bloco antagônico às instituições de Bretton Woods, mas sim de um complemento necessário — um "contrapeso construtivo", por assim dizer.\n\n**A Diplomacia Econômica Brasileira — Princípios Cardeais:**\n\n1. **Universalismo**: Manter canais abertos com todos os polos de poder — Washington, Pequim, Bruxelas — sem alinhamento automático.\n2. **Pragmatismo Comercial**: Priorizar ganhos concretos sobre posicionamentos ideológicos. O comércio não deve ser refém da geopolítica.\n3. **Cooperação Sul-Sul**: Fortalecer laços com África e América Latina, respeitando soberanias nacionais.\n\n**Reflexão Final**\n\nA questão que Vossa Excelência apresenta demanda não apenas análise técnica, mas também sensibilidade diplomática. O Brasil, por sua tradição não-confrontacional e vocação mediadora, está singularmente posicionado para exercer papel de "ponte" entre blocos rivais.\n\nRenovo votos de alta estima e consideração,\n\n**Embaixador Marcos Prado Troyjo**\n*Ex-Presidente do Novo Banco de Desenvolvimento (NDB-BRICS)*\n*Professor Associado, Columbia University*`,
          'en-US': `Most esteemed interlocutor,\n\nIt is with particular appreciation that I receive your consultation, which touches on critical aspects of contemporary geoeconomic reconfiguration.\n\nAllow me, with due respect, to offer some considerations that I deem pertinent to clarifying the matter at hand.\n\n**On the Institutional Architecture of BRICS**\n\nBRICS represents, in essence, a coordination platform among emerging economies that, while heterogeneous in their political structures and historical trajectories, converge on the common purpose of reformulating global governance.\n\nIt should be noted that this is not an antagonistic bloc to Bretton Woods institutions, but rather a necessary complement — a "constructive counterweight," so to speak.\n\n**Brazilian Economic Diplomacy — Cardinal Principles:**\n\n1. **Universalism**: Maintain open channels with all power poles — Washington, Beijing, Brussels — without automatic alignment.\n2. **Commercial Pragmatism**: Prioritize concrete gains over ideological positions. Trade should not be hostage to geopolitics.\n3. **South-South Cooperation**: Strengthen ties with Africa and Latin America, respecting national sovereignties.\n\n**Final Reflection**\n\nThe question Your Excellency presents demands not only technical analysis but also diplomatic sensitivity. Brazil, by its non-confrontational tradition and mediating vocation, is uniquely positioned to play a "bridge" role between rival blocs.\n\nI renew vows of high esteem and consideration,\n\n**Ambassador Marcos Prado Troyjo**\n*Former President, New Development Bank (NDB-BRICS)*\n*Associate Professor, Columbia University*`
        }
      };

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
      const sampleResponse = personaResponses[selectedPersona][language];

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
            <div className="sticky top-28 space-y-6">
              {/* Persona Selector */}
              <PersonaSelector
                selectedPersona={selectedPersona}
                onPersonaChange={setSelectedPersona}
                accessLevel={userProfile?.access_level || 'basic'}
                language={language}
              />

              {/* Quick Topics */}
              <div>
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