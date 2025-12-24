import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Settings,
  BarChart3,
  Globe2,
  FileText,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuickStats from '@/components/dashboard/QuickStats';
import InsightCard from '@/components/dashboard/InsightCard';
import TrendingTopicsWidget from '@/components/dashboard/TrendingTopicsWidget';
import ConsultationHistory from '@/components/dashboard/ConsultationHistory';
import PersonalizedFeed from '@/components/dashboard/PersonalizedFeed';

export default function Dashboard({ language = 'pt-BR' }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const content = {
    'pt-BR': {
      welcome: 'Bem-vindo de volta',
      subtitle: 'Seu painel estratégico personalizado',
      quickActions: 'Ações Rápidas',
      newConsultation: 'Nova Consulta',
      viewProfile: 'Ver Perfil',
      sections: {
        stats: 'Visão Geral',
        insights: 'Insights Personalizados',
        trending: 'Tópicos em Alta',
        recent: 'Consultas Recentes'
      }
    },
    'en-US': {
      welcome: 'Welcome back',
      subtitle: 'Your personalized strategic dashboard',
      quickActions: 'Quick Actions',
      newConsultation: 'New Consultation',
      viewProfile: 'View Profile',
      sections: {
        stats: 'Overview',
        insights: 'Personalized Insights',
        trending: 'Trending Topics',
        recent: 'Recent Consultations'
      }
    }
  };

  const t = content[language];

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch user profile
  const { data: userProfile } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user) return null;
      const profiles = await base44.entities.UserProfile.filter({ created_by: user.email });
      return profiles[0] || null;
    },
    enabled: !!user
  });

  // Fetch consultations
  const { data: consultations = [] } = useQuery({
    queryKey: ['consultations', user?.email],
    queryFn: async () => {
      if (!user) return [];
      return await base44.entities.Consultation.filter(
        { created_by: user.email },
        '-created_date',
        10
      );
    },
    enabled: !!user
  });

  // Fetch personalized insights
  const { data: insights = [] } = useQuery({
    queryKey: ['insights', userProfile?.interests, userProfile?.industry],
    queryFn: async () => {
      if (!userProfile) return [];
      
      // Filter insights by user interests and industry
      const allInsights = await base44.entities.InsightFeed.list('-published_date', 20);
      
      return allInsights.filter(insight => {
        const matchesLanguage = insight.language === language;
        const matchesInterests = userProfile.interests?.some(interest => 
          insight.category === interest
        );
        const matchesIndustry = insight.industries?.includes(userProfile.industry);
        
        return matchesLanguage && (matchesInterests || matchesIndustry);
      }).slice(0, 6);
    },
    enabled: !!userProfile
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">
            {language === 'pt-BR' ? 'Carregando...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {t.welcome}, {user?.full_name?.split(' ')[0] || 'Executive'}
              </h1>
              <p className="text-slate-400 text-lg">{t.subtitle}</p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link to={createPageUrl('Consultation')}>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                  <MessageSquare className="mr-2 w-4 h-4" />
                  {t.newConsultation}
                </Button>
              </Link>
              <Link to={createPageUrl('Profile')}>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  <Settings className="mr-2 w-4 h-4" />
                  {t.viewProfile}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <QuickStats consultations={consultations} language={language} />
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Insights Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personalized Insights */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  {t.sections.insights}
                </h2>
              </div>
              <PersonalizedFeed insights={insights} language={language} userProfile={userProfile} />
            </section>

            {/* Recent Consultations */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  {t.sections.recent}
                </h2>
                <Link to={createPageUrl('ConsultationHistory')}>
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                    {language === 'pt-BR' ? 'Ver Todas' : 'View All'}
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <ConsultationHistory consultations={consultations.slice(0, 5)} language={language} />
            </section>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Trending Topics */}
            <section>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                {t.sections.trending}
              </h2>
              <TrendingTopicsWidget consultations={consultations} language={language} />
            </section>

            {/* User Profile Summary */}
            {userProfile && (
              <section className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  {language === 'pt-BR' ? 'Seu Perfil' : 'Your Profile'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      {language === 'pt-BR' ? 'Indústria' : 'Industry'}
                    </p>
                    <p className="text-sm text-slate-300 capitalize">
                      {userProfile.industry?.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      {language === 'pt-BR' ? 'Função' : 'Role'}
                    </p>
                    <p className="text-sm text-slate-300 capitalize">
                      {userProfile.role?.replace(/_/g, ' ')}
                    </p>
                  </div>
                  {userProfile.interests && userProfile.interests.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 mb-2">
                        {language === 'pt-BR' ? 'Interesses' : 'Interests'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.interests.slice(0, 4).map((interest, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs capitalize"
                          >
                            {interest.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}