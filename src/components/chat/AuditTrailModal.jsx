import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Database, Globe, TrendingUp, Building, CheckCircle, ExternalLink } from 'lucide-react';

export default function AuditTrailModal({ isOpen, onClose, sources, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Rastreabilidade de Fontes',
      subtitle: 'Todas as fontes utilizadas para gerar esta resposta',
      noSources: 'Nenhuma fonte disponível',
      sourceTypes: {
        knowledge_base: 'Base de Conhecimento',
        external_data: 'Dados Externos',
        real_time_feed: 'Feed em Tempo Real',
        bloomberg: 'Bloomberg Terminal',
        oxford_analytics: 'Oxford Analytics'
      },
      confidence: 'Confiança da Fonte',
      viewSource: 'Ver Fonte'
    },
    'en-US': {
      title: 'Source Traceability',
      subtitle: 'All sources used to generate this response',
      noSources: 'No sources available',
      sourceTypes: {
        knowledge_base: 'Knowledge Base',
        external_data: 'External Data',
        real_time_feed: 'Real-Time Feed',
        bloomberg: 'Bloomberg Terminal',
        oxford_analytics: 'Oxford Analytics'
      },
      confidence: 'Source Confidence',
      viewSource: 'View Source'
    }
  };

  const t = content[language];

  const sourceIcons = {
    knowledge_base: FileText,
    external_data: Database,
    real_time_feed: Globe,
    bloomberg: TrendingUp,
    oxford_analytics: Building
  };

  const sourceColors = {
    knowledge_base: 'from-blue-600 to-cyan-500',
    external_data: 'from-purple-600 to-pink-500',
    real_time_feed: 'from-green-600 to-emerald-500',
    bloomberg: 'from-amber-600 to-orange-500',
    oxford_analytics: 'from-indigo-600 to-violet-500'
  };

  if (!sources || sources.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">{t.title}</DialogTitle>
          </DialogHeader>
          <div className="py-12 text-center">
            <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">{t.noSources}</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white mb-2">{t.title}</DialogTitle>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {sources.map((source, index) => {
            const Icon = sourceIcons[source.type] || FileText;
            const colorGradient = sourceColors[source.type] || 'from-slate-600 to-slate-500';

            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorGradient} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold mb-1 leading-snug">
                          {source.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-700/50 text-slate-300 capitalize">
                            {t.sourceTypes[source.type] || source.type}
                          </span>
                          {source.confidence && (
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-xs text-green-400 font-medium">
                                {source.confidence}% {t.confidence}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors shrink-0 ml-3"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Excerpt */}
                    {source.excerpt && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                        <p className="text-sm text-slate-300 leading-relaxed italic">
                          "{source.excerpt}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Validation Footer */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
            <p className="text-sm text-green-300">
              {language === 'pt-BR' 
                ? `✓ Resposta verificada com ${sources.length} fonte${sources.length > 1 ? 's' : ''} primária${sources.length > 1 ? 's' : ''}`
                : `✓ Response verified with ${sources.length} primary source${sources.length > 1 ? 's' : ''}`
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}