import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, FileText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SentimentScore from './SentimentScore';

export default function SentimentDashboard({ dataSources, onAnalyze, isAnalyzing, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Análise de Sentimento',
      subtitle: 'Sentimento agregado das fontes de dados',
      analyze: 'Analisar Todas',
      analyzing: 'Analisando...',
      bySource: 'Por Fonte',
      overall: 'Geral',
      positive: 'Positivo',
      negative: 'Negativo',
      neutral: 'Neutro',
      noData: 'Nenhuma análise disponível',
      noDataDesc: 'Analise suas fontes de dados para visualizar sentimentos'
    },
    'en-US': {
      title: 'Sentiment Analysis',
      subtitle: 'Aggregated sentiment from data sources',
      analyze: 'Analyze All',
      analyzing: 'Analyzing...',
      bySource: 'By Source',
      overall: 'Overall',
      positive: 'Positive',
      negative: 'Negative',
      neutral: 'Neutral',
      noData: 'No analysis available',
      noDataDesc: 'Analyze your data sources to view sentiments'
    }
  };

  const t = content[language];

  // Calculate aggregate sentiment
  const sourcesWithSentiment = dataSources?.filter(ds => ds.sentiment_analysis?.overall_score !== undefined) || [];
  
  const aggregateScore = sourcesWithSentiment.length > 0
    ? Math.round(
        sourcesWithSentiment.reduce((sum, ds) => sum + (ds.sentiment_analysis?.overall_score || 0), 0) / 
        sourcesWithSentiment.length
      )
    : 0;

  const totalPositive = sourcesWithSentiment.reduce((sum, ds) => sum + (ds.sentiment_analysis?.positive_count || 0), 0);
  const totalNegative = sourcesWithSentiment.reduce((sum, ds) => sum + (ds.sentiment_analysis?.negative_count || 0), 0);
  const totalNeutral = sourcesWithSentiment.reduce((sum, ds) => sum + (ds.sentiment_analysis?.neutral_count || 0), 0);
  const total = totalPositive + totalNegative + totalNeutral;

  const aggregateLabel = aggregateScore >= 50 ? 'very_positive' 
    : aggregateScore >= 20 ? 'positive'
    : aggregateScore >= -20 ? 'neutral'
    : aggregateScore >= -50 ? 'negative'
    : 'very_negative';

  if (sourcesWithSentiment.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center"
      >
        <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">{t.noData}</h3>
        <p className="text-sm text-slate-400 mb-6">{t.noDataDesc}</p>
        {dataSources?.length > 0 && (
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                {t.analyzing}
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                {t.analyze}
              </>
            )}
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Overall Sentiment */}
      <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{t.overall}</h3>
          <Button
            size="sm"
            variant="outline"
            onClick={onAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                {t.analyzing}
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.analyze}
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center justify-center py-6">
          <SentimentScore
            sentiment={{
              overall_score: aggregateScore,
              sentiment_label: aggregateLabel
            }}
            size="large"
            language={language}
          />
        </div>

        {/* Distribution */}
        {total > 0 && (
          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-400">{t.positive}</span>
              <span className="text-slate-400">{totalPositive} ({Math.round((totalPositive / total) * 100)}%)</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${(totalPositive / total) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{t.neutral}</span>
              <span className="text-slate-400">{totalNeutral} ({Math.round((totalNeutral / total) * 100)}%)</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-500"
                style={{ width: `${(totalNeutral / total) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400">{t.negative}</span>
              <span className="text-slate-400">{totalNegative} ({Math.round((totalNegative / total) * 100)}%)</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${(totalNegative / total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* By Source */}
      <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">{t.bySource}</h3>
        <div className="space-y-3">
          {sourcesWithSentiment.map((source) => (
            <div
              key={source.id}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-white font-medium truncate">{source.name}</span>
              </div>
              <SentimentScore
                sentiment={source.sentiment_analysis}
                size="small"
                language={language}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}