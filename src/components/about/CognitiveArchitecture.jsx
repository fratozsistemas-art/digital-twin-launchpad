import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Sparkles, Zap } from 'lucide-react';

export default function CognitiveArchitecture({ language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Arquitetura da Cognição',
      subtitle: 'Projetando o Gêmeo Digital como uma Plataforma de Inteligência Estratégica',
      intro: 'O ambiente de decisões C-level não carece de informação, mas de discernimento. A missão deste projeto não foi criar um assistente de busca, mas codificar e escalar um modelo mental comprovado para análise geopolítica e econômica.',
      pillars: [
        {
          icon: Brain,
          title: '1. A Persona Autêntica',
          subtitle: 'A alma e a voz do sistema',
          description: 'Mais que um Tom, um Modelo de Raciocínio Multimodal. A persona não é uma camada superficial de estilo, mas a emulação de frameworks analíticos e modos de raciocínio.',
          modes: ['Professor (Novices)', 'Técnico/Analítico (Experts)', 'Diplomático (Institutions)', 'Consultor (Business)']
        },
        {
          icon: Sparkles,
          title: '2. Base de Conhecimento Viva',
          subtitle: 'O cérebro e a memória',
          description: 'A precisão do Gêmeo Digital depende de uma base de conhecimento curada e dinâmica, que funciona como sua única fonte da verdade.',
          features: ['Corpus Fundacional', 'Consciência Situacional em Tempo Real', 'Entidades Estruturadas']
        },
        {
          icon: Zap,
          title: '3. Motor de Inteligência Adaptativa',
          subtitle: 'O sistema nervoso',
          description: 'O sistema aprende com cada interação para aprimorar a experiência do usuário e a profundidade de suas análises.',
          capabilities: ['Rastreamento de Tópicos', 'Memória de Persona', 'Análise de Documentos (RAG)']
        },
        {
          icon: Shield,
          title: '4. Protocolos de Elite',
          subtitle: 'O sistema imunológico',
          description: 'Para garantir que cada resposta atinja um padrão de excelência, implementamos o framework proprietário HUA e o Protocolo AEGIS.',
          protocols: ['HUA Score: 95/100', 'Protocolo AEGIS', 'Human-Verified']
        }
      ],
      blueprintTitle: 'Blueprint Visual',
      architectureTitle: 'Arquitetura Técnica'
    },
    'en-US': {
      title: 'Cognitive Architecture',
      subtitle: 'Designing the Digital Twin as a Strategic Intelligence Platform',
      intro: 'The C-level decision environment lacks not information, but discernment. This project\'s mission was not to create a search assistant, but to codify and scale a proven mental model for geopolitical and economic analysis.',
      pillars: [
        {
          icon: Brain,
          title: '1. The Authentic Persona',
          subtitle: 'The soul and voice of the system',
          description: 'More than a Tone, a Multimodal Reasoning Model. The persona is not a superficial style layer, but the emulation of analytical frameworks and reasoning modes.',
          modes: ['Professor (Novices)', 'Technical/Analytical (Experts)', 'Diplomatic (Institutions)', 'Consultant (Business)']
        },
        {
          icon: Sparkles,
          title: '2. Living Knowledge Base',
          subtitle: 'The brain and memory',
          description: 'The Digital Twin\'s precision depends on a curated and dynamic knowledge base, which functions as its single source of truth.',
          features: ['Foundational Corpus', 'Real-Time Situational Awareness', 'Structured Entities']
        },
        {
          icon: Zap,
          title: '3. Adaptive Intelligence Engine',
          subtitle: 'The nervous system',
          description: 'The system learns from each interaction to improve user experience and the depth of its analyses.',
          capabilities: ['Topic Tracking', 'Persona Memory', 'Document Analysis (RAG)']
        },
        {
          icon: Shield,
          title: '4. Elite Protocols',
          subtitle: 'The immune system',
          description: 'To ensure each response meets an excellence standard, we implement the proprietary HUA framework and AEGIS Protocol.',
          protocols: ['HUA Score: 95/100', 'AEGIS Protocol', 'Human-Verified']
        }
      ],
      blueprintTitle: 'Visual Blueprint',
      architectureTitle: 'Technical Architecture'
    }
  };

  const t = content[language];

  return (
    <div className="space-y-16">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t.title}
        </h2>
        <p className="text-xl text-slate-400 mb-6">
          {t.subtitle}
        </p>
        <p className="text-slate-300 leading-relaxed">
          {t.intro}
        </p>
      </motion.div>

      {/* Blueprint Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-3xl blur-3xl" />
        <div className="relative bg-slate-900/50 rounded-3xl border border-slate-800 p-8 overflow-hidden">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">{t.blueprintTitle}</h3>
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694c394f71a54746be4d8e51/4f370e2c8_MarcosTroyjo-DigitalTwin.jpg"
            alt="Blueprint for AI Persona"
            className="w-full rounded-xl shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Four Pillars Detail */}
      <div className="grid md:grid-cols-2 gap-8">
        {t.pillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{pillar.title}</h3>
                  <p className="text-sm text-cyan-400">{pillar.subtitle}</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {pillar.description}
              </p>
              {pillar.modes && (
                <div className="flex flex-wrap gap-2">
                  {pillar.modes.map((mode, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                      {mode}
                    </span>
                  ))}
                </div>
              )}
              {pillar.features && (
                <ul className="space-y-2">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              {pillar.capabilities && (
                <ul className="space-y-2">
                  {pillar.capabilities.map((cap, idx) => (
                    <li key={idx} className="text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {cap}
                    </li>
                  ))}
                </ul>
              )}
              {pillar.protocols && (
                <div className="flex flex-wrap gap-2">
                  {pillar.protocols.map((protocol, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-500/20 text-green-400 border border-green-500/30">
                      {protocol}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Architecture Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-500/10 rounded-3xl blur-3xl" />
        <div className="relative bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">{t.architectureTitle}</h3>
          <div className="bg-white/5 rounded-xl p-4">
            <embed 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694c394f71a54746be4d8e51/a00280827_Arquitetura_da_Cognio_Digital.pdf#page=14"
              type="application/pdf"
              className="w-full h-[600px] rounded-lg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}