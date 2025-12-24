import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Limited Early Access</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Scale Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Expertise Infinitely?
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Join the future of professional services. Create your AI Twin today and 
            start monetizing your knowledge while you sleep.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-7 text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
            >
              Create Your Digital Twin
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-slate-700 text-slate-300 hover:bg-slate-800/50 px-10 py-7 text-lg rounded-xl"
            >
              Schedule a Demo
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 pt-12 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-4">Trusted by professionals at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
                <span key={company} className="text-lg font-semibold text-slate-400">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}