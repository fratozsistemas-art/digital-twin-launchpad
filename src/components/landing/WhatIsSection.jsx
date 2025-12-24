import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Your Knowledge, Amplified',
    description: 'Your AI Twin captures your unique expertise, communication style, and decision-making patterns.'
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'Engage with unlimited clients simultaneously with responses that sound exactly like you.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Break language barriers and time zones. Your expertise becomes accessible to anyone, anywhere.'
  },
  {
    icon: Shield,
    title: 'Complete Control',
    description: 'You decide what your Twin knows, how it responds, and when it escalates to the real you.'
  }
];

export default function WhatIsSection() {
  return (
    <section className="relative py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            What is a Digital Twin?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            A Strategic Asset, <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Not a Liability
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Your Digital Twin is an AI-powered replica of your professional expertise. 
            It learns how you think, speak, and solve problems—then scales your impact infinitely.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-amber-500/20 rounded-3xl blur-3xl" />
          <div className="relative aspect-video rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Brain className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Your AI Twin Awaits</h3>
              <p className="text-slate-400">Experience the future of personal branding</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}