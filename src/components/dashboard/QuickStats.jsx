import React from 'react';
import { MessageSquare, Clock, TrendingUp, Calendar } from 'lucide-react';
import { format, subDays, isAfter } from 'date-fns';

export default function QuickStats({ consultations = [], language }) {
  const calculateStats = () => {
    const now = new Date();
    const lastWeek = subDays(now, 7);
    const lastMonth = subDays(now, 30);

    const weeklyConsultations = consultations.filter(c => 
      isAfter(new Date(c.created_date), lastWeek)
    ).length;

    const monthlyConsultations = consultations.filter(c => 
      isAfter(new Date(c.created_date), lastMonth)
    ).length;

    const totalMinutes = consultations.reduce((sum, c) => 
      sum + (c.duration_minutes || 0), 0
    );

    const avgSatisfaction = consultations.filter(c => c.satisfaction_rating).length > 0
      ? (consultations.reduce((sum, c) => sum + (c.satisfaction_rating || 0), 0) / 
         consultations.filter(c => c.satisfaction_rating).length).toFixed(1)
      : 'N/A';

    return {
      total: consultations.length,
      weekly: weeklyConsultations,
      monthly: monthlyConsultations,
      totalMinutes,
      avgSatisfaction
    };
  };

  const stats = calculateStats();

  const content = {
    'pt-BR': {
      stats: [
        {
          icon: MessageSquare,
          label: 'Consultas Este Mês',
          value: stats.monthly,
          color: 'from-blue-600 to-cyan-500'
        },
        {
          icon: Calendar,
          label: 'Esta Semana',
          value: stats.weekly,
          color: 'from-purple-600 to-pink-500'
        },
        {
          icon: Clock,
          label: 'Tempo Total (min)',
          value: stats.totalMinutes,
          color: 'from-amber-600 to-orange-500'
        },
        {
          icon: TrendingUp,
          label: 'Satisfação Média',
          value: stats.avgSatisfaction,
          suffix: stats.avgSatisfaction !== 'N/A' ? '/5' : '',
          color: 'from-green-600 to-emerald-500'
        }
      ]
    },
    'en-US': {
      stats: [
        {
          icon: MessageSquare,
          label: 'Consultations This Month',
          value: stats.monthly,
          color: 'from-blue-600 to-cyan-500'
        },
        {
          icon: Calendar,
          label: 'This Week',
          value: stats.weekly,
          color: 'from-purple-600 to-pink-500'
        },
        {
          icon: Clock,
          label: 'Total Time (min)',
          value: stats.totalMinutes,
          color: 'from-amber-600 to-orange-500'
        },
        {
          icon: TrendingUp,
          label: 'Avg Satisfaction',
          value: stats.avgSatisfaction,
          suffix: stats.avgSatisfaction !== 'N/A' ? '/5' : '',
          color: 'from-green-600 to-emerald-500'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {t.stats.map((stat, index) => (
        <div
          key={index}
          className="relative p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}