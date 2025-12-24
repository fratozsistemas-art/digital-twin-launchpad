import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ParadoxResolution({ paradox, onResolve, language = 'pt-BR' }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const content = {
    'pt-BR': {
      title: 'Cenário de Conflito Detectado',
      subtitle: 'Selecione a prioridade estratégica para refinar a análise',
      submit: 'Continuar com esta prioridade',
      submitted: 'Prioridade selecionada'
    },
    'en-US': {
      title: 'Conflict Scenario Detected',
      subtitle: 'Select the strategic priority to refine the analysis',
      submit: 'Continue with this priority',
      submitted: 'Priority selected'
    }
  };

  const t = content[language];

  const handleSubmit = () => {
    if (selectedOption) {
      setSubmitted(true);
      onResolve(selectedOption);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-xl bg-green-500/10 border border-green-500/30"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-green-300 font-medium">{t.submitted}</p>
            <p className="text-sm text-green-400/70 mt-1">
              {selectedOption === 'option_a' ? paradox.option_a.label : paradox.option_b.label}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-slate-900 border border-amber-500/30 shadow-lg shadow-amber-500/10"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{t.title}</h3>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      {/* Scenario Description */}
      <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
        <p className="text-slate-300 leading-relaxed">{paradox.scenario}</p>
      </div>

      {/* Options */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Option A */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedOption('option_a')}
          className={`p-5 rounded-xl border-2 transition-all text-left ${
            selectedOption === 'option_a'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-white font-semibold">{paradox.option_a.label}</h4>
            {selectedOption === 'option_a' && (
              <CheckCircle className="w-5 h-5 text-blue-400" />
            )}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {paradox.option_a.description}
          </p>
        </motion.button>

        {/* Option B */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedOption('option_b')}
          className={`p-5 rounded-xl border-2 transition-all text-left ${
            selectedOption === 'option_b'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-white font-semibold">{paradox.option_b.label}</h4>
            {selectedOption === 'option_b' && (
              <CheckCircle className="w-5 h-5 text-blue-400" />
            )}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {paradox.option_b.description}
          </p>
        </motion.button>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t.submit}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  );
}