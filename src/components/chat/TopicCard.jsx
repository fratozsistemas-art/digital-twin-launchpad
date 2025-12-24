import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function TopicCard({ topic, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center shrink-0 group-hover:from-blue-600/30 group-hover:to-cyan-500/30 transition-all">
          <topic.icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-cyan-400 transition-colors">
            {topic.title}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {topic.description}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0 transition-colors" />
      </div>
    </motion.button>
  );
}