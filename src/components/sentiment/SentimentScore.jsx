import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Smile, Frown, Meh } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SentimentScore({ sentiment, size = 'default', language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      labels: {
        very_positive: 'Muito Positivo',
        positive: 'Positivo',
        neutral: 'Neutro',
        negative: 'Negativo',
        very_negative: 'Muito Negativo'
      },
      score: 'Score'
    },
    'en-US': {
      labels: {
        very_positive: 'Very Positive',
        positive: 'Positive',
        neutral: 'Neutral',
        negative: 'Negative',
        very_negative: 'Very Negative'
      },
      score: 'Score'
    }
  };

  const t = content[language];

  if (!sentiment) return null;

  const { overall_score, sentiment_label } = sentiment;

  const sentimentConfig = {
    very_positive: {
      color: 'from-green-600 to-emerald-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/20',
      icon: Smile
    },
    positive: {
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/20',
      icon: TrendingUp
    },
    neutral: {
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-500/10',
      textColor: 'text-slate-400',
      borderColor: 'border-slate-500/20',
      icon: Meh
    },
    negative: {
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/20',
      icon: TrendingDown
    },
    very_negative: {
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/20',
      icon: Frown
    }
  };

  const config = sentimentConfig[sentiment_label] || sentimentConfig.neutral;
  const Icon = config.icon;

  const isSmall = size === 'small';

  return (
    <div className={`flex items-center gap-2 ${isSmall ? 'text-xs' : 'text-sm'}`}>
      <Badge className={`${config.bgColor} ${config.textColor} ${config.borderColor} flex items-center gap-1.5 ${isSmall ? 'px-2 py-0.5' : 'px-3 py-1'}`}>
        <Icon className={isSmall ? 'w-3 h-3' : 'w-4 h-4'} />
        <span className="font-medium">{t.labels[sentiment_label]}</span>
      </Badge>
      <span className={`${config.textColor} font-semibold`}>
        {overall_score > 0 ? '+' : ''}{overall_score}
      </span>
    </div>
  );
}