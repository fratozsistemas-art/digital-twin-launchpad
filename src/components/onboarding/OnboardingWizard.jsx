import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  MessageSquare, 
  Database, 
  Shield,
  Globe,
  User,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function OnboardingWizard({ onComplete, initialLanguage = 'pt-BR' }) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    language_preference: initialLanguage,
    preferred_persona: 'professor',
    industry: '',
    role: '',
    interests: []
  });

  const content = {
    'pt-BR': {
      welcome: {
        title: 'Bem-vindo ao Digital Twin',
        subtitle: 'Marcos Prado Troyjo',
        description: 'Vamos configurar sua experiência em poucos passos simples.',
        start: 'Começar'
      },
      features: {
        title: 'Recursos Principais',
        subtitle: 'Conheça o que você pode fazer',
        items: [
          {
            icon: MessageSquare,
            title: 'Consultas Estratégicas',
            description: 'Converse com o Digital Twin e obtenha análises geopolíticas e econômicas personalizadas.'
          },
          {
            icon: Database,
            title: 'Fontes de Dados',
            description: 'Conecte suas próprias fontes de dados para análises ainda mais relevantes.'
          },
          {
            icon: Shield,
            title: 'Governança da IA',
            description: 'Controle total sobre parâmetros CRV, auditoria e configurações de qualidade.'
          }
        ]
      },
      preferences: {
        title: 'Configure Suas Preferências',
        subtitle: 'Personalize sua experiência',
        language: 'Idioma Preferido',
        persona: 'Persona Padrão',
        industry: 'Indústria',
        role: 'Função',
        personas: {
          professor: 'Professor - Didático e explicativo',
          analyst: 'Analista - Técnico e quantitativo',
          diplomat: 'Diplomata - Formal e protocolar'
        }
      },
      interests: {
        title: 'Seus Interesses',
        subtitle: 'Selecione os tópicos que mais te interessam',
        topics: {
          brics: 'BRICS',
          global_trade: 'Comércio Global',
          competitiveness: 'Competitividade',
          geopolitics: 'Geopolítica',
          emerging_markets: 'Mercados Emergentes',
          sustainability: 'Sustentabilidade',
          economic_diplomacy: 'Diplomacia Econômica',
          financial_markets: 'Mercados Financeiros'
        }
      },
      complete: {
        title: 'Tudo Pronto!',
        subtitle: 'Sua conta está configurada',
        description: 'Você pode começar a usar o Digital Twin agora. Explore os recursos e consulte quando precisar.',
        finish: 'Começar a Usar'
      },
      back: 'Voltar',
      next: 'Próximo',
      skip: 'Pular'
    },
    'en-US': {
      welcome: {
        title: 'Welcome to Digital Twin',
        subtitle: 'Marcos Prado Troyjo',
        description: 'Let\'s set up your experience in a few simple steps.',
        start: 'Get Started'
      },
      features: {
        title: 'Main Features',
        subtitle: 'Learn what you can do',
        items: [
          {
            icon: MessageSquare,
            title: 'Strategic Consultations',
            description: 'Chat with the Digital Twin and get personalized geopolitical and economic analyses.'
          },
          {
            icon: Database,
            title: 'Data Sources',
            description: 'Connect your own data sources for even more relevant analyses.'
          },
          {
            icon: Shield,
            title: 'AI Governance',
            description: 'Full control over CRV parameters, audit trail, and quality settings.'
          }
        ]
      },
      preferences: {
        title: 'Set Your Preferences',
        subtitle: 'Customize your experience',
        language: 'Preferred Language',
        persona: 'Default Persona',
        industry: 'Industry',
        role: 'Role',
        personas: {
          professor: 'Professor - Didactic and explanatory',
          analyst: 'Analyst - Technical and quantitative',
          diplomat: 'Diplomat - Formal and protocolary'
        }
      },
      interests: {
        title: 'Your Interests',
        subtitle: 'Select the topics that interest you most',
        topics: {
          brics: 'BRICS',
          global_trade: 'Global Trade',
          competitiveness: 'Competitiveness',
          geopolitics: 'Geopolitics',
          emerging_markets: 'Emerging Markets',
          sustainability: 'Sustainability',
          economic_diplomacy: 'Economic Diplomacy',
          financial_markets: 'Financial Markets'
        }
      },
      complete: {
        title: 'All Set!',
        subtitle: 'Your account is configured',
        description: 'You can start using the Digital Twin now. Explore the features and consult whenever you need.',
        finish: 'Start Using'
      },
      back: 'Back',
      next: 'Next',
      skip: 'Skip'
    }
  };

  const t = content[preferences.language_preference];

  const steps = [
    'welcome',
    'features',
    'preferences',
    'interests',
    'complete'
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    onComplete(preferences);
  };

  const toggleInterest = (interest) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const industries = [
    'financial_services', 'technology', 'manufacturing', 'energy',
    'agriculture', 'consulting', 'government', 'media', 'other'
  ];

  const roles = [
    'ceo', 'cfo', 'coo', 'board_member', 'director', 'vp',
    'consultant', 'analyst', 'government_official', 'other'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="h-1 bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {/* Welcome Step */}
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {t.welcome.title}
                </h1>
                <p className="text-2xl text-cyan-400 mb-6">
                  {t.welcome.subtitle}
                </p>
                <p className="text-lg text-slate-400 mb-8">
                  {t.welcome.description}
                </p>
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8"
                >
                  {t.welcome.start}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {/* Features Step */}
            {step === 1 && (
              <motion.div
                key="features"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                  {t.features.title}
                </h2>
                <p className="text-slate-400 mb-8 text-center">
                  {t.features.subtitle}
                </p>
                <div className="space-y-6">
                  {t.features.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-6 rounded-xl bg-slate-800/50 border border-slate-700"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Preferences Step */}
            {step === 2 && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                  {t.preferences.title}
                </h2>
                <p className="text-slate-400 mb-8 text-center">
                  {t.preferences.subtitle}
                </p>
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-slate-300 mb-2 block">{t.preferences.language}</Label>
                      <Select
                        value={preferences.language_preference}
                        onValueChange={(value) => setPreferences({ ...preferences, language_preference: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (BR)</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-300 mb-2 block">{t.preferences.persona}</Label>
                      <Select
                        value={preferences.preferred_persona}
                        onValueChange={(value) => setPreferences({ ...preferences, preferred_persona: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(t.preferences.personas).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-300 mb-2 block">{t.preferences.industry}</Label>
                      <Select
                        value={preferences.industry}
                        onValueChange={(value) => setPreferences({ ...preferences, industry: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map(ind => (
                            <SelectItem key={ind} value={ind} className="capitalize">
                              {ind.replace(/_/g, ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-300 mb-2 block">{t.preferences.role}</Label>
                      <Select
                        value={preferences.role}
                        onValueChange={(value) => setPreferences({ ...preferences, role: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role} value={role} className="capitalize">
                              {role.replace(/_/g, ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Interests Step */}
            {step === 3 && (
              <motion.div
                key="interests"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                  {t.interests.title}
                </h2>
                <p className="text-slate-400 mb-8 text-center">
                  {t.interests.subtitle}
                </p>
                <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
                  {Object.entries(t.interests.topics).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => toggleInterest(key)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        preferences.interests.includes(key)
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Complete Step */}
            {step === 4 && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {t.complete.title}
                </h2>
                <p className="text-xl text-green-400 mb-4">
                  {t.complete.subtitle}
                </p>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                  {t.complete.description}
                </p>
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 px-8"
                >
                  {t.complete.finish}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step > 0 && step < steps.length - 1 && (
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-800">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                {t.back}
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              >
                {t.next}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}