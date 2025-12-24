import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ResponseRating({ messageIndex, initialRating, initialFeedback, onRate, language = 'pt-BR' }) {
  const [rating, setRating] = useState(initialRating || 0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(initialFeedback || '');
  const [hoveredStar, setHoveredStar] = useState(0);

  const content = {
    'pt-BR': {
      helpful: 'Esta resposta foi útil?',
      feedback: 'Feedback opcional',
      submit: 'Enviar',
      thanks: 'Obrigado pelo feedback!'
    },
    'en-US': {
      helpful: 'Was this response helpful?',
      feedback: 'Optional feedback',
      submit: 'Submit',
      thanks: 'Thanks for your feedback!'
    }
  };

  const t = content[language];

  const handleRate = (value) => {
    setRating(value);
    setShowFeedback(true);
  };

  const handleSubmit = () => {
    onRate(messageIndex, rating, feedback);
    setShowFeedback(false);
  };

  return (
    <div className="mt-3 pt-3 border-t border-slate-800">
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">{t.helpful}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="transition-all hover:scale-110"
            >
              <Star
                className={`w-4 h-4 ${
                  star <= (hoveredStar || rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t.feedback}
            className="bg-slate-800/50 border-slate-700 text-white text-sm min-h-[60px]"
          />
          <Button
            size="sm"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-600 to-cyan-500"
          >
            {t.submit}
          </Button>
        </div>
      )}

      {rating > 0 && !showFeedback && (
        <p className="text-xs text-green-400 mt-2">{t.thanks}</p>
      )}
    </div>
  );
}