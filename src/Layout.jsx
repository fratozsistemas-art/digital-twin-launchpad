import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Globe, Menu, X, LayoutDashboard } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [language, setLanguage] = useState('pt-BR');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const translations = {
    'pt-BR': {
      home: 'Início',
      dashboard: 'Painel',
      consultation: 'Consulta',
      knowledgeBase: 'Base de Conhecimento',
      dataSources: 'Fontes de Dados',
      integrations: 'Integrações',
      governance: 'Governança',
      about: 'Sobre',
      language: 'Idioma'
    },
    'en-US': {
      home: 'Home',
      dashboard: 'Dashboard',
      consultation: 'Consultation',
      knowledgeBase: 'Knowledge Base',
      dataSources: 'Data Sources',
      integrations: 'Integrations',
      governance: 'Governance',
      about: 'About',
      language: 'Language'
    }
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MPT</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-20"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-semibold text-lg">Marcos Prado Troyjo</div>
                <div className="text-slate-400 text-xs">Digital Twin</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to={createPageUrl('Home')} 
                className={`text-sm font-medium transition-colors ${
                  currentPageName === 'Home' 
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.home}
              </Link>
              <Link 
                to={createPageUrl('Dashboard')} 
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentPageName === 'Dashboard' 
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                {t.dashboard}
              </Link>
              <Link 
                to={createPageUrl('Consultation')} 
                className={`text-sm font-medium transition-colors ${
                  currentPageName === 'Consultation' 
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.consultation}
              </Link>
              <Link 
                to={createPageUrl('DataSources')} 
                className={`text-sm font-medium transition-colors ${
                  currentPageName === 'DataSources' 
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.dataSources}
              </Link>
              <Link 
                to={createPageUrl('ExternalIntegrations')} 
                className={`text-sm font-medium transition-colors ${
                  currentPageName === 'ExternalIntegrations' 
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.integrations}
              </Link>
              <Link 
                to={createPageUrl('GovernancePanel')} 
                className={`text-sm font-medium transition-colors ${
                  currentPageName === 'GovernancePanel' 
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.governance}
              </Link>
              <Link 
                to={createPageUrl('About')} 
                className={`text-sm font-medium transition-colors ${
                  currentPageName === 'About' 
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.about}
              </Link>
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 transition-all"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300 font-medium">
                  {language === 'pt-BR' ? 'PT' : 'EN'}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
            <div className="px-6 py-4 space-y-3">
              <Link 
                to={createPageUrl('Home')}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white py-2"
              >
                {t.home}
              </Link>
              <Link 
                to={createPageUrl('Dashboard')}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white py-2"
              >
                {t.dashboard}
              </Link>
              <Link 
                to={createPageUrl('Consultation')}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white py-2"
              >
                {t.consultation}
              </Link>
              <Link 
                to={createPageUrl('KnowledgeBase')}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white py-2"
              >
                {t.knowledgeBase}
              </Link>
              <Link 
                to={createPageUrl('DataSources')}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white py-2"
              >
                {t.dataSources}
              </Link>
              <Link 
                to={createPageUrl('ExternalIntegrations')}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white py-2"
              >
                {t.integrations}
              </Link>
              <Link 
                to={createPageUrl('GovernancePanel')}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white py-2"
              >
                {t.governance}
              </Link>
              <Link 
                to={createPageUrl('About')}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white py-2"
              >
                {t.about}
              </Link>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 py-2 text-slate-300"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                {language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="pt-20">
        {React.cloneElement(children, { language })}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Marcos Prado Troyjo Digital Twin. 
              <span className="block md:inline md:ml-1">
                {language === 'pt-BR' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
              </span>
            </div>
            <div className="text-slate-500 text-xs text-center md:text-right">
              {language === 'pt-BR' 
                ? 'Dados atualizados até 05 de dezembro de 2025' 
                : 'Data updated through December 5, 2025'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}