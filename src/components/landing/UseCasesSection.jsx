import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Stethoscope, 
  Scale, 
  TrendingUp,
  Mic,
  ChevronRight
} from 'lucide-react';

const useCases = [
  {
    id: 'consultants',
    icon: Briefcase,
    title: 'Consultants & Advisors',
    description: 'Scale your consulting practice without burning out. Your Twin handles initial consultations, answers FAQs, and qualifies leads while you focus on high-value clients.',
    benefits: ['24/7 client availability', 'Automated lead qualification', 'Consistent messaging'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format'
  },
  {
    id: 'educators',
    icon: GraduationCap,
    title: 'Educators & Coaches',
    description: 'Teach thousands simultaneously. Your Digital Twin delivers personalized learning experiences, answers student questions, and provides coaching at any hour.',
    benefits: ['Unlimited student capacity', 'Personalized feedback', 'Round-the-clock support'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format'
  },
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare Professionals',
    description: 'Extend your care beyond office hours. Your Twin provides preliminary assessments, answers common health questions, and schedules appointments.',
    benefits: ['Patient triage support', 'Appointment scheduling', 'Health education'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format'
  },
  {
    id: 'legal',
    icon: Scale,
    title: 'Legal Professionals',
    description: 'Democratize legal access. Your Twin handles initial case assessments, explains legal concepts, and guides clients through preliminary processes.',
    benefits: ['Case intake automation', 'Legal FAQ handling', 'Document guidance'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format'
  },
  {
    id: 'finance',
    icon: TrendingUp,
    title: 'Financial Advisors',
    description: 'Multiply your advisory capacity. Your Twin explains investment concepts, reviews portfolios, and provides personalized financial education.',
    benefits: ['Portfolio reviews', 'Financial education', 'Risk assessment'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format'
  },
  {
    id: 'creators',
    icon: Mic,
    title: 'Content Creators & Influencers',
    description: 'Engage your audience at scale. Your Twin interacts with followers, answers questions, and maintains your brand voice across all platforms.',
    benefits: ['Fan engagement', 'Content recommendations', 'Community building'],
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&auto=format'
  }
];

export default function UseCasesSection() {
  const [activeCase, setActiveCase] = useState(useCases[0]);

  return (
    <section className="relative py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Use Cases
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transform Every
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Industry
            </span>
          </h2>
        </motion.div>

        {/* Interactive Use Cases */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Use case list */}
          <div className="space-y-3">
            {useCases.map((useCase) => (
              <motion.button
                key={useCase.id}
                onClick={() => setActiveCase(useCase)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
                  activeCase.id === useCase.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                }`}
                whileHover={{ x: 4 }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  activeCase.id === useCase.id
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    : 'bg-slate-800'
                }`}>
                  <useCase.icon className={`w-6 h-6 ${
                    activeCase.id === useCase.id ? 'text-white' : 'text-slate-400'
                  }`} />
                </div>
                <span className={`font-medium ${
                  activeCase.id === useCase.id ? 'text-white' : 'text-slate-400'
                }`}>
                  {useCase.title}
                </span>
                <ChevronRight className={`w-5 h-5 ml-auto transition-transform ${
                  activeCase.id === useCase.id ? 'text-blue-400 rotate-90' : 'text-slate-600'
                }`} />
              </motion.button>
            ))}
          </div>

          {/* Right: Active use case details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative h-full"
              >
                <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={activeCase.image}
                      alt={activeCase.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {activeCase.title}
                    </h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                      {activeCase.description}
                    </p>
                    
                    {/* Benefits */}
                    <div className="flex flex-wrap gap-3">
                      {activeCase.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}