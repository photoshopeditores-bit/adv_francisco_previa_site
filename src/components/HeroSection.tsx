import React, { useState } from 'react';
import { 
  Scale, 
  MessageCircle, 
  MapPin, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LawFirmConfig } from '../types';

interface HeroSectionProps {
  config: LawFirmConfig;
  onOpenScheduler: () => void;
  onNavigateToSimulator: () => void;
  onNavigateToLocation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenScheduler,
  onNavigateToSimulator,
  onNavigateToLocation,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-16 lg:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle glowing ambient backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-700/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Credibility Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-semibold text-amber-300 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Advocacia Especializada • Ceilândia & Brasília / DF</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span className="text-slate-300">Presencial & Online</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Seus Direitos Defendidos com <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Excelência e Ética</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Atendimento jurídico humanizado e focado em soluções para causas <strong className="text-slate-100 font-semibold">Trabalhistas</strong>, <strong className="text-slate-100 font-semibold">Previdenciárias (INSS)</strong>, <strong className="text-slate-100 font-semibold">Família</strong>, <strong className="text-slate-100 font-semibold">Consumidor</strong> e <strong className="text-slate-100 font-semibold">Cíveis</strong>. Agende diretamente pelo WhatsApp e receba atenção dedicada ao seu caso.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
              <button
                id="hero-cta-whatsapp-btn"
                onClick={onOpenScheduler}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-950/50 hover:shadow-emerald-900/70 transition-all flex items-center justify-center gap-3 transform active:scale-98 group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Agendar Consulta no WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-simulator-btn"
                onClick={onNavigateToSimulator}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-amber-500/50 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Triagem de Direitos Rápida</span>
              </button>

              <button
                id="hero-cta-maps-btn"
                onClick={onNavigateToLocation}
                className="px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 font-medium text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Ver Escritório</span>
              </button>
            </div>

            {/* Trust bullet checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-850 text-xs text-slate-400">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atendimento Direto com o Advogado</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Agendamento Rápido sem Espera</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sigilo Profissional Garantido OAB</span>
              </div>
            </div>

          </div>

          {/* Right Showcase Column with Main Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900/90 shadow-2xl shadow-black/80 group">
              
              {/* Image Frame */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden bg-slate-950">
                {imageError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-slate-950 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                      <Scale className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{config.lawyerName}</h3>
                    <p className="text-sm text-amber-400 mt-1">{config.firmName}</p>
                    <p className="text-xs text-slate-400 mt-2">{config.neighborhood}, {config.city}</p>
                  </div>
                ) : (
                  <img
                    id="hero-main-photo"
                    src={config.mainPhotoUrl}
                    alt={`${config.lawyerName} - ${config.firmName}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                
                {/* Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />

                {/* Top Floating Glass Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 flex items-center gap-1.5 shadow-lg">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>{config.oabNumber}</span>
                  </div>

                  <a
                    id="hero-photo-maps-link"
                    href={config.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 hover:border-amber-400/60 text-[11px] font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 shadow-lg transition-colors"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-amber-300">5.0</span>
                    <span className="text-slate-300">Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-left">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-bold tracking-wider uppercase mb-1.5 border border-amber-500/30 backdrop-blur-sm">
                    Advocacia & Consultoria Jurídica
                  </span>
                  
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                    {config.lawyerName}
                  </h2>
                  
                  <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{config.neighborhood}, {config.city}</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-900/85 text-[10px] font-semibold text-slate-200 border border-slate-700/80">Trabalhista</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900/85 text-[10px] font-semibold text-slate-200 border border-slate-700/80">Previdenciário (INSS)</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900/85 text-[10px] font-semibold text-slate-200 border border-slate-700/80">Família</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900/85 text-[10px] font-semibold text-slate-200 border border-slate-700/80">Consumidor</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900/85 text-[10px] font-semibold text-slate-200 border border-slate-700/80">Cível</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action Bar inside the card */}
              <div className="p-4 bg-slate-950/95 border-t border-slate-800/90 flex flex-col gap-2.5">
                <button
                  id="hero-card-schedule-btn"
                  onClick={onOpenScheduler}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Agendar Consulta com Dr. Francisco</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-slate-300">Plantão WhatsApp Ativo</span>
                  </span>
                  <a
                    id="hero-photo-view-original-maps"
                    href={config.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Foto do Perfil no Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Numbers & Credibility Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-slate-950/60 rounded-2xl p-5 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-center p-3 border-r border-slate-850 last:border-r-0">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-amber-400 block">+1.200</span>
            <span className="text-xs sm:text-sm text-slate-400">Atendimentos e Casos</span>
          </div>
          <div className="text-center p-3 md:border-r border-slate-850">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-emerald-400 block">5.0 ⭐</span>
            <span className="text-xs sm:text-sm text-slate-400">Avaliação no Google</span>
          </div>
          <div className="text-center p-3 border-r border-slate-850 last:border-r-0">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-amber-400 block">100%</span>
            <span className="text-xs sm:text-sm text-slate-400">Sigilo e Ética OAB</span>
          </div>
          <div className="text-center p-3">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-teal-400 block">DF & Brasil</span>
            <span className="text-xs sm:text-sm text-slate-400">Presencial e Remoto</span>
          </div>
        </div>

      </div>
    </section>
  );
};
