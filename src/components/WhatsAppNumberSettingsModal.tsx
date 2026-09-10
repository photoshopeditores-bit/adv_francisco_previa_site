import React, { useState } from 'react';
import { X, Settings, Phone, MessageCircle, MapPin, Check, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { LawFirmConfig } from '../types';
import { DEFAULT_OFFICE_CONFIG } from '../data/officeData';
import { saveStoredConfig } from '../utils/appointmentUtils';

interface WhatsAppNumberSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LawFirmConfig;
  onConfigUpdated: (newConfig: LawFirmConfig) => void;
}

export const WhatsAppNumberSettingsModal: React.FC<WhatsAppNumberSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated,
}) => {
  const [formData, setFormData] = useState<LawFirmConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredConfig(formData);
    onConfigUpdated(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar as configurações originais de Francisco Filho Advocacia baseadas no Google Maps?')) {
      setFormData(DEFAULT_OFFICE_CONFIG);
      saveStoredConfig(DEFAULT_OFFICE_CONFIG);
      onConfigUpdated(DEFAULT_OFFICE_CONFIG);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">
                Configurações de Contato & WhatsApp
              </h3>
              <p className="text-xs text-slate-400">
                Ajuste os dados de recebimento das mensagens do site
              </p>
            </div>
          </div>

          <button
            id="close-settings-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Número de WhatsApp do Escritório (com DDD, somente números) *</span>
            </label>
            <input
              id="settings-whatsapp-input"
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="Ex: 5561984523021"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
              required
            />
            <span className="text-[11px] text-slate-500 block">
              Formato internacional com DDI (55) + DDD (61) + número.
            </span>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Telefone Exibido (Formatado):</label>
            <input
              id="settings-phone-display-input"
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(61) 98452-3021"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Nome do Advogado:</label>
              <input
                id="settings-lawyer-name-input"
                type="text"
                value={formData.lawyerName}
                onChange={(e) => setFormData({ ...formData, lawyerName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Registro OAB:</label>
              <input
                id="settings-oab-input"
                type="text"
                value={formData.oabNumber}
                onChange={(e) => setFormData({ ...formData, oabNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>URL da Foto Principal (Google Maps / Perfil):</span>
            </label>
            <div className="flex gap-2.5 items-center">
              {formData.mainPhotoUrl && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-amber-500/40 shrink-0 bg-slate-950">
                  <img 
                    src={formData.mainPhotoUrl} 
                    alt="Preview" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <input
                id="settings-photo-url-input"
                type="url"
                value={formData.mainPhotoUrl}
                onChange={(e) => setFormData({ ...formData, mainPhotoUrl: e.target.value })}
                placeholder="https://lh3.googleusercontent.com/..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              Foto oficial exibida no cabeçalho e na apresentação do escritório.
            </span>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Endereço em Ceilândia (Google Maps):</span>
            </label>
            <input
              id="settings-address-input"
              type="text"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
              required
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              id="settings-reset-btn"
              onClick={handleResetToDefault}
              className="px-3 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Padrão Maps</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300"
              >
                Cancelar
              </button>

              <button
                type="submit"
                id="settings-save-btn"
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Salvo!</span>
                  </>
                ) : (
                  <span>Salvar Alterações</span>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
