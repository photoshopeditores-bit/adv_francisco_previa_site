import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageCircle, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  Building2,
  Video
} from 'lucide-react';
import { Appointment, LawFirmConfig } from '../types';
import { 
  formatBrazilianDate, 
  getWhatsAppUrl, 
  updateAppointmentStatus, 
  deleteAppointment 
} from '../utils/appointmentUtils';

interface AppointmentsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  config: LawFirmConfig;
  onAppointmentsUpdated: () => void;
}

export const AppointmentsManagerModal: React.FC<AppointmentsManagerModalProps> = ({
  isOpen,
  onClose,
  appointments,
  config,
  onAppointmentsUpdated,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendente' | 'confirmado' | 'concluido'>('todos');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editingNote, setEditingNote] = useState('');

  if (!isOpen) return null;

  const filtered = appointments.filter((app) => {
    const matchesStatus = statusFilter === 'todos' || app.status === statusFilter;
    const matchesSearch =
      app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.practiceAreaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.date.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    updateAppointmentStatus(id, newStatus);
    onAppointmentsUpdated();
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };

  const handleSaveNote = (id: string) => {
    updateAppointmentStatus(id, selectedAppointment?.status || 'pendente', editingNote);
    onAppointmentsUpdated();
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, notes: editingNote });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este agendamento do histórico?')) {
      deleteAppointment(id);
      onAppointmentsUpdated();
      if (selectedAppointment?.id === id) {
        setSelectedAppointment(null);
      }
    }
  };

  const handleOpenWhatsAppForAppointment = (app: Appointment) => {
    const url = getWhatsAppUrl(app, config);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                Painel de Gestão de Consultas & Agendamentos
              </h3>
              <p className="text-xs text-slate-400">
                Histórico de solicitações realizadas via WhatsApp ({appointments.length} registros)
              </p>
            </div>
          </div>

          <button
            id="close-appointments-manager-btn"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar Filter */}
        <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="manager-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, código (#FFA-...) ou área..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'pendente', label: 'Pendentes' },
              { id: 'confirmado', label: 'Confirmados' },
              { id: 'concluido', label: 'Concluídos' },
            ].map((f) => (
              <button
                key={f.id}
                id={`manager-filter-${f.id}-btn`}
                onClick={() => setStatusFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  statusFilter === f.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

        </div>

        {/* Body content (2-columns on large screens) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* List column */}
          <div className="lg:col-span-6 border-r border-slate-800 overflow-y-auto p-4 space-y-2.5">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs">
                Nenhum agendamento encontrado para o filtro selecionado.
              </div>
            ) : (
              filtered.map((app) => {
                const isSelected = selectedAppointment?.id === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedAppointment(app);
                      setEditingNote(app.notes || '');
                    }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-400 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        #{app.referenceCode}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          app.status === 'confirmado'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : app.status === 'concluido'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{app.clientName}</span>
                    </h4>

                    <div className="mt-2 flex flex-wrap gap-y-1 gap-x-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {formatBrazilianDate(app.date)} às {app.timeSlot}
                      </span>
                      <span className="flex items-center gap-1">
                        {app.modality === 'presencial' ? (
                          <>
                            <Building2 className="w-3 h-3 text-emerald-400" />
                            <span>Presencial (Ceilândia)</span>
                          </>
                        ) : (
                          <>
                            <Video className="w-3 h-3 text-teal-400" />
                            <span>Online</span>
                          </>
                        )}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-400 line-clamp-1 italic">
                      "{app.caseDescription}"
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Details / Management Column */}
          <div className="lg:col-span-6 bg-slate-950/80 p-6 overflow-y-auto">
            {selectedAppointment ? (
              <div className="space-y-6">
                
                {/* Details Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-amber-400 font-mono font-bold block">
                      Ref: #{selectedAppointment.referenceCode}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {selectedAppointment.clientName}
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      id="manager-open-whatsapp-app-btn"
                      onClick={() => handleOpenWhatsAppForAppointment(selectedAppointment)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Abrir WhatsApp</span>
                    </button>
                    <button
                      id="manager-delete-app-btn"
                      onClick={() => handleDelete(selectedAppointment.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400"
                      title="Excluir do histórico"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Telefone WhatsApp:</span>
                    <strong className="text-white">{selectedAppointment.clientPhone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Área Jurídica:</span>
                    <strong className="text-amber-400">{selectedAppointment.practiceAreaName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Data e Horário:</span>
                    <strong className="text-white">
                      {formatBrazilianDate(selectedAppointment.date)} às {selectedAppointment.timeSlot}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Modalidade:</span>
                    <strong className="text-white capitalize">{selectedAppointment.modality}</strong>
                  </div>
                </div>

                {/* Case Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Resumo da Demanda / Problema:</label>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedAppointment.caseDescription}
                  </div>
                </div>

                {/* Status Switcher */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block">Atualizar Status do Agendamento:</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'pendente', label: 'Pendente' },
                      { id: 'confirmado', label: 'Confirmado pelo Dr. Francisco' },
                      { id: 'concluido', label: 'Consulta Concluída' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        id={`update-status-${st.id}-btn`}
                        onClick={() => handleStatusChange(selectedAppointment.id, st.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedAppointment.status === st.id
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Internal Notes */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block">Anotações Internas do Escritório:</label>
                  <textarea
                    id="manager-notes-textarea"
                    rows={3}
                    value={editingNote}
                    onChange={(e) => setEditingNote(e.target.value)}
                    placeholder="Ex: Cliente informou que trará TRCT e extrato do FGTS. Consulta presencial confirmada..."
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    id="manager-save-note-btn"
                    onClick={() => handleSaveNote(selectedAppointment.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                  >
                    Salvar Anotação
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs space-y-2">
                <FileText className="w-8 h-8 text-slate-700" />
                <p>Selecione um agendamento na lista ao lado para ver detalhes e atualizar status.</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>{config.firmName} • Gestão Integrada</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
          >
            Fechar Painel
          </button>
        </div>

      </div>
    </div>
  );
};
