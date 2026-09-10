import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  ExternalLink, 
  Car, 
  ShieldCheck, 
  Check, 
  MessageCircle,
  Building2
} from 'lucide-react';
import { LawFirmConfig } from '../types';

interface OfficeLocationSectionProps {
  config: LawFirmConfig;
  onOpenSchedulerPresencial: () => void;
}

export const OfficeLocationSection: React.FC<OfficeLocationSectionProps> = ({
  config,
  onOpenSchedulerPresencial,
}) => {
  // Google Maps embed URL using the exact coordinates of Francisco Filho Advocacia (-15.7890794, -48.1337764)
  const mapEmbedUrl = `https://maps.google.com/maps?q=-15.7890794,-48.1337764&z=17&output=embed&hl=pt-BR`;

  const wazeUrl = `https://www.waze.com/ul?ll=-15.7890794,-48.1337764&navigate=yes`;

  return (
    <section id="localizacao" className="py-20 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Escritório em Ceilândia - Distrito Federal</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Venha nos Fazer uma Visita ou Atendimento Presencial
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Estamos estrategicamente sediados em Ceilândia/DF com estrutura confortável, salas de reunião com total sigilo e facilidade de estacionamento.
          </p>
        </div>

        {/* Two Column Layout: Details and Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Box */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                {config.mainPhotoUrl ? (
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 shrink-0 bg-slate-950 shadow-md">
                    <img
                      src={config.mainPhotoUrl}
                      alt={config.lawyerName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="font-heading font-bold text-base text-white">{config.firmName}</h3>
                  <span className="text-xs text-amber-400 font-medium">{config.lawyerName} • {config.oabNumber}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">{config.addressLine1}</strong>
                    <span className="text-slate-400">{config.neighborhood}, {config.city} - {config.state}</span>
                    <span className="block text-slate-500 font-mono text-xs mt-0.5">CEP: {config.zipCode}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Horário de Funcionamento:</strong>
                    <span className="text-slate-400 block">{config.workingHours.weekdays}</span>
                    <span className="text-slate-400 block">{config.workingHours.saturday}</span>
                    <span className="text-slate-500 text-xs block">{config.workingHours.sunday}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Telefone e WhatsApp:</strong>
                    <a 
                      href={`tel:${config.whatsappNumber}`} 
                      className="text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      {config.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons for GPS */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5">
                <a
                  id="open-official-google-maps-btn"
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir no Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  id="open-waze-btn"
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Traçar no Waze</span>
                </a>
              </div>
            </div>

            {/* Parking & Reference Point Note */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Car className="w-4 h-4" />
                <span>Facilidades de Acesso:</span>
              </div>
              <ul className="space-y-1 text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Vagas livres e seguras para estacionamento em frente.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Fácil acesso via vias principais da Ceilândia e Expansão do Setor O.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Acessibilidade para idosos e pessoas com mobilidade reduzida.</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  id="location-cta-schedule-presencial-btn"
                  onClick={onOpenSchedulerPresencial}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Agendar Atendimento Presencial no Escritório</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="w-full h-full min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-900 flex flex-col">
              
              {/* Map Bar Header */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold">{config.firmName}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 hidden sm:inline">Setor O, Ceilândia - DF</span>
                </div>
                <a
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>Link Original do Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map iframe */}
              <div className="flex-1 relative w-full h-full min-h-[350px]">
                <iframe
                  id="google-maps-embed-iframe"
                  title="Localização Francisco Filho Advocacia no Google Maps"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full absolute inset-0 filter contrast-[1.05]"
                />
              </div>

              {/* Map Overlay Bottom Strip */}
              <div className="bg-slate-950/95 backdrop-blur-md px-4 py-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span>Coordenadas: -15.7890794, -48.1337764</span>
                <span className="text-slate-300">
                  Baseado no link oficial:{' '}
                  <a 
                    href={config.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-amber-400 underline"
                  >
                    maps.app.goo.gl/q9LBSZYyyjVLQPSV7
                  </a>
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
