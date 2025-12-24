import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Starter',
    price: '297',
    description: 'Perfect for getting started with your Digital Twin journey',
    features: [
      'Basic AI Twin creation',
      'Up to 100 conversations/month',
      'Email support',
      'Basic analytics',
      '1 knowledge base'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    price: '797',
    description: 'For professionals ready to scale their expertise',
    features: [
      'Advanced AI Twin with voice',
      'Unlimited conversations',
      'Priority support',
      'Advanced analytics & insights',
      '5 knowledge bases',
      'Multi-channel deployment',
      'Custom integrations'
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations and high-volume professionals',
    features: [
      'Everything in Professional',
      'Dedicated success manager',
      'Custom AI training',
      'White-label options',
      'API access',
      'SLA guarantee',
      'Custom contracts'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function PricingSection() {
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
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Invest in Your
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Digital Future
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your growth stage. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}
              
              <div className={`h-full p-8 rounded-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-b from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30' 
                  : 'bg-slate-900/50 border border-slate-800'
              } flex flex-col`}>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    {plan.price !== 'Custom' && (
                      <span className="text-slate-400 text-xl">$</span>
                    )}
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-slate-400">/month</span>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-6 text-lg ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}