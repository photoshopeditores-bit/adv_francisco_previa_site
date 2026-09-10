import { Appointment, LawFirmConfig } from '../types';
import { DEFAULT_OFFICE_CONFIG } from '../data/officeData';

const APPOINTMENTS_STORAGE_KEY = 'ffa_appointments_v1';
const CONFIG_STORAGE_KEY = 'ffa_firm_config_v1';

export function getStoredConfig(): LawFirmConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_OFFICE_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_OFFICE_CONFIG,
      ...parsed,
      mainPhotoUrl: parsed.mainPhotoUrl || DEFAULT_OFFICE_CONFIG.mainPhotoUrl,
    };
  } catch {
    return DEFAULT_OFFICE_CONFIG;
  }
}

export function saveStoredConfig(config: LawFirmConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config:', e);
  }
}

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) return getInitialDemoAppointments();
    return JSON.parse(raw);
  } catch {
    return getInitialDemoAppointments();
  }
}

export function saveAppointment(appointment: Appointment): void {
  try {
    const current = getStoredAppointments();
    const updated = [appointment, ...current.filter((a) => a.id !== appointment.id)];
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save appointment:', e);
  }
}

export function updateAppointmentStatus(id: string, status: Appointment['status'], notes?: string): void {
  try {
    const current = getStoredAppointments();
    const updated = current.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
        };
      }
      return item;
    });
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update status:', e);
  }
}

export function deleteAppointment(id: string): void {
  try {
    const current = getStoredAppointments();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete appointment:', e);
  }
}

export function generateReferenceCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FFA-${result}`;
}

export function formatBrazilianDate(isoDateStr: string): string {
  if (!isoDateStr) return '';
  const [year, month, day] = isoDateStr.split('-');
  if (!year || !month || !day) return isoDateStr;
  return `${day}/${month}/${year}`;
}

export function formatBrazilianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export function cleanPhoneForWhatsApp(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    digits = digits.substring(1);
  }
  if (!digits.startsWith('55') && (digits.length === 10 || digits.length === 11)) {
    digits = `55${digits}`;
  }
  return digits;
}

export function buildWhatsAppMessage(appointment: Appointment, config: LawFirmConfig): string {
  const formattedDate = formatBrazilianDate(appointment.date);
  const modalityText =
    appointment.modality === 'presencial'
      ? `Presencial no Escritório (${config.addressLine1}, ${config.city})`
      : 'Online por Videoconferência / WhatsApp';

  const message = [
    `⚖️ *SOLICITAÇÃO DE AGENDAMENTO DE CONSULTA*`,
    `*${config.firmName}*`,
    `Ref: #${appointment.referenceCode}`,
    `----------------------------------------`,
    `👤 *Cliente:* ${appointment.clientName}`,
    `📱 *WhatsApp:* ${appointment.clientPhone}`,
    ...(appointment.clientEmail ? [`✉️ *E-mail:* ${appointment.clientEmail}`] : []),
    `⚖️ *Área Jurídica:* ${appointment.practiceAreaName}`,
    `📍 *Modalidade:* ${modalityText}`,
    `📅 *Data Sugerida:* ${formattedDate}`,
    `⏰ *Horário:* ${appointment.timeSlot}`,
    `----------------------------------------`,
    `📝 *Resumo do Caso:*`,
    `"${appointment.caseDescription.trim()}"`,
    `----------------------------------------`,
    `Olá, Dr. Francisco Filho! Acabei de solicitar este agendamento pelo site. Gostaria de confirmar a disponibilidade para a data e horário acima. Aguardo orientações!`,
  ].join('\n');

  return message;
}

export function getWhatsAppUrl(appointment: Appointment, config: LawFirmConfig): string {
  const cleanTargetNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
  const text = buildWhatsAppMessage(appointment, config);
  return `https://wa.me/${cleanTargetNumber}?text=${encodeURIComponent(text)}`;
}

export function createGoogleCalendarUrl(appointment: Appointment, config: LawFirmConfig): string {
  const [year, month, day] = appointment.date.split('-');
  const [hour, minute] = appointment.timeSlot.split(':');
  
  if (!year || !month || !day || !hour) return '#';

  const startHourNum = parseInt(hour, 10);
  const endHourNum = startHourNum + 1;
  const startHourStr = startHourNum.toString().padStart(2, '0');
  const endHourStr = endHourNum.toString().padStart(2, '0');

  // Format YYYYMMDDTHHMMSS
  const startIso = `${year}${month}${day}T${startHourStr}${minute || '00'}00`;
  const endIso = `${year}${month}${day}T${endHourStr}${minute || '00'}00`;

  const title = `Consulta Jurídica - ${config.firmName} (${appointment.practiceAreaName})`;
  const location =
    appointment.modality === 'presencial'
      ? `${config.addressLine1}, ${config.neighborhood}, ${config.city} - ${config.state}`
      : 'Atendimento Online / WhatsApp';
  
  const details = `Consulta jurídica agendada com ${config.lawyerName} (${config.firmName}).\nCódigo: #${appointment.referenceCode}\nÁrea: ${appointment.practiceAreaName}\nModalidade: ${location}\nContato: ${config.phone}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

function getInitialDemoAppointments(): Appointment[] {
  return [
    {
      id: 'demo-1',
      referenceCode: 'FFA-9812',
      clientName: 'Eduardo Guimarães',
      clientPhone: '(61) 99123-4567',
      clientEmail: 'eduardo.guimaraes@email.com',
      practiceAreaId: 'trabalhista',
      practiceAreaName: 'Direito Trabalhista',
      modality: 'presencial',
      date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      timeSlot: '10:00',
      caseDescription: 'Dúvidas sobre rescisão indireta por falta de pagamento de FGTS e horas extras não computadas.',
      status: 'confirmado',
      createdAt: new Date().toISOString(),
      notes: 'Cliente trará carteira de trabalho e holerites no dia.',
    },
    {
      id: 'demo-2',
      referenceCode: 'FFA-4321',
      clientName: 'Maria de Fátima Souza',
      clientPhone: '(61) 98765-4321',
      practiceAreaId: 'previdenciario',
      practiceAreaName: 'Direito Previdenciário (INSS)',
      modality: 'online',
      date: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      timeSlot: '15:00',
      caseDescription: 'Pedido de BPC/LOAS para idosa de 67 anos indeferido administrativamente pelo INSS.',
      status: 'pendente',
      createdAt: new Date().toISOString(),
      notes: '',
    }
  ];
}
