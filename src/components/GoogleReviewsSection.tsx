import React from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle, Quote } from 'lucide-react';
import { Review, LawFirmConfig } from '../types';
import { GOOGLE_REVIEWS } from '../data/officeData';

interface GoogleReviewsSectionProps {
  config: LawFirmConfig;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({ config }) => {
  return (
    <section id="avaliacoes" className="py-20 bg-slate-900/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Avaliações Verificadas no Google Maps</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              O que Nossos Clientes Dizem
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              A confiança conquistada em cada causa reflete nosso compromisso inegociável com a ética, transparência e resultados.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="text-center">
              <span className="font-heading text-3xl font-extrabold text-amber-400 block leading-none">5.0</span>
              <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="h-10 w-[1px] bg-slate-800" />

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <span>Google Maps</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <a
                id="review-google-maps-btn"
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 underline font-medium flex items-center gap-1 mt-0.5"
              >
                <span>Ver no Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOOGLE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between relative shadow-md"
            >
              <div>
                {/* Rating stars & Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">{review.timeAgo}</span>
                </div>

                {/* Review Text */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-slate-800 absolute -top-2 -left-1 opacity-50" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10 pl-2">
                    "{review.text}"
                  </p>
                </div>
              </div>

              {/* Author & Service info */}
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-slate-950 font-bold text-xs flex items-center justify-center">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{review.author}</h4>
                    <span className="text-[11px] text-amber-400/90 block">{review.serviceType}</span>
                  </div>
                </div>

                <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-emerald-400" title="Avaliação Verificada">
                  ✓
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Call to leave a review */}
        <div className="mt-12 text-center">
          <a
            id="leave-review-on-google-maps-btn"
            href={config.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Já é nosso cliente? Deixe também sua avaliação no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

      </div>
    </section>
  );
};
