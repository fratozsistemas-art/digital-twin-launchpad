import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings, Database, AlertTriangle, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import CRVSettings from '@/components/governance/CRVSettings';
import ParadoxHistory from '@/components/governance/ParadoxHistory';
import DataSourceDetails from '@/components/governance/DataSourceDetails';

export default function GovernancePanel({ language = 'pt-BR' }) {
  const queryClient = useQueryClient();

  const content = {
    'pt-BR': {
      title: 'Painel de Governança da IA',
      subtitle: 'Controle total sobre parâmetros, decisões e dados do seu Digital Twin',
      tabs: {
        crv: 'CRV Scoring',
        paradoxes: 'Paradoxos',
        sources: 'Fontes de Dados',
        alerts: 'Alertas'
      },
      saveSuccess: 'Configurações salvas com sucesso!'
    },
    'en-US': {
      title: 'AI Governance Panel',
      subtitle: 'Full control over parameters, decisions, and data of your Digital Twin',
      tabs: {
        crv: 'CRV Scoring',
        paradoxes: 'Paradoxes',
        sources: 'Data Sources',
        alerts: 'Alerts'
      },
      saveSuccess: 'Settings saved successfully!'
    }
  };

  const t = content[language];

  // Fetch user
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  // Fetch governance settings
  const { data: governanceSettings } = useQuery({
    queryKey: ['governance-settings', user?.email],
    queryFn: async () => {
      const settings = await base44.entities.GovernanceSettings.filter({ created_by: user.email });
      return settings[0] || null;
    },
    enabled: !!user?.email,
  });

  // Fetch consultations for paradox history
  const { data: consultations } = useQuery({
    queryKey: ['consultations', user?.email],
    queryFn: async () => {
      return await base44.entities.Consultation.filter({ created_by: user.email }, '-created_date');
    },
    enabled: !!user?.email,
  });

  // Fetch data sources
  const { data: dataSources } = useQuery({
    queryKey: ['data-sources', user?.email],
    queryFn: async () => {
      return await base44.entities.DataSource.filter({ created_by: user.email }, '-created_date');
    },
    enabled: !!user?.email,
  });

  // Save/Update governance settings
  const saveSettingsMutation = useMutation({
    mutationFn: async (settings) => {
      if (governanceSettings?.id) {
        return await base44.entities.GovernanceSettings.update(governanceSettings.id, settings);
      } else {
        return await base44.entities.GovernanceSettings.create(settings);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['governance-settings'] });
      toast.success(t.saveSuccess);
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
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="crv" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border border-slate-800 mb-8">
              <TabsTrigger value="crv" className="data-[state=active]:bg-purple-600">
                <Settings className="w-4 h-4 mr-2" />
                {t.tabs.crv}
              </TabsTrigger>
              <TabsTrigger value="paradoxes" className="data-[state=active]:bg-purple-600">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {t.tabs.paradoxes}
              </TabsTrigger>
              <TabsTrigger value="sources" className="data-[state=active]:bg-purple-600">
                <Database className="w-4 h-4 mr-2" />
                {t.tabs.sources}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crv" className="mt-0">
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                <CRVSettings
                  settings={governanceSettings}
                  onSave={(settings) => saveSettingsMutation.mutate(settings)}
                  language={language}
                />
              </div>
            </TabsContent>

            <TabsContent value="paradoxes" className="mt-0">
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                <ParadoxHistory
                  consultations={consultations}
                  language={language}
                />
              </div>
            </TabsContent>

            <TabsContent value="sources" className="mt-0">
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                <DataSourceDetails
                  dataSources={dataSources}
                  language={language}
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}