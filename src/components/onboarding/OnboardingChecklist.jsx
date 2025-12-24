import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function OnboardingChecklist({ userProfile, consultations, dataSources, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Complete Seu Perfil',
      subtitle: 'Realize estas ações para aproveitar ao máximo',
      items: [
        {
          id: 'profile',
          label: 'Complete seu perfil',
          check: () => userProfile?.industry && userProfile?.role,
          action: 'Editar Perfil',
          link: 'Profile'
        },
        {
          id: 'consultation',
          label: 'Faça sua primeira consulta',
          check: () => consultations?.length > 0,
          action: 'Iniciar Consulta',
          link: 'Consultation'
        },
        {
          id: 'datasource',
          label: 'Conecte uma fonte de dados',
          check: () => dataSources?.length > 0,
          action: 'Adicionar Fonte',
          link: 'DataSources'
        }
      ],
      completed: 'Tudo concluído! 🎉',
      completedDesc: 'Você completou todas as etapas iniciais.'
    },
    'en-US': {
      title: 'Complete Your Profile',
      subtitle: 'Complete these actions to get the most out of it',
      items: [
        {
          id: 'profile',
          label: 'Complete your profile',
          check: () => userProfile?.industry && userProfile?.role,
          action: 'Edit Profile',
          link: 'Profile'
        },
        {
          id: 'consultation',
          label: 'Make your first consultation',
          check: () => consultations?.length > 0,
          action: 'Start Consultation',
          link: 'Consultation'
        },
        {
          id: 'datasource',
          label: 'Connect a data source',
          check: () => dataSources?.length > 0,
          action: 'Add Source',
          link: 'DataSources'
        }
      ],
      completed: 'All done! 🎉',
      completedDesc: 'You completed all initial steps.'
    }
  };

  const t = content[language];

  const completedItems = t.items.filter(item => item.check()).length;
  const progress = (completedItems / t.items.length) * 100;
  const allCompleted = completedItems === t.items.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{t.title}</h3>
        <p className="text-sm text-slate-400">{t.subtitle}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-400">{completedItems} / {t.items.length}</span>
          <span className="text-cyan-400 font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      {allCompleted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">{t.completed}</h4>
          <p className="text-sm text-slate-400">{t.completedDesc}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {t.items.map((item, index) => {
            const isCompleted = item.check();
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  isCompleted
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600" />
                  )}
                  <span className={`font-medium ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                    {item.label}
                  </span>
                </div>
                {!isCompleted && (
                  <Link to={createPageUrl(item.link)}>
                    <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                      {item.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}