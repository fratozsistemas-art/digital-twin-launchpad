import React from 'react';
import { Sparkles, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'API', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  Resources: ['Documentation', 'Help Center', 'Community', 'Webinars', 'Templates'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies', 'Compliance']
};

const socialLinks = [
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Youtube, href: '#' },
  { icon: Instagram, href: '#' }
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Digital Twin</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Transform your expertise into a scalable digital asset. The future of personal branding is here.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Digital Twin. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-400">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-400">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-400">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}