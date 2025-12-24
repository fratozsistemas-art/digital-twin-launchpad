import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp, Users, Lock, Crown, Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PersonaSelector({ 
  selectedPersona, 
  onPersonaChange, 
  accessLevel = 'basic',
  language = 'pt-BR' 
}) {
  const content = {
    'pt-BR': {
      label: 'Modo de Persona',
      personas: {
        professor: {
          name: 'Professor',
          description: 'Didático e acessível, com analogias e conceitos fundamentais',
          example: '"Imagine os BRICS como uma orquestra sem maestro único..."',
          tier: 'Básico'
        },
        analyst: {
          name: 'Analista',
          description: 'Técnico e denso, com dados quantitativos e policy briefs',
          example: '"A decomposição do índice CRB sugere deflação em commodities..."',
          tier: 'Executivo'
        },
        diplomat: {
          name: 'Diplomata',
          description: 'Linguagem cerimonial, foco em cooperação institucional',
          example: '"Prezado interlocutor, cabe aqui uma reflexão sobre..."',
          tier: 'Institucional'
        }
      },
      locked: 'Bloqueado - Faça upgrade',
      upgradeTo: 'Disponível no plano'
    },
    'en-US': {
      label: 'Persona Mode',
      personas: {
        professor: {
          name: 'Professor',
          description: 'Didactic and accessible, with analogies and fundamental concepts',
          example: '"Think of BRICS as an orchestra without a single conductor..."',
          tier: 'Basic'
        },
        analyst: {
          name: 'Analyst',
          description: 'Technical and dense, with quantitative data and policy briefs',
          example: '"CRB index decomposition suggests commodity deflation..."',
          tier: 'Executive'
        },
        diplomat: {
          name: 'Diplomat',
          description: 'Ceremonial language, focus on institutional cooperation',
          example: '"Dear interlocutor, a reflection is warranted here..."',
          tier: 'Institutional'
        }
      },
      locked: 'Locked - Upgrade required',
      upgradeTo: 'Available in plan'
    }
  };

  const t = content[language];

  const personaIcons = {
    professor: GraduationCap,
    analyst: TrendingUp,
    diplomat: Users
  };

  const accessLevelConfig = {
    basic: {
      available: ['professor'],
      icon: Sparkles,
      color: 'text-blue-400'
    },
    executive: {
      available: ['professor', 'analyst'],
      icon: Crown,
      color: 'text-amber-400'
    },
    institutional: {
      available: ['professor', 'analyst', 'diplomat'],
      icon: Crown,
      color: 'text-purple-400'
    }
  };

  const config = accessLevelConfig[accessLevel];
  const isPersonaAvailable = (persona) => config.available.includes(persona);

  return (
    <TooltipProvider>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <config.icon className={`w-4 h-4 ${config.color}`} />
          {t.label}
        </label>
        
        <Select value={selectedPersona} onValueChange={onPersonaChange}>
          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800">
            {Object.entries(t.personas).map(([key, persona]) => {
              const Icon = personaIcons[key];
              const available = isPersonaAvailable(key);
              
              return (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <SelectItem 
                      value={key} 
                      disabled={!available}
                      className="cursor-pointer hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-3 py-1">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          available 
                            ? 'bg-gradient-to-br from-blue-600/20 to-cyan-500/20' 
                            : 'bg-slate-800/50'
                        }`}>
                          {available ? (
                            <Icon className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={available ? 'text-white font-medium' : 'text-slate-500'}>
                              {persona.name}
                            </span>
                            {!available && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">
                                {persona.tier}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="max-w-xs bg-slate-900 border-slate-800 p-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">{persona.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {persona.tier}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {persona.description}
                      </p>
                      <div className="mt-3 p-2 rounded bg-slate-800/50 border border-slate-700">
                        <p className="text-xs text-slate-300 italic">
                          {persona.example}
                        </p>
                      </div>
                      {!available && (
                        <div className="mt-3 pt-3 border-t border-slate-800">
                          <p className="text-xs text-amber-400">
                            🔒 {t.upgradeTo} {persona.tier}
                          </p>
                        </div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </SelectContent>
        </Select>

        {/* Current Persona Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-slate-800/30 border border-slate-700"
        >
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.personas[selectedPersona].description}
          </p>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}