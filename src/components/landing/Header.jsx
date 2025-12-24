import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Digital Twin</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-slate-400 hover:text-white hover:bg-slate-800/50"
              >
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" />
            <nav className="relative pt-24 px-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-slate-300 hover:text-white py-3 border-b border-slate-800"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-slate-700 text-slate-300"
                >
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}