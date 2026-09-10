import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  MapPin, 
  Video, 
  Check, 
  Copy, 
  ExternalLink, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle,
  CalendarPlus,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { LawFirmConfig, PracticeAreaId, ConsultationModality, Appointment } from '../types';
import { PRACTICE_AREAS, AVAILABLE_TIME_SLOTS } from '../data/officeData';
import { 
  formatBrazilianDate, 
  formatBrazilianPhone, 
  cleanPhoneForWhatsApp, 
  generateReferenceCode,
  saveAppointment,
  getStoredAppointments,
  createGoogleCalendarUrl,
  getWhatsAppUrl
} from '../utils/appointmentUtils';

interface WhatsAppSchedulerProps {
  config: LawFirmConfig;
  initialPracticeArea?: PracticeAreaId;
  initialModality?: ConsultationModality;
  initialDescription?: string;
  onAppointmentCreated: (appointment: Appointment) => void;
}

export const WhatsAppScheduler: React.FC<WhatsAppSchedulerProps> = ({
  config,
  initialPracticeArea = 'trabalhista',
  initialModality = 'presencial',
  initialDescription = '',
  onAppointmentCreated,
}) => {
  // Wizard steps
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [selectedAreaId, setSelectedAreaId] = useState<PracticeAreaId>(initialPracticeArea);
  const [modality, setModality] = useState<ConsultationModality>(initialModality);
  
  // Date setup
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // If tomorrow is Sunday, advance to Monday
    if (d.getDay() === 0) {
      d.setDate(d.getDate() + 1);
    }
    return d.toISOString().slice(0, 10);
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(tomorrow);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00');

  // Client Details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [caseDescription, setCaseDescription] = useState<string>(initialDescription);

  // Status & Final preview
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Current calendar month view helper
  const [calendarDate, setCalendarDate] = useState<Date>(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const selectedArea = useMemo(() => {
    return PRACTICE_AREAS.find((a) => a.id === selectedAreaId) || PRACTICE_AREAS[0];
  }, [selectedAreaId]);

  // Check occupied slots from local storage
  const existingAppointments = useMemo(() => {
    return getStoredAppointments();
  }, [submittedAppointment]);

  const occupiedSlotsOnDate = useMemo(() => {
    return existingAppointments
      .filter((app) => app.date === selectedDate && app.status !== 'cancelado')
      .map((app) => app.timeSlot);
  }, [existingAppointments, selectedDate]);

  // Month calculations for mini calendar
  const daysInMonth = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: Array<{ day: number; dateStr: string; isPast: boolean; isSunday: boolean; isToday: boolean }> = [];
    const todayStr = new Date().toISOString().slice(0, 10);

    for (let i = 1; i <= totalDays; i++) {
      const dayDate = new Date(year, month, i);
      const mStr = String(month + 1).padStart(2, '0');
      const dStr = String(i).padStart(2, '0');
      const dateStr = `${year}-${mStr}-${dStr}`;
      const isSunday = dayDate.getDay() === 0;
      const isPast = dateStr < todayStr;
      const isToday = dateStr === todayStr;

      days.push({ day: i, dateStr, isPast, isSunday, isToday });
    }

    return { firstDayIndex, days, monthName: calendarDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) };
  }, [calendarDate]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBrazilianPhone(e.target.value);
    setClientPhone(formatted);
  };

  const validateStep3 = () => {
    if (!clientName.trim() || clientName.trim().length < 3) {
      setValidationError('Por favor, informe seu nome completo.');
      return false;
    }
    const cleanDigits = clientPhone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setValidationError('Por favor, informe um número de WhatsApp válido com DDD (ex: 61 98888-7777).');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleProceedToConfirmation = () => {
    if (!validateStep3()) return;

    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      referenceCode: generateReferenceCode(),
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      practiceAreaId: selectedAreaId,
      practiceAreaName: selectedArea.title,
      modality,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      caseDescription: caseDescription.trim() || 'Consulta geral de orientação jurídica.',
      status: 'pendente',
      createdAt: new Date().toISOString(),
    };

    saveAppointment(newAppointment);
    setSubmittedAppointment(newAppointment);
    onAppointmentCreated(newAppointment);
    setStep(4);
  };

  const handleOpenWhatsApp = () => {
    if (!submittedAppointment) return;
    const url = getWhatsAppUrl(submittedAppointment, config);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    if (!submittedAppointment) return;
    const formattedDate = formatBrazilianDate(submittedAppointment.date);
    const text = [
      `⚖️ *SOLICITAÇÃO DE AGENDAMENTO - ${config.firmName.toUpperCase()}*`,
      `Ref: #${submittedAppointment.referenceCode}`,
      `👤 *Cliente:* ${submittedAppointment.clientName}`,
      `📱 *WhatsApp:* ${submittedAppointment.clientPhone}`,
      `⚖️ *Área Jurídica:* ${submittedAppointment.practiceAreaName}`,
      `📍 *Modalidade:* ${submittedAppointment.modality === 'presencial' ? `Presencial em Ceilândia (${config.addressLine1})` : 'Online / Vídeo'}`,
      `📅 *Data Sugerida:* ${formattedDate}`,
      `⏰ *Horário:* ${submittedAppointment.timeSlot}`,
      `📝 *Assunto:* "${submittedAppointment.caseDescription}"`,
      `\nOlá, Dr. Francisco Filho! Solicitei este agendamento através do site e gostaria de confirmar.`
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  const resetForm = () => {
    setSubmittedAppointment(null);
    setStep(1);
    setCaseDescription('');
  };

  return (
    <section id="agendamento" className="py-16 bg-slate-950 border-y border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Sistema Dinâmico Integrado ao WhatsApp</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Agende sua Consulta com o <span className="text-amber-400">{config.lawyerName}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Escolha a especialidade, data e horário ideais. Ao concluir, nosso sistema prepara automaticamente sua solicitação oficial para envio com 1 clique diretamente no WhatsApp do escritório.
          </p>
        </div>

        {/* Wizard Stepper Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium">
            
            <button 
              id="scheduler-step-btn-1"
              onClick={() => step > 1 && !submittedAppointment && setStep(1)}
              className={`pb-2 border-b-2 transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                step === 1 
                  ? 'border-amber-400 text-amber-400 font-bold' 
                  : step > 1 
                    ? 'border-emerald-500 text-emerald-400' 
                    : 'border-slate-800 text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step > 1 ? 'bg-emerald-500 text-slate-950' : step === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {step > 1 ? <Check className="w-3 h-3" /> : '1'}
              </span>
              <span>Área Jurídica</span>
            </button>

            <button 
              id="scheduler-step-btn-2"
              onClick={() => step > 2 && !submittedAppointment && setStep(2)}
              className={`pb-2 border-b-2 transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                step === 2 
                  ? 'border-amber-400 text-amber-400 font-bold' 
                  : step > 2 
                    ? 'border-emerald-500 text-emerald-400' 
                    : 'border-slate-800 text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step > 2 ? 'bg-emerald-500 text-slate-950' : step === 2 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {step > 2 ? <Check className="w-3 h-3" /> : '2'}
              </span>
              <span>Data & Horário</span>
            </button>

            <button 
              id="scheduler-step-btn-3"
              onClick={() => step > 3 && !submittedAppointment && setStep(3)}
              className={`pb-2 border-b-2 transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                step === 3 
                  ? 'border-amber-400 text-amber-400 font-bold' 
                  : step > 3 
                    ? 'border-emerald-500 text-emerald-400' 
                    : 'border-slate-800 text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step > 3 ? 'bg-emerald-500 text-slate-950' : step === 3 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {step > 3 ? <Check className="w-3 h-3" /> : '3'}
              </span>
              <span>Seus Dados</span>
            </button>

            <div 
              className={`pb-2 border-b-2 transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                step === 4 
                  ? 'border-emerald-400 text-emerald-400 font-bold' 
                  : 'border-slate-800 text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 4 ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                4
              </span>
              <span>Confirmação</span>
            </div>

          </div>
        </div>

        {/* Wizard Container Card */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8">
          
          {/* STEP 1: Select Practice Area & Modality */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>1. Selecione a Área da sua Demanda</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Identifique o ramo jurídico do seu caso para que o Dr. Francisco Filho prepare a documentação adequada.
                </p>
              </div>

              {/* Practice Area Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {PRACTICE_AREAS.map((area) => {
                  const isSelected = selectedAreaId === area.id;
                  return (
                    <button
                      key={area.id}
                      id={`scheduler-area-opt-${area.id}`}
                      onClick={() => setSelectedAreaId(area.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-400 text-white shadow-md shadow-amber-950/30'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {area.id === 'previdenciario' ? 'INSS' : area.id.toUpperCase()}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                        </div>
                        <h4 className="font-bold text-sm text-slate-100">{area.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{area.shortDesc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Modality Selector */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white">Como você prefere ser atendido?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  <button
                    id="scheduler-modality-presencial-btn"
                    onClick={() => setModality('presencial')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      modality === 'presencial'
                        ? 'bg-emerald-950/30 border-emerald-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 ${
                      modality === 'presencial' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">Presencial no Escritório</span>
                        {modality === 'presencial' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {config.addressLine1}, {config.neighborhood}, Ceilândia - DF.
                      </p>
                    </div>
                  </button>

                  <button
                    id="scheduler-modality-online-btn"
                    onClick={() => setModality('online')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      modality === 'online'
                        ? 'bg-emerald-950/30 border-emerald-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 ${
                      modality === 'online' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">Online (Videochamada / WhatsApp)</span>
                        {modality === 'online' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Atendimento seguro e direto no celular de onde você estiver.
                      </p>
                    </div>
                  </button>

                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  id="scheduler-next-to-step-2-btn"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2"
                >
                  <span>Continuar para Data e Horário</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Interactive Date & Time Slot Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>2. Escolha o Dia e Horário Desejado</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Atendimento de Segunda a Sexta (08:30 às 18:00) e Sábados com agendamento prévio.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Calendar Column */}
                <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm text-slate-200 capitalize">
                      {daysInMonth.monthName}
                    </span>
                    <div className="flex gap-1">
                      <button
                        id="calendar-prev-month-btn"
                        onClick={() => {
                          const prev = new Date(calendarDate);
                          prev.setMonth(prev.getMonth() - 1);
                          setCalendarDate(prev);
                        }}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                        title="Mês anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        id="calendar-next-month-btn"
                        onClick={() => {
                          const next = new Date(calendarDate);
                          next.setMonth(next.getMonth() + 1);
                          setCalendarDate(next);
                        }}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                        title="Próximo mês"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day labels */}
                  <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500 mb-2">
                    <span>Dom</span>
                    <span>Seg</span>
                    <span>Ter</span>
                    <span>Qua</span>
                    <span>Qui</span>
                    <span>Sex</span>
                    <span>Sáb</span>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Padding blank days */}
                    {Array.from({ length: daysInMonth.firstDayIndex }).map((_, idx) => (
                      <div key={`blank-${idx}`} className="h-9" />
                    ))}

                    {/* Day buttons */}
                    {daysInMonth.days.map((d) => {
                      const isSelected = selectedDate === d.dateStr;
                      const isDisabled = d.isPast || d.isSunday;

                      return (
                        <button
                          key={d.dateStr}
                          id={`calendar-day-btn-${d.dateStr}`}
                          disabled={isDisabled}
                          onClick={() => setSelectedDate(d.dateStr)}
                          className={`h-9 rounded-lg text-xs font-medium transition-all flex items-center justify-center relative ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 font-bold shadow'
                              : isDisabled
                                ? 'text-slate-700 cursor-not-allowed'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          } ${d.isToday && !isSelected ? 'border border-amber-500/50 text-amber-400' : ''}`}
                        >
                          {d.day}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      Data selecionada: <strong className="text-white">{formatBrazilianDate(selectedDate)}</strong>
                    </span>
                    <span className="text-slate-500">Domingos fechado</span>
                  </div>
                </div>

                {/* Time Slots Column */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Horários Disponíveis</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-2">
                      {AVAILABLE_TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        const isOccupied = occupiedSlotsOnDate.includes(slot);

                        return (
                          <button
                            key={slot}
                            id={`scheduler-slot-btn-${slot.replace(':', '')}`}
                            disabled={isOccupied}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-between border ${
                              isOccupied
                                ? 'bg-slate-950/40 border-slate-900 text-slate-700 cursor-not-allowed line-through'
                                : isSelected
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                            }`}
                          >
                            <span>{slot}</span>
                            {isOccupied ? (
                              <span className="text-[10px] text-red-500/70 font-normal">Ocupado</span>
                            ) : isSelected ? (
                              <Check className="w-3.5 h-3.5 text-amber-400" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary of choice */}
                  <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <p className="flex justify-between">
                      <span className="text-slate-400">Modalidade:</span>
                      <strong className="text-amber-400 capitalize">{modality}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Data e Hora:</span>
                      <strong className="text-white">
                        {formatBrazilianDate(selectedDate)} às {selectedTimeSlot}
                      </strong>
                    </p>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  id="scheduler-back-to-step-1-btn"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  id="scheduler-next-to-step-3-btn"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2"
                >
                  <span>Avançar para Seus Dados</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details & Case Summary */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>3. Seus Dados de Contato e Resumo do Caso</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Estas informações constarão na mensagem que será aberta diretamente no seu WhatsApp para falar com o Dr. Francisco.
                </p>
              </div>

              {validationError && (
                <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Seu Nome Completo *</span>
                  </label>
                  <input
                    id="client-name-input"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: João da Silva Santos"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Seu WhatsApp (com DDD) *</span>
                  </label>
                  <input
                    id="client-phone-input"
                    type="tel"
                    value={clientPhone}
                    onChange={handlePhoneChange}
                    placeholder="(61) 98888-7777"
                    maxLength={15}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                {/* Optional Email */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>E-mail para envio de comprovante (opcional)</span>
                  </label>
                  <input
                    id="client-email-input"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Case Brief Description */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Breve resumo do seu problema ou dúvida jurídica</span>
                    </span>
                    <span className="text-[11px] text-slate-500">Sigilo protegido pela OAB</span>
                  </label>
                  <textarea
                    id="client-case-desc-input"
                    value={caseDescription}
                    onChange={(e) => setCaseDescription(e.target.value)}
                    rows={3}
                    placeholder="Ex: Fui demitido sem justa causa e a empresa não pagou minhas horas extras e rescisão..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

              </div>

              {/* Data protection assurance */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-850 flex items-center gap-2.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Seus dados são confidenciais e utilizados estritamente para o contato jurídico prévio de agendamento com o Dr. Francisco Filho.
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  id="scheduler-back-to-step-2-btn"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  id="scheduler-confirm-booking-btn"
                  onClick={handleProceedToConfirmation}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Gerar Agendamento e Ir ao WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Live Confirmation & WhatsApp Dispatch */}
          {step === 4 && submittedAppointment && (
            <div className="space-y-6">
              
              {/* Success Badge */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  Solicitação de Agendamento Pronta!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  Código de Referência: <span className="font-mono font-bold text-amber-400">#{submittedAppointment.referenceCode}</span>
                </p>
              </div>

              {/* WhatsApp Message Preview Card */}
              <div className="bg-slate-950 rounded-xl p-4 sm:p-5 border border-emerald-500/30 relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>Mensagem oficial que será enviada ao Dr. Francisco Filho</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    WhatsApp: {config.phone}
                  </span>
                </div>

                <div className="bg-slate-900/90 rounded-lg p-4 font-mono text-xs text-slate-200 leading-relaxed border border-slate-800 whitespace-pre-wrap selection:bg-emerald-500 selection:text-slate-950">
                  {`⚖️ *SOLICITAÇÃO DE AGENDAMENTO - ${config.firmName.toUpperCase()}*\n`}
                  {`Ref: #${submittedAppointment.referenceCode}\n`}
                  {`----------------------------------------\n`}
                  {`👤 *Cliente:* ${submittedAppointment.clientName}\n`}
                  {`📱 *WhatsApp:* ${submittedAppointment.clientPhone}\n`}
                  {submittedAppointment.clientEmail ? `✉️ *E-mail:* ${submittedAppointment.clientEmail}\n` : ''}
                  {`⚖️ *Área Jurídica:* ${submittedAppointment.practiceAreaName}\n`}
                  {`📍 *Modalidade:* ${submittedAppointment.modality === 'presencial' ? `Presencial em Ceilândia (${config.addressLine1})` : 'Online por Videoconferência'}\n`}
                  {`📅 *Data Sugerida:* ${formatBrazilianDate(submittedAppointment.date)}\n`}
                  {`⏰ *Horário:* ${submittedAppointment.timeSlot}\n`}
                  {`----------------------------------------\n`}
                  {`📝 *Resumo do Caso:* "${submittedAppointment.caseDescription}"\n`}
                  {`----------------------------------------\n`}
                  {`Olá, Dr. Francisco Filho! Acabei de solicitar este agendamento pelo site. Gostaria de confirmar a disponibilidade para o atendimento.`}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 justify-end">
                  <button
                    id="copy-whatsapp-message-btn"
                    onClick={handleCopyMessage}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Mensagem</span>
                      </>
                    )}
                  </button>

                  <a
                    id="add-to-google-calendar-btn"
                    href={createGoogleCalendarUrl(submittedAppointment, config)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lembrar no Google Agenda</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>

              {/* Main Call To Action: Open WhatsApp */}
              <div className="space-y-3">
                <button
                  id="final-open-whatsapp-dispatch-btn"
                  onClick={handleOpenWhatsApp}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-3 transform active:scale-98"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Abrir no WhatsApp e Confirmar Agora</span>
                  <ExternalLink className="w-4 h-4 text-emerald-200" />
                </button>

                <p className="text-center text-xs text-slate-400">
                  Clique no botão acima para abrir a conversa no aplicativo ou WhatsApp Web. Se preferir, você também pode salvar o número direto: <strong className="text-emerald-400">{config.phone}</strong>.
                </p>
              </div>

              {/* Start new appointment button */}
              <div className="text-center pt-2">
                <button
                  id="new-appointment-reset-btn"
                  onClick={resetForm}
                  className="text-xs text-slate-400 hover:text-amber-400 underline transition-colors"
                >
                  Fazer outro agendamento de consulta
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
