import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function IntegrationSetup({ isOpen, onClose, onSave, integration, language = 'pt-BR' }) {
  const [formData, setFormData] = useState(integration || {
    name: '',
    type: 'government_data',
    provider: 'ibge',
    api_key: '',
    config: {
      refresh_interval_minutes: 60
    }
  });

  const content = {
    'pt-BR': {
      title: integration ? 'Editar Integração' : 'Nova Integração',
      subtitle: 'Configure a conexão com fonte de dados externa',
      name: 'Nome da Integração',
      type: 'Tipo',
      provider: 'Provedor',
      apiKey: 'API Key (opcional)',
      refreshInterval: 'Intervalo de Atualização (minutos)',
      save: 'Salvar',
      cancel: 'Cancelar',
      types: {
        government_data: 'Dados Governamentais',
        financial_news: 'Notícias Financeiras',
        market_data: 'Dados de Mercado',
        economic_indicators: 'Indicadores Econômicos',
        sentiment_analysis: 'Análise de Sentimento',
        webhook: 'Webhook'
      },
      providers: {
        ibge: 'IBGE (Brasil)',
        banco_central_brasil: 'Banco Central do Brasil',
        alpha_vantage: 'Alpha Vantage',
        newsapi: 'NewsAPI',
        world_bank: 'World Bank',
        imf: 'FMI (IMF)',
        fred: 'FRED (Federal Reserve)',
        custom_webhook: 'Webhook Personalizado'
      },
      info: {
        ibge: 'Dados estatísticos e econômicos do Brasil - API gratuita',
        banco_central_brasil: 'Taxas de câmbio, SELIC, inflação - API gratuita',
        alpha_vantage: 'Cotações de ações e forex - Requer API key gratuita',
        newsapi: 'Notícias globais - Requer API key gratuita',
        world_bank: 'Indicadores econômicos globais - API gratuita',
        imf: 'Dados econômicos do FMI - API gratuita',
        fred: 'Dados econômicos dos EUA - API gratuita',
        custom_webhook: 'Configure seu próprio webhook'
      }
    },
    'en-US': {
      title: integration ? 'Edit Integration' : 'New Integration',
      subtitle: 'Configure connection to external data source',
      name: 'Integration Name',
      type: 'Type',
      provider: 'Provider',
      apiKey: 'API Key (optional)',
      refreshInterval: 'Refresh Interval (minutes)',
      save: 'Save',
      cancel: 'Cancel',
      types: {
        government_data: 'Government Data',
        financial_news: 'Financial News',
        market_data: 'Market Data',
        economic_indicators: 'Economic Indicators',
        sentiment_analysis: 'Sentiment Analysis',
        webhook: 'Webhook'
      },
      providers: {
        ibge: 'IBGE (Brazil)',
        banco_central_brasil: 'Central Bank of Brazil',
        alpha_vantage: 'Alpha Vantage',
        newsapi: 'NewsAPI',
        world_bank: 'World Bank',
        imf: 'IMF',
        fred: 'FRED (Federal Reserve)',
        custom_webhook: 'Custom Webhook'
      },
      info: {
        ibge: 'Brazilian statistical and economic data - Free API',
        banco_central_brasil: 'Exchange rates, SELIC, inflation - Free API',
        alpha_vantage: 'Stock quotes and forex - Requires free API key',
        newsapi: 'Global news - Requires free API key',
        world_bank: 'Global economic indicators - Free API',
        imf: 'IMF economic data - Free API',
        fred: 'US economic data - Free API',
        custom_webhook: 'Configure your own webhook'
      }
    }
  };

  const t = content[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">{t.title}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {t.subtitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-slate-300">{t.name}</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-800/50 border-slate-700 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-slate-300">{t.type}</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.types).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-slate-300">{t.provider}</Label>
            <Select
              value={formData.provider}
              onValueChange={(value) => setFormData({ ...formData, provider: value })}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.providers).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {t.info[formData.provider] && (
              <div className="flex gap-2 mt-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-300">{t.info[formData.provider]}</p>
              </div>
            )}
          </div>

          <div>
            <Label className="text-slate-300">{t.apiKey}</Label>
            <Input
              type="password"
              value={formData.api_key || ''}
              onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
              className="bg-slate-800/50 border-slate-700 text-white"
              placeholder="Opcional para APIs gratuitas"
            />
          </div>

          <div>
            <Label className="text-slate-300">{t.refreshInterval}</Label>
            <Input
              type="number"
              value={formData.config?.refresh_interval_minutes || 60}
              onChange={(e) => setFormData({
                ...formData,
                config: { ...formData.config, refresh_interval_minutes: parseInt(e.target.value) }
              })}
              className="bg-slate-800/50 border-slate-700 text-white"
              min="5"
              step="5"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            >
              <Save className="w-4 h-4 mr-2" />
              {t.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}