import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: 'How long does it take to create my Digital Twin?',
    answer: 'The initial setup takes about 2-4 weeks, depending on the amount of content and complexity of your expertise. We guide you through the entire process, from content collection to training calibration.'
  },
  {
    question: 'How accurate is the AI in replicating my expertise?',
    answer: 'Our AI achieves remarkable accuracy by learning from your actual content, conversations, and decision-making patterns. Most users report 85-95% alignment with their communication style and expertise within the first month.'
  },
  {
    question: 'Can I control what my Digital Twin says?',
    answer: 'Absolutely. You have complete control over your Twin\'s knowledge base, response guidelines, and escalation rules. You can set boundaries on topics, add or remove information, and define when the Twin should direct users to the real you.'
  },
  {
    question: 'What happens to my data and content?',
    answer: 'Your data is encrypted and stored securely. You retain full ownership of all content and can delete it at any time. We never share your data with third parties or use it to train other models.'
  },
  {
    question: 'How does billing work?',
    answer: 'All plans are billed monthly with no long-term commitments. You can upgrade, downgrade, or cancel anytime. Enterprise plans offer custom billing arrangements.'
  },
  {
    question: 'Can my Twin handle multiple languages?',
    answer: 'Yes! Our AI supports over 50 languages. Your Twin can automatically detect and respond in the user\'s preferred language while maintaining your expertise and communication style.'
  },
  {
    question: 'What integrations are available?',
    answer: 'We integrate with popular platforms including Slack, WhatsApp, website chat widgets, Zoom, and custom APIs. Professional and Enterprise plans include additional integration options.'
  },
  {
    question: 'How do I measure ROI?',
    answer: 'Our analytics dashboard tracks conversations, user satisfaction, time saved, leads generated, and revenue attributed to your Twin. Most users see positive ROI within the first 30 days.'
  }
];

export default function FAQSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Questions?
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-900/50 border border-slate-800 rounded-xl px-6 data-[state=open]:border-blue-500/30"
              >
                <AccordionTrigger className="text-left text-white hover:text-blue-400 py-6 text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}