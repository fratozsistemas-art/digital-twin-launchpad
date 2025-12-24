import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ConceptEvolutionTimeline({ neologisms, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Linha do Tempo da Evolução Conceitual',
      subtitle: 'Desenvolvimento e aplicação dos conceitos ao longo do tempo',
      noData: 'Nenhum dado de evolução disponível'
    },
    'en-US': {
      title: 'Concept Evolution Timeline',
      subtitle: 'Development and application of concepts over time',
      noData: 'No evolution data available'
    }
  };

  const t = content[language];

  // Flatten all evolution points from all neologisms
  const allEvolutionPoints = [];
  neologisms?.forEach(neologism => {
    if (neologism.evolution_points && neologism.evolution_points.length > 0) {
      neologism.evolution_points.forEach(point => {
        allEvolutionPoints.push({
          ...point,
          term: neologism.term,
          category: neologism.category,
          neologismId: neologism.id
        });
      });
    }
  });

  // Sort by year
  allEvolutionPoints.sort((a, b) => a.year - b.year);

  const categoryColors = {
    geopolitics: 'from-red-600 to-orange-500',
    economics: 'from-blue-600 to-cyan-500',
    trade: 'from-green-600 to-emerald-500',
    diplomacy: 'from-purple-600 to-pink-500',
    competitiveness: 'from-amber-600 to-yellow-500',
    sustainability: 'from-teal-600 to-green-500'
  };

  if (allEvolutionPoints.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">{t.noData}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400">{t.subtitle}</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900" />

        {/* Timeline Items */}
        <div className="space-y-8">
          {allEvolutionPoints.map((point, index) => (
            <motion.div
              key={`${point.neologismId}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-6 pl-20"
            >
              {/* Year Badge */}
              <div className="absolute left-0 flex items-center gap-3">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${categoryColors[point.category]} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-sm">{point.year}</span>
                </div>
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50" />
              </div>

              {/* Content Card */}
              <div className="flex-1 p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={`bg-gradient-to-r ${categoryColors[point.category]} text-white border-0`}>
                      {point.term}
                    </Badge>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-white mb-2">
                  {point.milestone}
                </h4>

                {point.description && (
                  <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                    {point.description}
                  </p>
                )}

                {point.source && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>{point.source}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}