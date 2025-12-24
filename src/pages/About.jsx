import React from 'react';
import { motion } from 'framer-motion';
import CognitiveArchitecture from '@/components/about/CognitiveArchitecture';
import { Award, BookOpen, Briefcase, GraduationCap, Globe, Building2 } from 'lucide-react';

export default function About({ language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Sobre Marcos Prado Troyjo',
      subtitle: 'Economista, diplomata e líder institucional com visão global',
      bio: {
        title: 'Biografia',
        paragraphs: [
          'Nascido em São Paulo (1966), Marcos Prado Troyjo é economista e cientista político formado pela USP, com doutorado em Sociologia das Relações Internacionais (USP, 2005) e pós-doutorado pela Columbia University.',
          'Diplomata de carreira pelo Instituto Rio Branco, serviu por 10 anos no Itamaraty antes de assumir a Secretaria Especial de Comércio Exterior (2019-2020) e, posteriormente, a presidência do Novo Banco de Desenvolvimento – Banco do BRICS (2020-2023), sendo o primeiro brasileiro e primeiro ocidental a liderar uma instituição multilateral asiática.',
          'Atualmente (2025), é Transformational Leadership Fellow na Blavatnik School (Oxford), Distinguished Policy Fellow no Hoffmann Institute (INSEAD), Research Scholar no Center on Global Economic Governance (Columbia) e membro do Global Advisory Council do European Investment Bank (EIB).'
        ]
      },
      expertise: {
        title: 'Áreas de Expertise',
        items: [
          { icon: Globe, title: 'Geopolítica Econômica', description: 'Análise de grandes movimentos globais e reconfiguração de poder' },
          { icon: Briefcase, title: 'Comércio Internacional', description: 'Cadeias de valor, acordos comerciais e competitividade sistêmica' },
          { icon: Building2, title: 'BRICS & Emergentes', description: 'Multipolaridade, instituições financeiras e Sul Global' },
          { icon: Award, title: 'Diplomacia Econômica', description: 'Estratégias de inserção global e soft power comercial' }
        ]
      },
      publications: {
        title: 'Publicações Principais',
        books: [
          { title: 'Trading Up', year: '2022', description: 'Visão sobre o futuro do comércio global pós-pandemia' },
          { title: 'Desglobalização', year: '2016', description: 'Análise das tendências protecionistas e fragmentação' },
          { title: 'Nação-Comerciante', year: '2007', description: 'Estratégias para o Brasil no comércio internacional' }
        ]
      },
      recognition: {
        title: 'Reconhecimentos',
        items: [
          'Grande Oficial da Ordem de Rio Branco',
          'Personalidade do Ano em Comércio Exterior (FUNCEX 2020)',
          'TOYP World – Ten Outstanding Young Persons (2004)',
          'Membro do Global Advisory Council (EIB)'
        ]
      }
    },
    'en-US': {
      title: 'About Marcos Prado Troyjo',
      subtitle: 'Economist, diplomat, and institutional leader with a global vision',
      bio: {
        title: 'Biography',
        paragraphs: [
          'Born in São Paulo (1966), Marcos Prado Troyjo is an economist and political scientist graduated from USP, with a PhD in Sociology of International Relations (USP, 2005) and postdoctoral studies at Columbia University.',
          'A career diplomat from the Rio Branco Institute, he served for 10 years at Itamaraty before assuming the role of Special Secretary of Foreign Trade (2019-2020) and, subsequently, the presidency of the New Development Bank – BRICS Bank (2020-2023), being the first Brazilian and first Westerner to lead an Asian multilateral institution.',
          'Currently (2025), he is a Transformational Leadership Fellow at the Blavatnik School (Oxford), Distinguished Policy Fellow at the Hoffmann Institute (INSEAD), Research Scholar at the Center on Global Economic Governance (Columbia), and member of the Global Advisory Council of the European Investment Bank (EIB).'
        ]
      },
      expertise: {
        title: 'Areas of Expertise',
        items: [
          { icon: Globe, title: 'Economic Geopolitics', description: 'Analysis of major global movements and power reconfiguration' },
          { icon: Briefcase, title: 'International Trade', description: 'Value chains, trade agreements, and systemic competitiveness' },
          { icon: Building2, title: 'BRICS & Emerging Markets', description: 'Multipolarity, financial institutions, and the Global South' },
          { icon: Award, title: 'Economic Diplomacy', description: 'Global insertion strategies and commercial soft power' }
        ]
      },
      publications: {
        title: 'Main Publications',
        books: [
          { title: 'Trading Up', year: '2022', description: 'Vision for the future of global trade post-pandemic' },
          { title: 'Deglobalization', year: '2016', description: 'Analysis of protectionist trends and fragmentation' },
          { title: 'Trading Nation', year: '2007', description: 'Strategies for Brazil in international trade' }
        ]
      },
      recognition: {
        title: 'Recognition',
        items: [
          'Grand Officer of the Order of Rio Branco',
          'Personality of the Year in Foreign Trade (FUNCEX 2020)',
          'TOYP World – Ten Outstanding Young Persons (2004)',
          'Member of the Global Advisory Council (EIB)'
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-slate-400">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-cyan-400" />
            {t.bio.title}
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            {t.bio.paragraphs.map((para, index) => (
              <p key={index} className="text-lg">{para}</p>
            ))}
          </div>
        </motion.section>

        {/* Expertise Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            {t.expertise.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.expertise.items.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Publications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-400" />
            {t.publications.title}
          </h2>
          <div className="space-y-6">
            {t.publications.books.map((book, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {book.title}
                  </h3>
                  <span className="text-cyan-400 font-mono text-sm">
                    {book.year}
                  </span>
                </div>
                <p className="text-slate-400">
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Recognition */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400" />
            {t.recognition.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.recognition.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-slate-900/50 border border-slate-800"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Cognitive Architecture Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20"
        >
          <CognitiveArchitecture language={language} />
        </motion.section>
        </div>
        </div>
        );
        }