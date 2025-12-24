import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300 font-medium">The Future of Personal Branding</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Your </span>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AI Twin
          </span>
          <br />
          <span className="text-white">Monetizing </span>
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Expertise
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Transform your knowledge into a scalable digital asset. 
          Let your AI clone work 24/7, serving clients and generating revenue while you sleep.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
          >
            Create Your Digital Twin
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800/50 px-8 py-6 text-lg rounded-xl"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '24/7', label: 'Availability' },
            { value: '1000x', label: 'Scale Potential' },
            { value: '90%', label: 'Time Saved' },
            { value: '$∞', label: 'Revenue Potential' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}