import React from 'react';
import { Scale, MapPin, Phone, Mail, Clock, ShieldAlert, Heart, Settings, CalendarCheck } from 'lucide-react';
import { LawFirmConfig } from '../types';

interface FooterProps {
  config: LawFirmConfig;
  onOpenAppointmentsManager: () => void;
  onOpenSettings: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenAppointmentsManager,
  onOpenSettings,
  onNavigateSection,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                  <Scale className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">{config.firmName}</h4>
                <p className="text-[11px] text-amber-400">{config.lawyerName} • {config.oabNumber}</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Advocacia comprometida com a justiça, ética e defesa intransigente dos direitos dos nossos clientes em Ceilândia, Brasília e em todo o território nacional.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                id="footer-open-manager-btn"
                onClick={onOpenAppointmentsManager}
                className="text-xs text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Painel de Agendamentos</span>
              </button>

              <button
                id="footer-open-settings-btn"
                onClick={onOpenSettings}
                className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"
                title="Configurações do WhatsApp"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configurar</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-slate-200 uppercase tracking-wider text-xs">
              Navegação Rápida
            </h5>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigateSection('hero')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('areas')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Áreas de Atuação
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('agendamento')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Agendamento no WhatsApp
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('triagem')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Simulador de Direitos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('localizacao')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Como Chegar no Escritório
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('avaliacoes')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Depoimentos de Clientes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practice Areas */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-slate-200 uppercase tracking-wider text-xs">
              Especialidades
            </h5>
            <ul className="space-y-2">
              <li>Direito Trabalhista e Rescisões</li>
              <li>Direito Previdenciário (INSS e BPC/LOAS)</li>
              <li>Direito de Família e Sucessões</li>
              <li>Direito do Consumidor e SPC/Serasa</li>
              <li>Direito Civil, Imobiliário e Contratos</li>
              <li>Direito Criminal & Correspondente DF</li>
            </ul>
          </div>

          {/* Col 4: Address & Contact */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-slate-200 uppercase tracking-wider text-xs">
              Sede e Contato
            </h5>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  {config.addressLine1}, {config.neighborhood}, {config.city} - {config.state}, CEP {config.zipCode}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${config.whatsappNumber}`} className="hover:text-amber-400">
                  {config.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>{config.email}</span>
              </p>
              <p className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{config.workingHours.weekdays}</span>
              </p>
            </div>
          </div>

        </div>

        {/* OAB Legal Disclaimer Note */}
        <div className="pt-6 border-t border-slate-900 bg-slate-950/90 p-4 rounded-xl text-[11px] text-slate-500 leading-relaxed space-y-1.5">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Nota de Conformidade Ética OAB</span>
          </div>
          <p>
            Este portal digital tem finalidade estritamente informativa, educativa e de facilitação do contato do cidadão com seu procurador constituído, em estrita observância ao Código de Ética e Disciplina da Ordem dos Advogados do Brasil (OAB) e ao Provimento nº 205/2021 do CFOAB. Os serviços jurídicos não caracterizam captação indevida ou mercantilização da advocacia.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>
            © {currentYear} {config.firmName}. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com excelência e tecnologia para a advocacia moderna</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
