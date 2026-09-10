export type PracticeAreaId = 
  | 'trabalhista'
  | 'previdenciario'
  | 'familia'
  | 'consumidor'
  | 'civil'
  | 'criminal';

export interface PracticeArea {
  id: PracticeAreaId;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  popularCases: string[];
  requiredDocs: string[];
}

export type ConsultationModality = 'presencial' | 'online';

export type AppointmentStatus = 'pendente' | 'confirmado' | 'concluido' | 'cancelado';

export interface Appointment {
  id: string;
  referenceCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  practiceAreaId: PracticeAreaId;
  practiceAreaName: string;
  modality: ConsultationModality;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00"
  caseDescription: string;
  status: AppointmentStatus;
  createdAt: string; // ISO string
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  text: string;
  serviceType: string;
  initials: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'agendamento' | 'trabalhista' | 'previdenciario' | 'honorarios' | 'geral';
}

export interface LawFirmConfig {
  firmName: string;
  lawyerName: string;
  oabNumber: string;
  phone: string;
  whatsappNumber: string; // digits only or formatted
  email: string;
  addressLine1: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  googleMapsUrl: string;
  latitude: number;
  longitude: number;
  mainPhotoUrl: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}
