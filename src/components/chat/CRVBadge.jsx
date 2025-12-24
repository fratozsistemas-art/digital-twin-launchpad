import React from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CRVBadge({ crvScore, language = 'pt-BR' }) {
  if (!crvScore) return null;

  const { confidence, risk, value } = crvScore;
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round((confidence * 0.5 + (100 - risk) * 0.3 + value * 0.2));
  
  // Determine color and icon based on confidence level
  const getScoreConfig = (score) => {
    if (score >= 85) {
      return {
        color: 'from-green-600 to-emerald-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        textColor: 'text-green-400',
        icon: CheckCircle,
        label: language === 'pt-BR' ? 'Alta Confiança' : 'High Confidence'
      };
    } else if (score >= 70) {
      return {
        color: 'from-blue-600 to-cyan-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        textColor: 'text-blue-400',
        icon: Shield,
        label: language === 'pt-BR' ? 'Confiança Boa' : 'Good Confidence'
      };
    } else if (score >= 50) {
      return {
        color: 'from-amber-600 to-orange-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        textColor: 'text-amber-400',
        icon: TrendingUp,
        label: language === 'pt-BR' ? 'Confiança Média' : 'Medium Confidence'
      };
    } else {
      return {
        color: 'from-red-600 to-rose-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        textColor: 'text-red-400',
        icon: AlertTriangle,
        label: language === 'pt-BR' ? 'Confiança Baixa' : 'Low Confidence'
      };
    }
  };

  const config = getScoreConfig(overallScore);
  const Icon = config.icon;

  const content = {
    'pt-BR': {
      confidence: 'Confiança',
      risk: 'Risco',
      value: 'Valor Estratégico',
      overall: 'Score Geral',
      tooltip: 'Sistema CRV de Validação'
    },
    'en-US': {
      confidence: 'Confidence',
      risk: 'Risk',
      value: 'Strategic Value',
      overall: 'Overall Score',
      tooltip: 'CRV Validation System'
    }
  };

  const t = content[language];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.bgColor} ${config.borderColor} cursor-help`}>
            <Icon className={`w-4 h-4 ${config.textColor}`} />
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${config.textColor}`}>
                {overallScore}
              </span>
              <div className="h-3 w-px bg-slate-700" />
              <span className="text-xs text-slate-400">{config.label}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-slate-900 border-slate-800 p-4 max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-semibold text-white">{t.tooltip}</span>
              <span className={`font-bold ${config.textColor}`}>{overallScore}/100</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">{t.confidence}:</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${config.color} transition-all`}
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-white font-medium w-8 text-right">{confidence}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">{t.risk}:</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all`}
                      style={{ width: `${risk}%` }}
                    />
                  </div>
                  <span className="text-xs text-white font-medium w-8 text-right">{risk}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">{t.value}:</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${config.color} transition-all`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-xs text-white font-medium w-8 text-right">{value}</span>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}