import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Brain, 
  Globe2, 
  TrendingUp, 
  Shield, 
  Sparkles,
  Building2,
  Users,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home({ language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      hero: {
        badge: 'Inteligência Estratégica Reimaginada',
        title: 'Marcos Prado Troyjo',
        subtitle: 'Digital Twin',
        description: 'Uma plataforma de inteligência cognitiva que replica com fidelidade máxima o raciocínio estratégico, a retórica diplomática e os frameworks analíticos de Marcos Prado Troyjo.',
        cta: 'Iniciar Consulta',
        watch: 'Ver Demonstração'
      },
      stats: [
        { value: '30+', label: 'Anos de Experiência' },
        { value: 'BRICS', label: 'Ex-Presidente do Banco' },
        { value: '3', label: 'Livros Publicados' },
        { value: 'Global', label: 'Alcance Geopolítico' }
      ],
      pillars: {
        title: 'Quatro Pilares de uma Arquitetura Cognitiva Robusta',
        subtitle: 'O Gêmeo Digital é sustentado por uma arquitetura interdependente projetada para garantir autenticidade, relevância, inteligência e segurança.',
        items: [
          {
            icon: Users,
            title: 'Persona Autêntica',
            description: 'Modelos multimodais de raciocínio que capturam estilos analíticos únicos: Professor, Técnico, Diplomático e Consultor.'
          },
          {
            icon: Brain,
            title: 'Base de Conhecimento Viva',
            description: 'Corpus fundacional enriquecido continuamente com dados externos em tempo real para análises sempre relevantes.'
          },
          {
            icon: Sparkles,
            title: 'Motor de Inteligência Adaptativa',
            description: 'Sistema nervoso que aprende com cada interação, refinando persona e profundidade analítica continuamente.'
          },
          {
            icon: Shield,
            title: 'Protocolos de Elite',
            description: 'Framework HUA garante excelência em cada insight. Protocolo AEGIS protege propriedade intelectual contra extração.'
          }
        ]
      },
      useCases: {
        title: 'Para Quem é Esta Plataforma',
        items: [
          {
            icon: Building2,
            title: 'Conselhos de Administração',
            description: 'Análises estratégicas de cenários geopolíticos e oportunidades de mercado para tomada de decisão em nível board.'
          },
          {
            icon: Globe2,
            title: 'Veículos de Imprensa',
            description: 'Perspectivas especializadas sobre comércio internacional, BRICS, competitividade e tendências globais.'
          },
          {
            icon: Users,
            title: 'Executivos C-Level',
            description: 'Consultoria estratégica sobre diplomacia econômica, posicionamento global e navegação de policrises.'
          }
        ]
      },
      cta: {
        title: 'Pronto Para Uma Consulta Estratégica?',
        description: 'Acesse insights de nível mundial sobre geopolítica, comércio internacional e competitividade sistêmica.',
        button: 'Começar Agora'
      }
    },
    'en-US': {
      hero: {
        badge: 'Strategic Intelligence Reimagined',
        title: 'Marcos Prado Troyjo',
        subtitle: 'Digital Twin',
        description: 'A cognitive intelligence platform that replicates with maximum fidelity the strategic reasoning, diplomatic rhetoric, and analytical frameworks of Marcos Prado Troyjo.',
        cta: 'Start Consultation',
        watch: 'Watch Demo'
      },
      stats: [
        { value: '30+', label: 'Years of Experience' },
        { value: 'BRICS', label: 'Former Bank President' },
        { value: '3', label: 'Published Books' },
        { value: 'Global', label: 'Geopolitical Reach' }
      ],
      pillars: {
        title: 'Four Pillars of a Robust Cognitive Architecture',
        subtitle: 'The Digital Twin is supported by an interdependent architecture designed to ensure authenticity, relevance, intelligence, and security.',
        items: [
          {
            icon: Users,
            title: 'Authentic Persona',
            description: 'Multimodal reasoning models that capture unique analytical styles: Professor, Technical, Diplomatic, and Consultant.'
          },
          {
            icon: Brain,
            title: 'Living Knowledge Base',
            description: 'Foundational corpus continuously enriched with real-time external data for always-relevant analyses.'
          },
          {
            icon: Sparkles,
            title: 'Adaptive Intelligence Engine',
            description: 'Nervous system that learns from each interaction, continuously refining persona and analytical depth.'
          },
          {
            icon: Shield,
            title: 'Elite Protocols',
            description: 'HUA framework ensures excellence in every insight. AEGIS protocol protects intellectual property from extraction.'
          }
        ]
      },
      useCases: {
        title: 'Who Is This Platform For',
        items: [
          {
            icon: Building2,
            title: 'Boards of Directors',
            description: 'Strategic analyses of geopolitical scenarios and market opportunities for board-level decision making.'
          },
          {
            icon: Globe2,
            title: 'News Organizations',
            description: 'Specialized perspectives on international trade, BRICS, competitiveness, and global trends.'
          },
          {
            icon: Users,
            title: 'C-Level Executives',
            description: 'Strategic consulting on economic diplomacy, global positioning, and navigating polycrises.'
          }
        ]
      },
      cta: {
        title: 'Ready For a Strategic Consultation?',
        description: 'Access world-class insights on geopolitics, international trade, and systemic competitiveness.',
        button: 'Get Started'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">{t.hero.badge}</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          >
            <span className="text-white">{t.hero.title}</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {t.hero.subtitle}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to={createPageUrl('Consultation')}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-7 text-lg rounded-xl shadow-lg shadow-blue-500/25"
              >
                <MessageSquare className="mr-2 w-5 h-5" />
                {t.hero.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="py-32 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.pillars.title}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {t.pillars.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.pillars.items.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center mb-6">
                    <pillar.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.useCases.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.useCases.items.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {useCase.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              {t.cta.description}
            </p>
            
            <Link to={createPageUrl('Consultation')}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-7 text-lg rounded-xl shadow-lg shadow-blue-500/25"
              >
                {t.cta.button}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}