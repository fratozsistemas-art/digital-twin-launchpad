import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  TrendingUp, 
  DollarSign, 
  Newspaper,
  BarChart3,
  Webhook,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function IntegrationCard({ integration, onConfigure, onTest, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      configure: 'Configurar',
      test: 'Testar',
      lastSync: 'Última sincronização',
      syncs: 'sincronizações',
      never: 'Nunca',
      status: {
        active: 'Ativa',
        inactive: 'Inativa',
        error: 'Erro',
        testing: 'Testando'
      }
    },
    'en-US': {
      configure: 'Configure',
      test: 'Test',
      lastSync: 'Last sync',
      syncs: 'syncs',
      never: 'Never',
      status: {
        active: 'Active',
        inactive: 'Inactive',
        error: 'Error',
        testing: 'Testing'
      }
    }
  };

  const t = content[language];

  const typeIcons = {
    government_data: Globe,
    financial_news: Newspaper,
    market_data: TrendingUp,
    economic_indicators: BarChart3,
    sentiment_analysis: DollarSign,
    webhook: Webhook
  };

  const statusColors = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    testing: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  };

  const Icon = typeIcons[integration.type] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-semibold">{integration.name}</h3>
            <Badge className={statusColors[integration.status]}>
              {t.status[integration.status]}
            </Badge>
          </div>

          <p className="text-sm text-slate-400 mb-3 capitalize">
            {integration.provider.replace(/_/g, ' ')}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {integration.last_sync 
                ? new Date(integration.last_sync).toLocaleDateString() 
                : t.never}
            </span>
            <span>•</span>
            <span>{integration.sync_count} {t.syncs}</span>
          </div>

          {/* Error message */}
          {integration.error_message && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300">{integration.error_message}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onConfigure(integration)}
              className="flex-1"
            >
              {t.configure}
            </Button>
            <Button
              size="sm"
              onClick={() => onTest(integration)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t.test}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}