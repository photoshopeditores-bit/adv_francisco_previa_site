import React, { useState } from 'react';
import { 
  Scale, 
  Phone, 
  MapPin, 
  CalendarCheck, 
  Menu, 
  X, 
  Clock, 
  Settings, 
  MessageCircle,
  ShieldAlert
} from 'lucide-react';
import { LawFirmConfig } from '../types';

interface NavbarProps {
  config: LawFirmConfig;
  appointmentCount: number;
  onOpenScheduler: () => void;
  onOpenAppointmentsManager: () => void;
  onOpenSettings: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  appointmentCount,
  onOpenScheduler,
  onOpenAppointmentsManager,
  onOpenSettings,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg backdrop-blur-md bg-slate-950/95 border-b border-slate-800/80">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 text-xs text-slate-300 py-1.5 px-4 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Atendimento Aberto no DF
            </span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {config.workingHours.weekdays}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={config.googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
              title="Abrir no Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Expansão do Setor O, Ceilândia - DF</span>
              <span className="md:hidden">Ceilândia/DF</span>
            </a>
            <a 
              href={`tel:${config.whatsappNumber}`}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{config.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <button 
            id="nav-brand-logo-btn"
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 p-0.5 shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Scale className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="font-heading text-lg sm:text-xl font-bold tracking-wider text-slate-100 uppercase block leading-tight group-hover:text-amber-400 transition-colors">
                {config.firmName}
              </span>
              <span className="text-xs text-amber-400/90 font-medium tracking-widest uppercase block">
                {config.lawyerName} • {config.oabNumber}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button 
              id="nav-link-areas-btn"
              onClick={() => handleNavClick('areas')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              Áreas de Atuação
            </button>
            <button 
              id="nav-link-simulator-btn"
              onClick={() => handleNavClick('triagem')} 
              className="hover:text-amber-400 transition-colors py-2 flex items-center gap-1"
            >
              <span>Triagem de Direitos</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">
                Grátis
              </span>
            </button>
            <button 
              id="nav-link-location-btn"
              onClick={() => handleNavClick('localizacao')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              Como Chegar
            </button>
            <button 
              id="nav-link-reviews-btn"
              onClick={() => handleNavClick('avaliacoes')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              Avaliações Google
            </button>
            <button 
              id="nav-link-faq-btn"
              onClick={() => handleNavClick('faq')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              Dúvidas
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Appointments Manager Trigger */}
            <button
              id="nav-appointments-manager-btn"
              onClick={onOpenAppointmentsManager}
              className="relative p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center gap-1.5 text-xs font-medium"
              title="Gerenciar consultas salvas no sistema"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden xl:inline">Agendamentos</span>
              {appointmentCount > 0 && (
                <span className="bg-amber-600 text-slate-950 font-bold text-[11px] px-1.5 py-0.2 rounded-full">
                  {appointmentCount}
                </span>
              )}
            </button>

            {/* Quick config */}
            <button
              id="nav-config-settings-btn"
              onClick={onOpenSettings}
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
              title="Configurações do WhatsApp e Escritório"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Primary Action */}
            <button
              id="nav-cta-whatsapp-schedule-btn"
              onClick={onOpenScheduler}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-md shadow-emerald-950/40 hover:shadow-emerald-900/60 transition-all flex items-center gap-2 transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Agendar no WhatsApp</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-200">
            <button 
              id="mobile-nav-areas-btn"
              onClick={() => handleNavClick('areas')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Áreas de Atuação
            </button>
            <button 
              id="mobile-nav-simulator-btn"
              onClick={() => handleNavClick('triagem')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900 flex items-center justify-between"
            >
              <span>Triagem de Direitos</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/30">
                Grátis
              </span>
            </button>
            <button 
              id="mobile-nav-location-btn"
              onClick={() => handleNavClick('localizacao')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Localização no Maps (Ceilândia)
            </button>
            <button 
              id="mobile-nav-reviews-btn"
              onClick={() => handleNavClick('avaliacoes')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Avaliações Google
            </button>
            <button 
              id="mobile-nav-faq-btn"
              onClick={() => handleNavClick('faq')} 
              className="text-left px-3 py-2 rounded-md hover:bg-slate-900"
            >
              Perguntas Frequentes
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <button
              id="mobile-cta-whatsapp-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScheduler();
              }}
              className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Agendar Consulta no WhatsApp</span>
            </button>

            <div className="flex gap-2">
              <button
                id="mobile-appointments-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentsManager();
                }}
                className="flex-1 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <CalendarCheck className="w-4 h-4 text-amber-400" />
                <span>Agendamentos ({appointmentCount})</span>
              </button>

              <button
                id="mobile-settings-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400"
                title="Configurações"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
