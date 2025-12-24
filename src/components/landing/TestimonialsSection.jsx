import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Business Consultant',
    company: 'Strategic Minds',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    content: 'My Digital Twin handles 80% of my client inquiries now. It\'s like having a clone that never sleeps. My revenue has tripled while my work hours decreased.',
    rating: 5
  },
  {
    name: 'Dr. Michael Torres',
    role: 'Medical Educator',
    company: 'MedLearn Institute',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    content: 'I can now teach thousands of students simultaneously. The AI captures my teaching style perfectly, and students often can\'t tell the difference.',
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Executive Coach',
    company: 'Peak Performance',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    content: 'The ROI is incredible. My Twin qualifies leads, conducts initial sessions, and only escalates complex cases to me. It\'s transformed my practice.',
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trusted by
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all duration-300 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-purple-500/30 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-slate-300 leading-relaxed mb-6 flex-grow">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-800">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                    <div className="text-sm text-slate-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}