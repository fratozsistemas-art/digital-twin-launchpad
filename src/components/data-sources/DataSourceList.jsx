import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, TrendingUp, Link2, MoreVertical, Trash2, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DataSourceList({ dataSources, onDelete, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Suas Fontes de Dados Conectadas',
      empty: 'Nenhuma fonte conectada ainda',
      emptyDesc: 'Conecte documentos, relatórios ou APIs para análises personalizadas',
      status: {
        processing: 'Processando',
        active: 'Ativa',
        error: 'Erro',
        archived: 'Arquivada'
      },
      usageCount: 'usado vezes',
      actions: 'Ações',
      view: 'Ver Detalhes',
      delete: 'Remover',
      uploadedOn: 'Enviado em'
    },
    'en-US': {
      title: 'Your Connected Data Sources',
      empty: 'No sources connected yet',
      emptyDesc: 'Connect documents, reports, or APIs for personalized analyses',
      status: {
        processing: 'Processing',
        active: 'Active',
        error: 'Error',
        archived: 'Archived'
      },
      usageCount: 'times used',
      actions: 'Actions',
      view: 'View Details',
      delete: 'Remove',
      uploadedOn: 'Uploaded on'
    }
  };

  const t = content[language];

  const typeIcons = {
    financial_report: FileText,
    internal_document: FileText,
    market_data: TrendingUp,
    custom_api: Link2,
    research_paper: Database,
    other: FileText
  };

  const statusColors = {
    processing: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    archived: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  };

  if (!dataSources || dataSources.length === 0) {
    return (
      <div className="text-center py-12">
        <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">{t.empty}</h3>
        <p className="text-sm text-slate-400">{t.emptyDesc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{t.title}</h3>
      
      <div className="grid gap-4">
        {dataSources.map((source, index) => {
          const Icon = typeIcons[source.type] || FileText;
          const statusColor = statusColors[source.status] || statusColors.active;

          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold mb-1">{source.name}</h4>
                      <p className="text-sm text-slate-400 line-clamp-2">{source.description}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0 ml-2">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-900 border-slate-800">
                        <DropdownMenuItem className="text-slate-300 hover:bg-slate-800">
                          <Eye className="w-4 h-4 mr-2" />
                          {t.view}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete && onDelete(source.id)}
                          className="text-red-400 hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {t.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <span className={`text-xs px-2 py-1 rounded-md border ${statusColor}`}>
                      {t.status[source.status]}
                    </span>
                    {source.metadata?.usage_count > 0 && (
                      <span className="text-xs text-slate-500">
                        {source.metadata.usage_count}x {t.usageCount}
                      </span>
                    )}
                    {source.metadata?.upload_date && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(source.metadata.upload_date), 'dd/MM/yyyy')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}