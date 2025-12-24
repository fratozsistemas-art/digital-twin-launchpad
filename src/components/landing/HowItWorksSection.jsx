import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Rocket, DollarSign } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Your Knowledge',
    description: 'Share your content, conversations, and expertise. The more you provide, the more accurate your Twin becomes.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Cpu,
    number: '02',
    title: 'AI Training & Calibration',
    description: 'Our advanced AI learns your unique voice, expertise areas, and decision-making style through deep analysis.',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Deploy Your Twin',
    description: 'Launch your Digital Twin across multiple channels—chat, voice, video—wherever your audience needs you.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: DollarSign,
    number: '04',
    title: 'Monetize & Scale',
    description: 'Start earning while your Twin handles consultations, coaching, and client interactions around the clock.',
    color: 'from-amber-500 to-orange-500'
  }
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Four Steps to Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Digital Empire
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Number badge */}
                  <div className="relative inline-block mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-400">{step.number}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}