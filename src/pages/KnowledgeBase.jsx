import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import NeologismShowcase from '@/components/neologisms/NeologismShowcase';
import ConceptEvolutionTimeline from '@/components/neologisms/ConceptEvolutionTimeline';
import AchievementTimeline from '@/components/achievements/AchievementTimeline';

export default function KnowledgeBase({ language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Base de Conhecimento',
      subtitle: 'Neologismos, Evolução Conceitual e Trajetória Profissional',
      tabs: {
        neologisms: 'Neologismos',
        evolution: 'Evolução',
        achievements: 'Trajetória'
      }
    },
    'en-US': {
      title: 'Knowledge Base',
      subtitle: 'Neologisms, Concept Evolution, and Professional Journey',
      tabs: {
        neologisms: 'Neologisms',
        evolution: 'Evolution',
        achievements: 'Journey'
      }
    }
  };

  const t = content[language];

  // Fetch user
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  // Fetch neologisms
  const { data: neologisms, isLoading: loadingNeologisms } = useQuery({
    queryKey: ['neologisms'],
    queryFn: async () => {
      return await base44.entities.Neologism.list('-relevance_score');
    },
  });

  // Fetch achievements
  const { data: achievements, isLoading: loadingAchievements } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      return await base44.entities.Achievement.list('-year');
    },
  });

  const isLoading = loadingNeologisms || loadingAchievements;

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
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="neologisms" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border border-slate-800 mb-8">
              <TabsTrigger value="neologisms" className="gap-2">
                <Sparkles className="w-4 h-4" />
                {t.tabs.neologisms}
              </TabsTrigger>
              <TabsTrigger value="evolution" className="gap-2">
                <BookOpen className="w-4 h-4" />
                {t.tabs.evolution}
              </TabsTrigger>
              <TabsTrigger value="achievements" className="gap-2">
                <Award className="w-4 h-4" />
                {t.tabs.achievements}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="neologisms" className="mt-0">
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  </div>
                ) : (
                  <NeologismShowcase neologisms={neologisms} language={language} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="evolution" className="mt-0">
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  </div>
                ) : (
                  <ConceptEvolutionTimeline neologisms={neologisms} language={language} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-0">
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  </div>
                ) : (
                  <AchievementTimeline achievements={achievements} language={language} />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}