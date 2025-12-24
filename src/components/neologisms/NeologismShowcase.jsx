import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Book, TrendingUp, Globe2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function NeologismShowcase({ neologisms, language = 'pt-BR' }) {
  const [selectedNeologism, setSelectedNeologism] = useState(null);

  const content = {
    'pt-BR': {
      title: 'Neologismos e Conceitos Proprietários',
      subtitle: 'Termos únicos cunhados por Marcos Prado Troyjo',
      coined: 'Cunhado em',
      category: 'Categoria',
      relevance: 'Relevância Atual',
      viewDetails: 'Ver Detalhes',
      applications: 'Aplicações Práticas',
      publications: 'Publicações Relacionadas',
      evolution: 'Evolução do Conceito',
      categories: {
        geopolitics: 'Geopolítica',
        economics: 'Economia',
        trade: 'Comércio',
        diplomacy: 'Diplomacia',
        competitiveness: 'Competitividade',
        sustainability: 'Sustentabilidade'
      }
    },
    'en-US': {
      title: 'Neologisms and Proprietary Concepts',
      subtitle: 'Unique terms coined by Marcos Prado Troyjo',
      coined: 'Coined in',
      category: 'Category',
      relevance: 'Current Relevance',
      viewDetails: 'View Details',
      applications: 'Practical Applications',
      publications: 'Related Publications',
      evolution: 'Concept Evolution',
      categories: {
        geopolitics: 'Geopolitics',
        economics: 'Economics',
        trade: 'Trade',
        diplomacy: 'Diplomacy',
        competitiveness: 'Competitiveness',
        sustainability: 'Sustainability'
      }
    }
  };

  const t = content[language];

  const categoryColors = {
    geopolitics: 'from-red-600 to-orange-500',
    economics: 'from-blue-600 to-cyan-500',
    trade: 'from-green-600 to-emerald-500',
    diplomacy: 'from-purple-600 to-pink-500',
    competitiveness: 'from-amber-600 to-yellow-500',
    sustainability: 'from-teal-600 to-green-500'
  };

  const categoryIcons = {
    geopolitics: Globe2,
    economics: TrendingUp,
    trade: ChevronRight,
    diplomacy: Sparkles,
    competitiveness: TrendingUp,
    sustainability: Globe2
  };

  if (!neologisms || neologisms.length === 0) {
    return (
      <div className="text-center py-12">
        <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">
          {language === 'pt-BR' ? 'Nenhum neologismo disponível' : 'No neologisms available'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neologisms.map((neologism, index) => {
          const Icon = categoryIcons[neologism.category] || Sparkles;
          return (
            <motion.div
              key={neologism.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                   style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
              
              <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[neologism.category]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {t.coined} {neologism.year_coined}
                  </Badge>
                </div>

                {/* Term */}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  "{neologism.term}"
                </h3>

                {/* Definition */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {neologism.definition}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <Badge className={`bg-gradient-to-r ${categoryColors[neologism.category]} text-white border-0`}>
                    {t.categories[neologism.category]}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedNeologism(neologism)}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    {t.viewDetails}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Relevance Bar */}
                {neologism.relevance_score && (
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-500">{t.relevance}</span>
                      <span className="text-cyan-400 font-semibold">{neologism.relevance_score}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${categoryColors[neologism.category]} rounded-full`}
                        style={{ width: `${neologism.relevance_score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedNeologism && (
        <Dialog open={!!selectedNeologism} onOpenChange={() => setSelectedNeologism(null)}>
          <DialogContent className="max-w-3xl bg-slate-900 border-slate-800 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[selectedNeologism.category]} flex items-center justify-center`}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                "{selectedNeologism.term}"
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Definition */}
              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  {language === 'pt-BR' ? 'Definição' : 'Definition'}
                </h4>
                <p className="text-slate-300 leading-relaxed">{selectedNeologism.definition}</p>
              </div>

              {/* Context */}
              {selectedNeologism.context && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    {language === 'pt-BR' ? 'Contexto' : 'Context'}
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{selectedNeologism.context}</p>
                </div>
              )}

              {/* Practical Applications */}
              {selectedNeologism.practical_applications && selectedNeologism.practical_applications.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                    {t.applications}
                  </h4>
                  <ul className="space-y-2">
                    {selectedNeologism.practical_applications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300">
                        <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Publications */}
              {selectedNeologism.related_publications && selectedNeologism.related_publications.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                    {t.publications}
                  </h4>
                  <div className="space-y-2">
                    {selectedNeologism.related_publications.map((pub, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                        <Book className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{pub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}