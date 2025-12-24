import React from 'react';
import InsightCard from './InsightCard';
import { Sparkles, Filter } from 'lucide-react';

export default function PersonalizedFeed({ insights = [], language, userProfile }) {
  const content = {
    'pt-BR': {
      empty: 'Nenhum insight disponível',
      emptyDesc: 'Complete seu perfil para receber insights personalizados',
      loading: 'Carregando insights...'
    },
    'en-US': {
      empty: 'No insights available',
      emptyDesc: 'Complete your profile to receive personalized insights',
      loading: 'Loading insights...'
    }
  };

  const t = content[language];

  if (insights.length === 0) {
    return (
      <div className="p-12 rounded-xl bg-slate-900/30 border border-slate-800 border-dashed text-center">
        <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400 mb-2">{t.empty}</p>
        <p className="text-sm text-slate-500">{t.emptyDesc}</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} language={language} />
      ))}
    </div>
  );
}