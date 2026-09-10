import React, { useState } from 'react';
import { 
  Briefcase, 
  ShieldCheck, 
  HeartHandshake, 
  Scale, 
  FileText, 
  Gavel, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  MessageCircle,
  FileCheck2
} from 'lucide-react';
import { PracticeArea, PracticeAreaId } from '../types';
import { PRACTICE_AREAS } from '../data/officeData';

interface PracticeAreasSectionProps {
  onSelectAreaForScheduling: (areaId: PracticeAreaId) => void;
}

export const PracticeAreasSection: React.FC<PracticeAreasSectionProps> = ({
  onSelectAreaForScheduling,
}) => {
  const [selectedAreaModal, setSelectedAreaModal] = useState<PracticeArea | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-pink-400" />;
      case 'Scale': return <Scale className="w-6 h-6 text-cyan-400" />;
      case 'FileText': return <FileText className="w-6 h-6 text-blue-400" />;
      case 'Gavel': return <Gavel className="w-6 h-6 text-amber-500" />;
      default: return <Scale className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="areas" className="py-20 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Especialidades Jurídicas
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Áreas de Atuação do Escritório
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Conhecimento técnico aprofundado e dedicação integral na defesa dos interesses de trabalhadores, segurados do INSS, famílias e consumidores.
          </p>
        </div>

        {/* Grid of Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRACTICE_AREAS.map((area) => (
            <div
              key={area.id}
              className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-black/40 relative overflow-hidden"
            >
              {/* Subtle accent corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-amber-500/15 transition-all" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(area.icon)}
                </div>

                <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {area.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {area.shortDesc}
                </p>

                {/* Quick 3 common cases */}
                <div className="mt-4 pt-4 border-t border-slate-900 space-y-2">
                  <span className="text-[11px] font-bold uppercase text-slate-500 block tracking-wider">
                    Principais Demandas:
                  </span>
                  {area.popularCases.slice(0, 3).map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-6 pt-4 border-t border-slate-900/80 flex items-center justify-between gap-2">
                <button
                  id={`area-details-btn-${area.id}`}
                  onClick={() => setSelectedAreaModal(area)}
                  className="text-xs text-slate-400 hover:text-amber-400 font-medium transition-colors flex items-center gap-1"
                >
                  <span>Ver detalhes e documentos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id={`area-schedule-fast-btn-${area.id}`}
                  onClick={() => onSelectAreaForScheduling(area.id)}
                  className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-300 hover:text-white transition-colors"
                  title="Agendar consulta nesta área"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal for Detailed Practice Area Info & Document Checklist */}
      {selectedAreaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            
            {/* Close Button */}
            <button
              id="close-area-modal-btn"
              onClick={() => setSelectedAreaModal(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {getIcon(selectedAreaModal.icon)}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {selectedAreaModal.title}
                  </h3>
                  <span className="text-xs text-amber-400 font-medium">
                    Francisco Filho Advocacia • Ceilândia / DF
                  </span>
                </div>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {selectedAreaModal.fullDesc}
              </div>

              {/* Cases List */}
              <div className="space-y-2.5">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-xs">
                  Situações que Atendemos com Frequência:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedAreaModal.popularCases.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Documentos Recomendados para a Consulta:</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Separar previamente estes documentos agiliza o diagnóstico do seu direito durante a consulta com o Dr. Francisco.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedAreaModal.requiredDocs.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-slate-950/40 px-3 py-2 rounded-lg border border-slate-850">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  id="modal-schedule-this-area-btn"
                  onClick={() => {
                    const areaId = selectedAreaModal.id;
                    setSelectedAreaModal(null);
                    onSelectAreaForScheduling(areaId);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Agendar Consulta nesta Área</span>
                </button>

                <button
                  id="modal-close-dismiss-btn"
                  onClick={() => setSelectedAreaModal(null)}
                  className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold"
                >
                  Fechar
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
