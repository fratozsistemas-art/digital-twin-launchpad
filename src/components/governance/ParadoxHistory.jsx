import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, CheckCircle, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export default function ParadoxHistory({ consultations, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Histórico de Resoluções de Paradoxos',
      subtitle: 'Registro de decisões estratégicas em cenários conflitantes',
      empty: 'Nenhum paradoxo resolvido ainda',
      emptyDesc: 'Paradoxos aparecem quando dados conflitantes requerem priorização estratégica',
      scenario: 'Cenário',
      choice: 'Decisão Tomada',
      date: 'Data',
      consultation: 'Consulta'
    },
    'en-US': {
      title: 'Paradox Resolution History',
      subtitle: 'Record of strategic decisions in conflicting scenarios',
      empty: 'No paradoxes resolved yet',
      emptyDesc: 'Paradoxes appear when conflicting data requires strategic prioritization',
      scenario: 'Scenario',
      choice: 'Decision Made',
      date: 'Date',
      consultation: 'Consultation'
    }
  };

  const t = content[language];

  // Extract paradox resolutions from consultations
  const paradoxResolutions = consultations
    ?.flatMap(consultation => 
      (consultation.paradox_resolutions || []).map(resolution => ({
        ...resolution,
        consultationTitle: consultation.title,
        consultationId: consultation.id
      }))
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) || [];

  if (paradoxResolutions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <AlertTriangle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">{t.empty}</h3>
        <p className="text-sm text-slate-400">{t.emptyDesc}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{t.title}</h3>
        <p className="text-sm text-slate-400">{t.subtitle}</p>
      </div>

      <div className="space-y-4">
        {paradoxResolutions.map((resolution, index) => (
          <motion.div
            key={resolution.paradox_id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{t.scenario}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{resolution.scenario}</p>
                  </div>
                </div>

                {/* Options */}
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className={`p-3 rounded-lg border ${
                    resolution.user_choice === 'option_a' 
                      ? 'bg-blue-500/10 border-blue-500/30' 
                      : 'bg-slate-900/50 border-slate-700'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {resolution.user_choice === 'option_a' && (
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      )}
                      <span className="text-sm font-medium text-white">
                        {resolution.option_a?.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{resolution.option_a?.description}</p>
                  </div>

                  <div className={`p-3 rounded-lg border ${
                    resolution.user_choice === 'option_b' 
                      ? 'bg-blue-500/10 border-blue-500/30' 
                      : 'bg-slate-900/50 border-slate-700'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {resolution.user_choice === 'option_b' && (
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      )}
                      <span className="text-sm font-medium text-white">
                        {resolution.option_b?.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{resolution.option_b?.description}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(resolution.timestamp), 'dd/MM/yyyy HH:mm')}
                  </span>
                  <span>•</span>
                  <span>{resolution.consultationTitle}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}