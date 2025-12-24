import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Plus, Shield, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DataSourceUploader from '@/components/data-sources/DataSourceUploader';
import DataSourceList from '@/components/data-sources/DataSourceList';

export default function DataSourcesPage({ language = 'pt-BR' }) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const content = {
    'pt-BR': {
      title: 'Fontes de Dados Personalizadas',
      subtitle: 'Conecte seus próprios dados para análises estratégicas enriquecidas',
      addSource: 'Adicionar Fonte',
      features: [
        {
          icon: Shield,
          title: 'Segurança End-to-End',
          description: 'Criptografia AES-256 e isolamento total de dados por usuário'
        },
        {
          icon: Lock,
          title: 'Privacidade Garantida',
          description: 'Seus dados nunca são compartilhados ou usados para treinar modelos'
        },
        {
          icon: CheckCircle,
          title: 'Rastreabilidade Completa',
          description: 'Audit trail mostra exatamente como seus dados são usados em cada análise'
        }
      ]
    },
    'en-US': {
      title: 'Custom Data Sources',
      subtitle: 'Connect your own data for enriched strategic analyses',
      addSource: 'Add Source',
      features: [
        {
          icon: Shield,
          title: 'End-to-End Security',
          description: 'AES-256 encryption and complete data isolation per user'
        },
        {
          icon: Lock,
          title: 'Privacy Guaranteed',
          description: 'Your data is never shared or used to train models'
        },
        {
          icon: CheckCircle,
          title: 'Complete Traceability',
          description: 'Audit trail shows exactly how your data is used in each analysis'
        }
      ]
    }
  };

  const t = content[language];

  // Fetch user's data sources
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: dataSources, isLoading } = useQuery({
    queryKey: ['data-sources', user?.email],
    queryFn: async () => {
      return await base44.entities.DataSource.filter({ created_by: user.email }, '-created_date');
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.DataSource.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] });
    },
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {t.features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{language === 'pt-BR' ? 'Gerenciar Fontes' : 'Manage Sources'}</h2>
            <Button
              onClick={() => setUploadDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.addSource}
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <DataSourceList
              dataSources={dataSources}
              onDelete={(id) => deleteMutation.mutate(id)}
              language={language}
            />
          )}
        </motion.div>

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="max-w-2xl bg-slate-900 border-slate-800">
            <DataSourceUploader
              onSuccess={() => {
                setUploadDialogOpen(false);
                queryClient.invalidateQueries({ queryKey: ['data-sources'] });
              }}
              language={language}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}