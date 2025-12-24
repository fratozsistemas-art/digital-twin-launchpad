import React from 'react';
import { TrendingUp, Hash } from 'lucide-react';

export default function TrendingTopicsWidget({ consultations = [], language }) {
  // Extract and count topics from consultations
  const extractTrendingTopics = () => {
    const topicCount = {};
    
    consultations.forEach(consultation => {
      if (consultation.topics) {
        consultation.topics.forEach(topic => {
          topicCount[topic] = (topicCount[topic] || 0) + 1;
        });
      }
    });

    // Sort by frequency and get top 8
    return Object.entries(topicCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([topic, count]) => ({ topic, count }));
  };

  const trendingTopics = extractTrendingTopics();

  const content = {
    'pt-BR': {
      empty: 'Nenhum tópico em alta',
      emptyDesc: 'Inicie consultas para ver os tópicos mais discutidos',
      mentions: 'menções'
    },
    'en-US': {
      empty: 'No trending topics',
      emptyDesc: 'Start consultations to see trending topics',
      mentions: 'mentions'
    }
  };

  const t = content[language];

  if (trendingTopics.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
        <Hash className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm text-slate-400 mb-1">{t.empty}</p>
        <p className="text-xs text-slate-500">{t.emptyDesc}</p>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
      <div className="space-y-3">
        {trendingTopics.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600/20 to-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-green-400">#{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate capitalize group-hover:text-cyan-400 transition-colors">
                  {item.topic.replace(/_/g, ' ')}
                </p>
                <p className="text-xs text-slate-500">
                  {item.count} {t.mentions}
                </p>
              </div>
            </div>
            <TrendingUp className="w-4 h-4 text-green-400 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}