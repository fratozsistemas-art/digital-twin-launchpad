import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  Globe,
  Award,
  Building
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AchievementTimeline({ achievements, language = 'pt-BR' }) {
  const content = {
    'pt-BR': {
      title: 'Trajetória Profissional e Conquistas',
      subtitle: 'Prêmios, condecorações e posições relevantes',
      noData: 'Nenhuma conquista registrada',
      types: {
        award: 'Prêmio',
        decoration: 'Condecoração',
        academic_position: 'Posição Acadêmica',
        government_position: 'Cargo Governamental',
        private_sector_position: 'Setor Privado',
        board_membership: 'Conselho',
        publication: 'Publicação',
        keynote: 'Palestra Principal'
      }
    },
    'en-US': {
      title: 'Professional Journey and Achievements',
      subtitle: 'Awards, decorations, and relevant positions',
      noData: 'No achievements recorded',
      types: {
        award: 'Award',
        decoration: 'Decoration',
        academic_position: 'Academic Position',
        government_position: 'Government Position',
        private_sector_position: 'Private Sector',
        board_membership: 'Board',
        publication: 'Publication',
        keynote: 'Keynote'
      }
    }
  };

  const t = content[language];

  const iconMap = {
    trophy: Trophy,
    medal: Medal,
    briefcase: Briefcase,
    book: BookOpen,
    graduation: GraduationCap,
    globe: Globe
  };

  const typeColors = {
    award: 'from-amber-600 to-yellow-500',
    decoration: 'from-purple-600 to-pink-500',
    academic_position: 'from-blue-600 to-cyan-500',
    government_position: 'from-red-600 to-orange-500',
    private_sector_position: 'from-green-600 to-emerald-500',
    board_membership: 'from-indigo-600 to-purple-500',
    publication: 'from-cyan-600 to-blue-500',
    keynote: 'from-pink-600 to-rose-500'
  };

  // Sort achievements by year descending
  const sortedAchievements = [...(achievements || [])].sort((a, b) => b.year - a.year);

  if (sortedAchievements.length === 0) {
    return (
      <div className="text-center py-12">
        <Award className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">{t.noData}</p>
      </div>
    );
  }

  // Group by decade for visual separation
  const decades = {};
  sortedAchievements.forEach(achievement => {
    const decade = Math.floor(achievement.year / 10) * 10;
    if (!decades[decade]) {
      decades[decade] = [];
    }
    decades[decade].push(achievement);
  });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400">{t.subtitle}</p>
      </div>

      <div className="relative">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 transform -translate-x-1/2 hidden lg:block" />

        {/* Achievements by Decade */}
        {Object.keys(decades).sort((a, b) => b - a).map((decade, decadeIndex) => (
          <div key={decade} className="mb-16">
            {/* Decade Header */}
            <div className="relative mb-8">
              <div className="flex items-center justify-center mb-8">
                <div className="px-6 py-3 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {decade}s
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-6">
              {decades[decade].map((achievement, index) => {
                const Icon = iconMap[achievement.icon_type] || Trophy;
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center gap-6 ${
                      isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } flex-col lg:justify-between`}
                  >
                    {/* Content Card */}
                    <div className={`w-full lg:w-[45%] ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group">
                        {/* Header */}
                        <div className={`flex items-start gap-3 mb-3 ${isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex-row`}>
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeColors[achievement.type]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'} text-left`}>
                            <Badge className="mb-2" variant="outline">
                              {achievement.year}
                            </Badge>
                            <h3 className="text-lg font-bold text-white mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-cyan-400 font-medium">
                              {achievement.organization}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        {achievement.description && (
                          <p className="text-slate-400 text-sm leading-relaxed mb-3">
                            {achievement.description}
                          </p>
                        )}

                        {/* Footer */}
                        <div className={`flex items-center gap-3 flex-wrap ${isLeft ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                          <Badge className={`bg-gradient-to-r ${typeColors[achievement.type]} text-white border-0`}>
                            {t.types[achievement.type]}
                          </Badge>
                          {achievement.location && (
                            <Badge variant="outline" className="text-xs">
                              <Globe className="w-3 h-3 mr-1" />
                              {achievement.location}
                            </Badge>
                          )}
                          {achievement.significance && (
                            <Badge variant="outline" className="text-xs capitalize">
                              {achievement.significance}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Central Dot */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${typeColors[achievement.type]} shadow-lg`} />
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden lg:block w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}