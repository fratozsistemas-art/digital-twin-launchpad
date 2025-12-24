import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import OnboardingChecklist from '@/components/onboarding/OnboardingChecklist';
import { 
  User, 
  Building, 
  Globe2, 
  Bell, 
  Save,
  CheckCircle
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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function Profile({ language = 'pt-BR' }) {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const content = {
    'pt-BR': {
      title: 'Perfil e Preferências',
      subtitle: 'Personalize sua experiência',
      sections: {
        basic: 'Informações Básicas',
        interests: 'Interesses',
        notifications: 'Notificações'
      },
      fields: {
        company: 'Empresa',
        industry: 'Indústria',
        role: 'Função',
        interests: 'Tópicos de Interesse',
        regions: 'Regiões de Interesse',
        language: 'Idioma Preferido',
        weeklyDigest: 'Resumo Semanal',
        trendingAlerts: 'Alertas de Tendências',
        newInsights: 'Novos Insights'
      },
      save: 'Salvar Alterações',
      saving: 'Salvando...',
      success: 'Perfil atualizado com sucesso!'
    },
    'en-US': {
      title: 'Profile & Preferences',
      subtitle: 'Customize your experience',
      sections: {
        basic: 'Basic Information',
        interests: 'Interests',
        notifications: 'Notifications'
      },
      fields: {
        company: 'Company',
        industry: 'Industry',
        role: 'Role',
        interests: 'Topics of Interest',
        regions: 'Regions of Interest',
        language: 'Preferred Language',
        weeklyDigest: 'Weekly Digest',
        trendingAlerts: 'Trending Alerts',
        newInsights: 'New Insights'
      },
      save: 'Save Changes',
      saving: 'Saving...',
      success: 'Profile updated successfully!'
    }
  };

  const t = content[language];

  const industries = [
    'financial_services', 'technology', 'manufacturing', 'energy', 
    'agriculture', 'pharmaceuticals', 'consulting', 'government',
    'media', 'telecommunications', 'retail', 'real_estate', 'education', 'other'
  ];

  const roles = [
    'ceo', 'cfo', 'coo', 'board_member', 'director', 'vp',
    'consultant', 'analyst', 'government_official', 'journalist', 'other'
  ];

  const topics = [
    'brics', 'global_trade', 'competitiveness', 'geopolitics',
    'emerging_markets', 'sustainability', 'economic_diplomacy',
    'financial_markets', 'supply_chains', 'energy_transition',
    'technology_policy', 'agriculture_trade'
  ];

  const regions = [
    'brazil', 'latin_america', 'north_america', 'europe',
    'china', 'asia_pacific', 'middle_east', 'africa'
  ];

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  // Fetch or create user profile
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user) return null;
      const profiles = await base44.entities.UserProfile.filter({ created_by: user.email });
      
      if (profiles.length > 0) {
        return profiles[0];
      } else {
        // Create default profile
        return await base44.entities.UserProfile.create({
          industry: 'other',
          role: 'other',
          interests: [],
          regions_of_interest: [],
          language_preference: language,
          notification_preferences: {
            weekly_digest: true,
            trending_alerts: true,
            new_insights: true
          },
          onboarding_completed: false
        });
      }
    },
    enabled: !!user
    });

    // Fetch consultations for checklist
    const { data: consultations } = useQuery({
    queryKey: ['consultations', user?.email],
    queryFn: async () => {
      if (!user) return [];
      return await base44.entities.Consultation.filter({ created_by: user.email });
    },
    enabled: !!user
    });

    // Fetch data sources for checklist
    const { data: dataSources } = useQuery({
    queryKey: ['data-sources', user?.email],
    queryFn: async () => {
      if (!user) return [];
      return await base44.entities.DataSource.filter({ created_by: user.email });
    },
    enabled: !!user
    });

    // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data) => base44.entities.UserProfile.update(userProfile.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success(t.success);
    }
  });

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (userProfile) {
      setFormData({
        company_name: userProfile.company_name || '',
        industry: userProfile.industry || 'other',
        role: userProfile.role || 'other',
        interests: userProfile.interests || [],
        regions_of_interest: userProfile.regions_of_interest || [],
        language_preference: userProfile.language_preference || language,
        notification_preferences: userProfile.notification_preferences || {
          weekly_digest: true,
          trending_alerts: true,
          new_insights: true
        }
      });
    }
  }, [userProfile, language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleRegion = (region) => {
    setFormData(prev => ({
      ...prev,
      regions_of_interest: prev.regions_of_interest.includes(region)
        ? prev.regions_of_interest.filter(r => r !== region)
        : [...prev.regions_of_interest, region]
    }));
  };

  if (isLoading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">{language === 'pt-BR' ? 'Carregando...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t.title}
          </h1>
          <p className="text-slate-400 text-lg">{t.subtitle}</p>
        </motion.div>

        {/* Onboarding Checklist */}
        {userProfile && !userProfile.onboarding_completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <OnboardingChecklist
              userProfile={userProfile}
              consultations={consultations}
              dataSources={dataSources}
              language={language}
            />
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              {t.sections.basic}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-slate-300 mb-2 block">{t.fields.company}</Label>
                <Input
                  value={formData.company_name || ''}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  placeholder={language === 'pt-BR' ? 'Sua empresa' : 'Your company'}
                />
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">{t.fields.industry}</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
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
                <Label className="text-slate-300 mb-2 block">{t.fields.role}</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
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

              <div>
                <Label className="text-slate-300 mb-2 block">{t.fields.language}</Label>
                <Select
                  value={formData.language_preference}
                  onValueChange={(value) => setFormData({ ...formData, language_preference: value })}
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
            </div>
          </motion.section>

          {/* Interests */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-cyan-400" />
              {t.sections.interests}
            </h2>

            <div className="space-y-6">
              <div>
                <Label className="text-slate-300 mb-3 block">{t.fields.interests}</Label>
                <div className="flex flex-wrap gap-2">
                  {topics.map(topic => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleInterest(topic)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                        formData.interests?.includes(topic)
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {topic.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 mb-3 block">{t.fields.regions}</Label>
                <div className="flex flex-wrap gap-2">
                  {regions.map(region => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => toggleRegion(region)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                        formData.regions_of_interest?.includes(region)
                          ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {region.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              {t.sections.notifications}
            </h2>

            <div className="space-y-4">
              {Object.entries(formData.notification_preferences || {}).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30">
                  <Label className="text-slate-300 cursor-pointer" htmlFor={key}>
                    {t.fields[key.replace(/_([a-z])/g, (g) => g[1].toUpperCase())]}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData,
                        notification_preferences: {
                          ...formData.notification_preferences,
                          [key]: checked
                        }
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </motion.section>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8"
            >
              {updateMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t.saving}
                </>
              ) : (
                <>
                  <Save className="mr-2 w-4 h-4" />
                  {t.save}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}