import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function PersonaInsights({ insights, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Insights da Persona',
      engagement: 'Nível de Engajamento',
      learning: 'Progresso de Aprendizado',
      topTopics: 'Seus Tópicos Principais',
      levels: {
        low: 'Iniciante',
        medium: 'Intermediário',
        high: 'Avançado'
      }
    },
    'en-US': {
      title: 'Persona Insights',
      engagement: 'Engagement Level',
      learning: 'Learning Progress',
      topTopics: 'Your Top Topics',
      levels: {
        low: 'Beginner',
        medium: 'Intermediate',
        high: 'Advanced'
      }
    }
  };

  const t = content[language];

  if (!insights) return null;

  const engagementColors = {
    low: 'text-slate-400',
    medium: 'text-blue-400',
    high: 'text-green-400'
  };

  const engagementGradients = {
    low: 'from-slate-600 to-slate-500',
    medium: 'from-blue-600 to-cyan-500',
    high: 'from-green-600 to-emerald-500'
  };

  const topicIcons = {
    brics: Globe2,
    global_trade: TrendingUp,
    competitiveness: Target,
    geopolitics: Brain,
    emerging_markets: Zap,
    sustainability: Sparkles,
    economic_diplomacy: Users,
    financial_markets: BarChart3
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 rounded-xl bg-slate-900/50 border border-slate-800"
    >
      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <Brain className="w-4 h-4 text-cyan-400" />
        {t.title}
      </h3>

      <div className="space-y-4">
        {/* Engagement Level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">{t.engagement}</span>
            <span className={`text-xs font-semibold ${engagementColors[insights.engagementLevel]}`}>
              {t.levels[insights.engagementLevel]}
            </span>
          </div>
          <div className={`h-2 rounded-full bg-gradient-to-r ${engagementGradients[insights.engagementLevel]} opacity-60`} />
        </div>

        {/* Learning Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">{t.learning}</span>
            <span className="text-xs font-semibold text-cyan-400">
              {insights.learningProgress}%
            </span>
          </div>
          <Progress value={insights.learningProgress} className="h-2" />
        </div>

        {/* Top Topics */}
        {insights.topTopics && insights.topTopics.length > 0 && (
          <div>
            <span className="text-xs text-slate-400 block mb-2">{t.topTopics}</span>
            <div className="flex flex-wrap gap-2">
              {insights.topTopics.map((topic, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                >
                  {topic.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}