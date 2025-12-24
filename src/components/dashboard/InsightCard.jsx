import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Globe2, 
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function InsightCard({ insight, language }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const locale = language === 'pt-BR' ? ptBR : enUS;

  const priorityColors = {
    high: 'border-red-500/30 bg-red-500/5',
    medium: 'border-amber-500/30 bg-amber-500/5',
    low: 'border-blue-500/30 bg-blue-500/5'
  };

  const categoryIcons = {
    brics: Globe2,
    global_trade: TrendingUp,
    // Add more category icons as needed
  };

  const CategoryIcon = categoryIcons[insight.category] || Globe2;

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        className={`p-5 rounded-xl border transition-all cursor-pointer ${
          priorityColors[insight.priority] || 'border-slate-800 bg-slate-900/50'
        } hover:border-slate-700`}
        onClick={() => setIsOpen(true)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center">
              <CategoryIcon className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-xs text-slate-500 capitalize">
              {insight.category?.replace(/_/g, ' ')}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked(!bookmarked);
            }}
            className="text-slate-500 hover:text-cyan-400 transition-colors"
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold mb-2 line-clamp-2 leading-snug">
          {insight.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {insight.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {insight.read_time_minutes} min
            </span>
            {insight.published_date && (
              <span>
                {format(new Date(insight.published_date), 'MMM d', { locale })}
              </span>
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </div>
      </motion.div>

      {/* Full Insight Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white mb-4">
              {insight.title}
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
              <span className="flex items-center gap-1 capitalize">
                <CategoryIcon className="w-4 h-4" />
                {insight.category?.replace(/_/g, ' ')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {insight.read_time_minutes} {language === 'pt-BR' ? 'min de leitura' : 'min read'}
              </span>
              {insight.published_date && (
                <span>
                  {format(new Date(insight.published_date), 'PPP', { locale })}
                </span>
              )}
            </div>
          </DialogHeader>
          
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {insight.content}
            </div>
          </div>

          {/* Regions and Industries */}
          {(insight.regions?.length > 0 || insight.industries?.length > 0) && (
            <div className="mt-6 pt-6 border-t border-slate-800">
              {insight.regions?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">
                    {language === 'pt-BR' ? 'Regiões' : 'Regions'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {insight.regions.map((region, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 text-xs capitalize"
                      >
                        {region.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {insight.industries?.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 mb-2">
                    {language === 'pt-BR' ? 'Indústrias' : 'Industries'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {insight.industries.map((industry, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 text-xs capitalize"
                      >
                        {industry.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}