import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Globe, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import IntegrationSetup from '@/components/integrations/IntegrationSetup';

export default function ExternalIntegrations({ language = 'pt-BR' }) {
  const [setupOpen, setSetupOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const queryClient = useQueryClient();

  const content = {
    'pt-BR': {
      title: 'Integrações Externas',
      subtitle: 'Conecte APIs gratuitas de dados governamentais, econômicos e notícias',
      add: 'Nova Integração',
      empty: 'Nenhuma integração configurada',
      emptyDesc: 'Adicione integrações para enriquecer análises com dados em tempo real',
      testSuccess: 'Teste realizado com sucesso!',
      testError: 'Erro no teste da integração',
      saveSuccess: 'Integração salva com sucesso!',
      features: [
        {
          title: 'APIs Governamentais',
          desc: 'IBGE, Banco Central, dados oficiais do Brasil'
        },
        {
          title: 'Dados Econômicos Globais',
          desc: 'World Bank, FMI, FRED - indicadores mundiais'
        },
        {
          title: 'Notícias e Mercado',
          desc: 'NewsAPI, Alpha Vantage - informações em tempo real'
        }
      ]
    },
    'en-US': {
      title: 'External Integrations',
      subtitle: 'Connect free APIs for government, economic, and news data',
      add: 'New Integration',
      empty: 'No integrations configured',
      emptyDesc: 'Add integrations to enrich analyses with real-time data',
      testSuccess: 'Test completed successfully!',
      testError: 'Integration test failed',
      saveSuccess: 'Integration saved successfully!',
      features: [
        {
          title: 'Government APIs',
          desc: 'IBGE, Central Bank, official Brazilian data'
        },
        {
          title: 'Global Economic Data',
          desc: 'World Bank, IMF, FRED - worldwide indicators'
        },
        {
          title: 'News and Market',
          desc: 'NewsAPI, Alpha Vantage - real-time information'
        }
      ]
    }
  };

  const t = content[language];

  // Fetch user
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  // Fetch integrations
  const { data: integrations, isLoading } = useQuery({
    queryKey: ['external-integrations', user?.email],
    queryFn: async () => {
      return await base44.entities.ExternalIntegration.filter(
        { created_by: user.email },
        '-created_date'
      );
    },
    enabled: !!user?.email,
  });

  // Save integration
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (data.id) {
        return await base44.entities.ExternalIntegration.update(data.id, data);
      } else {
        return await base44.entities.ExternalIntegration.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['external-integrations'] });
      setSetupOpen(false);
      setSelectedIntegration(null);
      toast.success(t.saveSuccess);
    },
  });

  // Test integration
  const testMutation = useMutation({
    mutationFn: async (integration) => {
      const response = await base44.functions.invoke('testIntegration', { integration });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(t.testSuccess);
        queryClient.invalidateQueries({ queryKey: ['external-integrations'] });
      } else {
        toast.error(data.message || t.testError);
      }
    },
    onError: () => {
      toast.error(t.testError);
    }
  });

  const handleConfigure = (integration) => {
    setSelectedIntegration(integration);
    setSetupOpen(true);
  };

  const handleTest = (integration) => {
    testMutation.mutate(integration);
  };

  const handleSave = (data) => {
    saveMutation.mutate(data);
  };

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
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
            >
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => {
              setSelectedIntegration(null);
              setSetupOpen(true);
            }}
            className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.add}
          </Button>
        </div>

        {/* Integrations List */}
        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-slate-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading...</p>
          </div>
        ) : integrations?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConfigure={handleConfigure}
                onTest={handleTest}
                language={language}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Globe className="w-20 h-20 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{t.empty}</h3>
            <p className="text-slate-400 mb-6">{t.emptyDesc}</p>
            <Button
              onClick={() => setSetupOpen(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.add}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Setup Dialog */}
      <IntegrationSetup
        isOpen={setupOpen}
        onClose={() => {
          setSetupOpen(false);
          setSelectedIntegration(null);
        }}
        onSave={handleSave}
        integration={selectedIntegration}
        language={language}
      />
    </div>
  );
}