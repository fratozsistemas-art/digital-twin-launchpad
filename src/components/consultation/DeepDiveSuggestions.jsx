import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeepDiveSuggestions({ suggestions, onSelectTopic, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Sugestões Personalizadas',
      subtitle: 'Baseado no seu perfil de interação',
      explore: 'Explorar'
    },
    'en-US': {
      title: 'Personalized Suggestions',
      subtitle: 'Based on your interaction profile',
      explore: 'Explore'
    }
  };

  const t = content[language];

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const getPriorityColor = (priority) => {
    if (priority >= 90) return 'from-amber-600 to-orange-500';
    if (priority >= 70) return 'from-blue-600 to-cyan-500';
    return 'from-purple-600 to-pink-500';
  };

  const getPriorityIcon = (priority) => {
    if (priority >= 90) return TrendingUp;
    if (priority >= 70) return Brain;
    return Sparkles;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <div>
          <h3 className="text-lg font-semibold text-white">{t.title}</h3>
          <p className="text-xs text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {suggestions.map((suggestion, index) => {
            const Icon = getPriorityIcon(suggestion.priority);
            const colorGradient = getPriorityColor(suggestion.priority);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${colorGradient} opacity-0 group-hover:opacity-10 rounded-xl blur-xl transition-opacity duration-300`} />
                
                <button
                  onClick={() => onSelectTopic(suggestion.topic)}
                  className="relative w-full p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorGradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                        {suggestion.topic}
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {suggestion.reason}
                      </p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>

                  {/* Priority indicator */}
                  {suggestion.priority >= 90 && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white text-xs font-bold">
                        {language === 'pt-BR' ? 'Alta Prioridade' : 'High Priority'}
                      </span>
                    </div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}