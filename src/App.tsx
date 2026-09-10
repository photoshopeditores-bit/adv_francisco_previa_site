/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PracticeAreasSection } from './components/PracticeAreasSection';
import { WhatsAppScheduler } from './components/WhatsAppScheduler';
import { LegalRightsSimulator } from './components/LegalRightsSimulator';
import { OfficeLocationSection } from './components/OfficeLocationSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AppointmentsManagerModal } from './components/AppointmentsManagerModal';
import { WhatsAppNumberSettingsModal } from './components/WhatsAppNumberSettingsModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { LawFirmConfig, PracticeAreaId, ConsultationModality, Appointment } from './types';
import { getStoredConfig, getStoredAppointments } from './utils/appointmentUtils';

export default function App() {
  const [config, setConfig] = useState<LawFirmConfig>(getStoredConfig);
  const [appointments, setAppointments] = useState<Appointment[]>(getStoredAppointments);
  
  // Modals state
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Pre-fill state for the WhatsApp scheduler
  const [schedulerArea, setSchedulerArea] = useState<PracticeAreaId>('trabalhista');
  const [schedulerModality, setSchedulerModality] = useState<ConsultationModality>('presencial');
  const [schedulerDescription, setSchedulerDescription] = useState<string>('');

  // Key for re-rendering scheduler when prefilled from simulator or practice area
  const [schedulerKey, setSchedulerKey] = useState<number>(0);

  const refreshAppointments = () => {
    setAppointments(getStoredAppointments());
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenScheduler = () => {
    handleNavigateSection('agendamento');
  };

  const handleSelectAreaForScheduling = (areaId: PracticeAreaId) => {
    setSchedulerArea(areaId);
    setSchedulerKey((prev) => prev + 1);
    handleNavigateSection('agendamento');
  };

  const handleTransferSimulationToScheduler = (areaId: PracticeAreaId, description: string) => {
    setSchedulerArea(areaId);
    setSchedulerDescription(description);
    setSchedulerKey((prev) => prev + 1);
    handleNavigateSection('agendamento');
  };

  const handleOpenSchedulerPresencial = () => {
    setSchedulerModality('presencial');
    setSchedulerKey((prev) => prev + 1);
    handleNavigateSection('agendamento');
  };

  const handleAppointmentCreated = (newApp: Appointment) => {
    refreshAppointments();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        config={config}
        appointmentCount={appointments.length}
        onOpenScheduler={handleOpenScheduler}
        onOpenAppointmentsManager={() => setIsManagerOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          config={config}
          onOpenScheduler={handleOpenScheduler}
          onNavigateToSimulator={() => handleNavigateSection('triagem')}
          onNavigateToLocation={() => handleNavigateSection('localizacao')}
        />

        {/* 2. Practice Areas Section */}
        <PracticeAreasSection
          onSelectAreaForScheduling={handleSelectAreaForScheduling}
        />

        {/* 3. Core Dynamic Feature: WhatsApp Scheduling Engine */}
        <WhatsAppScheduler
          key={schedulerKey}
          config={config}
          initialPracticeArea={schedulerArea}
          initialModality={schedulerModality}
          initialDescription={schedulerDescription}
          onAppointmentCreated={handleAppointmentCreated}
        />

        {/* 4. Interactive Legal Rights Simulator / Pre-consultation Triage */}
        <LegalRightsSimulator
          onTransferToScheduler={handleTransferSimulationToScheduler}
        />

        {/* 5. Google Maps Showcase & Office Location (Ceilândia - DF) */}
        <OfficeLocationSection
          config={config}
          onOpenSchedulerPresencial={handleOpenSchedulerPresencial}
        />

        {/* 6. Google Maps Client Reviews */}
        <GoogleReviewsSection
          config={config}
        />

        {/* 7. Interactive FAQs */}
        <FaqSection
          onOpenScheduler={handleOpenScheduler}
        />

      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenAppointmentsManager={() => setIsManagerOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Appointments Management Drawer / Modal */}
      <AppointmentsManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        appointments={appointments}
        config={config}
        onAppointmentsUpdated={refreshAppointments}
      />

      {/* WhatsApp Target Number & Firm Settings Modal */}
      <WhatsAppNumberSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onConfigUpdated={(newCfg) => setConfig(newCfg)}
      />

      {/* Floating Action Button for Quick WhatsApp Access */}
      <FloatingWhatsAppButton
        config={config}
        onOpenScheduler={handleOpenScheduler}
        onOpenLocation={() => handleNavigateSection('localizacao')}
      />

    </div>
  );
}
