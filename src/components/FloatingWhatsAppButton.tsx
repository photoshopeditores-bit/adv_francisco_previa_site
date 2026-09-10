import React, { useState } from 'react';
import { MessageCircle, X, Calendar, MapPin, Sparkles, Send } from 'lucide-react';
import { LawFirmConfig } from '../types';
import { cleanPhoneForWhatsApp } from '../utils/appointmentUtils';

interface FloatingWhatsAppButtonProps {
  config: LawFirmConfig;
  onOpenScheduler: () => void;
  onOpenLocation: () => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  config,
  onOpenScheduler,
  onOpenLocation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDirectChat = (customText?: string) => {
    const cleanNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const text = customText || `Olá, Dr. Francisco Filho! Acessei o site do escritório e gostaria de tirar uma dúvida jurídica.`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-slate-950 border border-emerald-500/40 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{config.lawyerName}</h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Online para Atendimento no DF
                </p>
              </div>
            </div>

            <button
              id="close-floating-wa-popover-btn"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick choices */}
          <div className="p-4 space-y-2.5 text-xs bg-slate-900">
            <p className="text-slate-300 font-medium pb-1">
              Olá! Como podemos te ajudar hoje?
            </p>

            <button
              id="floating-wa-opt-schedule-btn"
              onClick={() => {
                setIsOpen(false);
                onOpenScheduler();
              }}
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-amber-400 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Agendar Consulta (com Data e Hora)</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                Rápido
              </span>
            </button>

            <button
              id="floating-wa-opt-direct-chat-btn"
              onClick={() => handleDirectChat('Olá, Dr. Francisco! Tenho uma dúvida urgente sobre meus direitos.')}
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-400 text-left transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <Send className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Conversar Imediatamente no WhatsApp</span>
              </div>
              <span className="text-emerald-400">→</span>
            </button>

            <button
              id="floating-wa-opt-maps-btn"
              onClick={() => {
                setIsOpen(false);
                onOpenLocation();
              }}
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-400 text-left transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">Ver Endereço e Rota (Ceilândia/DF)</span>
              </div>
              <span className="text-slate-400">→</span>
            </button>
          </div>

          <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 text-center">
            {config.firmName} • {config.oabNumber}
          </div>

        </div>
      )}

      {/* Trigger Button */}
      <button
        id="floating-whatsapp-main-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl shadow-emerald-950/80 hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Abrir WhatsApp"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30"></span>
        <MessageCircle className="w-7 h-7 relative z-10" />
        
        {/* Floating tooltip badge */}
        {!isOpen && (
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-950 text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-800 hidden sm:flex items-center gap-1.5 opacity-95 group-hover:opacity-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Agendar no WhatsApp
          </span>
        )}
      </button>
    </div>
  );
};
