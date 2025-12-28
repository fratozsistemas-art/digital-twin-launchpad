import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Zap, CheckCircle2, ExternalLink, Copy, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function AgentChannels({ language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Canais de Comunicação do Digital Twin',
      subtitle: 'Acesse o Troyjo Twin em múltiplas plataformas com motor adaptativo',
      whatsapp: {
        title: 'WhatsApp Agent',
        description: 'Consultas estratégicas via WhatsApp com personas adaptativas',
        features: [
          'Respostas otimizadas para mobile',
          'Integração com PersonaMemory',
          'Histórico persistente de conversas',
          'Notificações proativas de insights',
          'Suporte multilíngue (PT/EN)'
        ],
        connect: 'Conectar WhatsApp',
        status: 'Ativo'
      },
      teams: {
        title: 'Microsoft Teams Bot',
        description: 'Assistente estratégico integrado ao ambiente corporativo',
        features: [
          'Menções em canais (@TroyjoTwin)',
          'Mensagens diretas para consultas detalhadas',
          'Adaptive Cards com dados interativos',
          'Integração com arquivos e compartilhamentos',
          'Respostas contextuais por tipo de canal'
        ],
        connect: 'Adicionar ao Teams',
        status: 'Beta'
      },
      slack: {
        title: 'Slack Assistant',
        description: 'Integração perfeita com workflows do Slack',
        features: [
          'Slash commands (/troyjo)',
          'Respostas em threads com contexto',
          'Insights agendados em canais',
          'Adaptação de persona por canal',
          'Visualizações e links enriquecidos'
        ],
        connect: 'Instalar no Slack',
        status: 'Planejado'
      },
      common: {
        features: 'Recursos',
        howtouse: 'Como Usar',
        setup: 'Configuração',
        copy: 'Copiar Link',
        copied: 'Copiado!',
        capabilities: 'Capacidades'
      }
    },
    'en-US': {
      title: 'Digital Twin Communication Channels',
      subtitle: 'Access Troyjo Twin on multiple platforms with adaptive engine',
      whatsapp: {
        title: 'WhatsApp Agent',
        description: 'Strategic consultations via WhatsApp with adaptive personas',
        features: [
          'Mobile-optimized responses',
          'PersonaMemory integration',
          'Persistent conversation history',
          'Proactive insight notifications',
          'Multilingual support (PT/EN)'
        ],
        connect: 'Connect WhatsApp',
        status: 'Active'
      },
      teams: {
        title: 'Microsoft Teams Bot',
        description: 'Strategic assistant integrated into corporate environment',
        features: [
          'Channel mentions (@TroyjoTwin)',
          'Direct messages for detailed queries',
          'Adaptive Cards with interactive data',
          'File and sharing integration',
          'Contextual responses by channel type'
        ],
        connect: 'Add to Teams',
        status: 'Beta'
      },
      slack: {
        title: 'Slack Assistant',
        description: 'Seamless integration with Slack workflows',
        features: [
          'Slash commands (/troyjo)',
          'Thread replies with context',
          'Scheduled insights in channels',
          'Persona adaptation per channel',
          'Rich visualizations and links'
        ],
        connect: 'Install on Slack',
        status: 'Planned'
      },
      common: {
        features: 'Features',
        howtouse: 'How to Use',
        setup: 'Setup',
        copy: 'Copy Link',
        copied: 'Copied!',
        capabilities: 'Capabilities'
      }
    }
  };

  const t = content[language];

  const channels = [
    {
      id: 'whatsapp',
      icon: MessageSquare,
      color: 'from-green-600 to-emerald-500',
      data: t.whatsapp,
      agentName: 'whatsapp_consultant'
    },
    {
      id: 'teams',
      icon: Users,
      color: 'from-blue-600 to-indigo-500',
      data: t.teams,
      agentName: 'teams_bot'
    },
    {
      id: 'slack',
      icon: Zap,
      color: 'from-purple-600 to-pink-500',
      data: t.slack,
      agentName: 'slack_assistant'
    }
  ];

  const handleConnect = async (agentName, channelId) => {
    try {
      if (channelId === 'whatsapp') {
        const url = base44.agents.getWhatsAppConnectURL(agentName);
        window.open(url, '_blank');
      } else {
        toast.info(language === 'pt-BR' ? 'Funcionalidade em desenvolvimento' : 'Feature under development');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const copySetupInstructions = (channelId) => {
    const instructions = {
      whatsapp: 'Click "Connect WhatsApp" button and scan QR code to start chatting with Troyjo Twin.',
      teams: 'Add TroyjoTwin bot to your Teams workspace, then mention @TroyjoTwin in any channel or send direct messages.',
      slack: 'Install Slack app, then use /troyjo command or mention @TroyjoTwin in channels.'
    };
    
    navigator.clipboard.writeText(instructions[channelId]);
    toast.success(t.common.copied);
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Channel Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${channel.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`} />
              
              <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center`}>
                    <channel.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    channel.data.status === 'Ativo' || channel.data.status === 'Active'
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                      : channel.data.status === 'Beta'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'bg-slate-600/20 text-slate-400 border border-slate-500/30'
                  }`}>
                    {channel.data.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {channel.data.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {channel.data.description}
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.common.features}
                  </h4>
                  <ul className="space-y-2">
                    {channel.data.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleConnect(channel.agentName, channel.id)}
                    className={`flex-1 bg-gradient-to-r ${channel.color} hover:opacity-90 transition-opacity`}
                    disabled={channel.data.status === 'Planejado' || channel.data.status === 'Planned'}
                  >
                    {channel.data.connect}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copySetupInstructions(channel.id)}
                    className="border-slate-700"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/50 border border-slate-800"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Settings className="w-6 h-6 text-cyan-400" />
            {language === 'pt-BR' ? 'Arquitetura Compartilhada' : 'Shared Architecture'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'pt-BR' ? 'Motor Adaptativo' : 'Adaptive Engine'}
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{language === 'pt-BR' ? 'Persona Memory sincronizada entre canais' : 'Persona Memory synced across channels'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{language === 'pt-BR' ? 'Ajuste dinâmico de profundidade por plataforma' : 'Dynamic depth adjustment per platform'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{language === 'pt-BR' ? 'Contexto preservado em sessões cross-channel' : 'Context preserved in cross-channel sessions'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'pt-BR' ? 'Base de Conhecimento' : 'Knowledge Base'}
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{language === 'pt-BR' ? 'Acesso unificado a neologismos e conceitos' : 'Unified access to neologisms and concepts'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{language === 'pt-BR' ? 'Data sources personalizadas por usuário' : 'User-specific data sources'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>{language === 'pt-BR' ? 'Audit trail completo em todas as plataformas' : 'Complete audit trail across all platforms'}</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}