import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, TrendingUp, Shield, Eye, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function DataSourceDetails({ dataSources, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Gestão Detalhada de Fontes',
      subtitle: 'Status, permissões e histórico de uso das fontes conectadas',
      empty: 'Nenhuma fonte conectada',
      status: 'Status',
      privacy: 'Privacidade',
      usage: 'Uso',
      lastUsed: 'Último uso',
      uploaded: 'Enviado',
      statusLabels: {
        processing: 'Processando',
        active: 'Ativa',
        error: 'Erro',
        archived: 'Arquivada'
      },
      privacyLabels: {
        public: 'Público',
        private: 'Privado',
        confidential: 'Confidencial'
      }
    },
    'en-US': {
      title: 'Detailed Source Management',
      subtitle: 'Status, permissions, and usage history of connected sources',
      empty: 'No sources connected',
      status: 'Status',
      privacy: 'Privacy',
      usage: 'Usage',
      lastUsed: 'Last used',
      uploaded: 'Uploaded',
      statusLabels: {
        processing: 'Processing',
        active: 'Active',
        error: 'Error',
        archived: 'Archived'
      },
      privacyLabels: {
        public: 'Public',
        private: 'Private',
        confidential: 'Confidential'
      }
    }
  };

  const t = content[language];

  const statusColors = {
    processing: 'bg-amber-500/10 text-amber-400',
    active: 'bg-green-500/10 text-green-400',
    error: 'bg-red-500/10 text-red-400',
    archived: 'bg-slate-500/10 text-slate-400'
  };

  const privacyColors = {
    public: 'bg-blue-500/10 text-blue-400',
    private: 'bg-purple-500/10 text-purple-400',
    confidential: 'bg-red-500/10 text-red-400'
  };

  if (!dataSources || dataSources.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">{t.empty}</p>
      </div>
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
        {dataSources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-xl bg-slate-800/50 border border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold mb-2">{source.name}</h4>
                
                {source.description && (
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{source.description}</p>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-slate-900/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-slate-500" />
                      <span className="text-xs text-slate-500">{t.status}</span>
                    </div>
                    <Badge className={statusColors[source.status]}>
                      {t.statusLabels[source.status]}
                    </Badge>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-slate-500" />
                      <span className="text-xs text-slate-500">{t.privacy}</span>
                    </div>
                    <Badge className={privacyColors[source.privacy_level]}>
                      {t.privacyLabels[source.privacy_level]}
                    </Badge>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-slate-500" />
                      <span className="text-xs text-slate-500">{t.usage}</span>
                    </div>
                    <span className="text-white font-semibold">
                      {source.metadata?.usage_count || 0}x
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-xs text-slate-500">{t.uploaded}</span>
                    </div>
                    <span className="text-white text-sm">
                      {source.metadata?.upload_date 
                        ? format(new Date(source.metadata.upload_date), 'dd/MM/yy')
                        : '-'}
                    </span>
                  </div>
                </div>

                {/* Last Used */}
                {source.metadata?.last_used && (
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" />
                    {t.lastUsed}: {format(new Date(source.metadata.last_used), 'dd/MM/yyyy HH:mm')}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}