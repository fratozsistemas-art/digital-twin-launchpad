import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, TrendingUp, Save, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

export default function CRVSettings({ settings, onSave, language = 'pt-BR' }) {
  const [localSettings, setLocalSettings] = useState(settings || {
    crv_thresholds: {
      confidence_min: 70,
      risk_max: 40,
      value_min: 60
    },
    alert_preferences: {
      low_confidence_alert: true,
      high_risk_alert: true,
      low_value_alert: false,
      paradox_detected_alert: true
    }
  });

  const content = {
    'pt-BR': {
      title: 'Parâmetros CRV Scoring',
      subtitle: 'Configure limites e alertas para Confiança, Risco e Valor',
      thresholds: {
        title: 'Limites de Qualidade',
        confidence: 'Confiança Mínima',
        risk: 'Risco Máximo',
        value: 'Valor Estratégico Mínimo'
      },
      alerts: {
        title: 'Alertas Automáticos',
        low_confidence: 'Alertar em Baixa Confiança',
        high_risk: 'Alertar em Alto Risco',
        low_value: 'Alertar em Baixo Valor',
        paradox_detected: 'Alertar em Detecção de Paradoxo'
      },
      save: 'Salvar Configurações',
      info: 'Estes parâmetros controlam quando o sistema emite alertas visuais durante consultas.'
    },
    'en-US': {
      title: 'CRV Scoring Parameters',
      subtitle: 'Configure thresholds and alerts for Confidence, Risk, and Value',
      thresholds: {
        title: 'Quality Thresholds',
        confidence: 'Minimum Confidence',
        risk: 'Maximum Risk',
        value: 'Minimum Strategic Value'
      },
      alerts: {
        title: 'Automatic Alerts',
        low_confidence: 'Alert on Low Confidence',
        high_risk: 'Alert on High Risk',
        low_value: 'Alert on Low Value',
        paradox_detected: 'Alert on Paradox Detection'
      },
      save: 'Save Settings',
      info: 'These parameters control when the system issues visual alerts during consultations.'
    }
  };

  const t = content[language];

  const handleSave = () => {
    onSave(localSettings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{t.title}</h3>
        <p className="text-sm text-slate-400">{t.subtitle}</p>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex gap-3">
        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-300">{t.info}</p>
      </div>

      {/* Thresholds */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 space-y-6">
        <h4 className="text-lg font-semibold text-white">{t.thresholds.title}</h4>

        {/* Confidence */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-slate-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              {t.thresholds.confidence}
            </Label>
            <span className="text-white font-semibold">
              {localSettings.crv_thresholds.confidence_min}
            </span>
          </div>
          <Slider
            value={[localSettings.crv_thresholds.confidence_min]}
            onValueChange={([value]) => 
              setLocalSettings({
                ...localSettings,
                crv_thresholds: { ...localSettings.crv_thresholds, confidence_min: value }
              })
            }
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Risk */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-slate-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              {t.thresholds.risk}
            </Label>
            <span className="text-white font-semibold">
              {localSettings.crv_thresholds.risk_max}
            </span>
          </div>
          <Slider
            value={[localSettings.crv_thresholds.risk_max]}
            onValueChange={([value]) => 
              setLocalSettings({
                ...localSettings,
                crv_thresholds: { ...localSettings.crv_thresholds, risk_max: value }
              })
            }
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Value */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-slate-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              {t.thresholds.value}
            </Label>
            <span className="text-white font-semibold">
              {localSettings.crv_thresholds.value_min}
            </span>
          </div>
          <Slider
            value={[localSettings.crv_thresholds.value_min]}
            onValueChange={([value]) => 
              setLocalSettings({
                ...localSettings,
                crv_thresholds: { ...localSettings.crv_thresholds, value_min: value }
              })
            }
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>
      </div>

      {/* Alert Preferences */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 space-y-4">
        <h4 className="text-lg font-semibold text-white">{t.alerts.title}</h4>

        {Object.entries(t.alerts).filter(([key]) => key !== 'title').map(([key, label]) => (
          <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50">
            <Label className="text-slate-300">{label}</Label>
            <Switch
              checked={localSettings.alert_preferences[key]}
              onCheckedChange={(checked) =>
                setLocalSettings({
                  ...localSettings,
                  alert_preferences: { ...localSettings.alert_preferences, [key]: checked }
                })
              }
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
      >
        <Save className="w-4 h-4 mr-2" />
        {t.save}
      </Button>
    </motion.div>
  );
}