import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { MessageSquare, Clock, Star, ChevronRight, FileText } from 'lucide-react';

export default function ConsultationHistory({ consultations = [], language }) {
  const locale = language === 'pt-BR' ? ptBR : enUS;

  const content = {
    'pt-BR': {
      empty: 'Nenhuma consulta recente',
      emptyDesc: 'Suas consultas aparecerão aqui',
      messages: 'mensagens',
      rating: 'Avaliação'
    },
    'en-US': {
      empty: 'No recent consultations',
      emptyDesc: 'Your consultations will appear here',
      messages: 'messages',
      rating: 'Rating'
    }
  };

  const t = content[language];

  if (consultations.length === 0) {
    return (
      <div className="p-12 rounded-xl bg-slate-900/30 border border-slate-800 border-dashed text-center">
        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400 mb-2">{t.empty}</p>
        <p className="text-sm text-slate-500">{t.emptyDesc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {consultations.map((consultation) => (
        <div
          key={consultation.id}
          className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium mb-1 truncate group-hover:text-cyan-400 transition-colors">
                {consultation.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {consultation.messages?.length || 0} {t.messages}
                </span>
                {consultation.duration_minutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {consultation.duration_minutes} min
                  </span>
                )}
                {consultation.created_date && (
                  <span>
                    {format(new Date(consultation.created_date), 'MMM d, HH:mm', { locale })}
                  </span>
                )}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" />
          </div>

          {/* Topics */}
          {consultation.topics && consultation.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {consultation.topics.slice(0, 3).map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs capitalize"
                >
                  {topic.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          {consultation.satisfaction_rating && (
            <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-500">{t.rating}:</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < consultation.satisfaction_rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}