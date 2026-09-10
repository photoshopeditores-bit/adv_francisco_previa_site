import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  MessageCircle,
  RotateCcw
} from 'lucide-react';
import { PracticeAreaId } from '../types';

interface LegalRightsSimulatorProps {
  onTransferToScheduler: (areaId: PracticeAreaId, description: string) => void;
}

type SimulatorType = 'trabalhista' | 'previdenciario' | 'consumidor';

export const LegalRightsSimulator: React.FC<LegalRightsSimulatorProps> = ({
  onTransferToScheduler,
}) => {
  const [activeTab, setActiveTab] = useState<SimulatorType>('trabalhista');

  // Trabalhista State
  const [tempoTrabalho, setTempoTrabalho] = useState<'menos_1_ano' | '1_a_3_anos' | 'mais_3_anos'>('1_a_3_anos');
  const [motivoSaida, setMotivoSaida] = useState<'demitido_sem_justa_causa' | 'pediu_demissao' | 'trabalhando_sob_abuso'>('demitido_sem_justa_causa');
  const [teveHorasExtras, setTeveHorasExtras] = useState(true);
  const [carteiraAssinada, setCarteiraAssinada] = useState(true);

  // Previdenciário State
  const [idade, setIdade] = useState(62);
  const [genero, setGenero] = useState<'homem' | 'mulher'>('mulher');
  const [temProblemaSaude, setTemProblemaSaude] = useState(false);
  const [rendaFamiliarBaixa, setRendaFamiliarBaixa] = useState(true);

  // Consumidor State
  const [tipoAbuso, setTipoAbuso] = useState<'spc_serasa_indevido' | 'golpe_bancario_pix' | 'cobranca_indevida'>('spc_serasa_indevido');
  const [tentouResolver, setTentouResolver] = useState(true);

  // Results calculation
  const getTrabalhistaResult = () => {
    const points: string[] = [];
    if (motivoSaida === 'demitido_sem_justa_causa') {
      points.push('Direito a Aviso Prévio indenizado, 13º salário proporcional e férias + 1/3.');
      points.push('Liberação das guias para saque do FGTS + Multa rescisória de 40%.');
      points.push('Habilitação no Seguro-Desemprego pelo Ministério do Trabalho.');
    } else if (motivoSaida === 'trabalhando_sob_abuso') {
      points.push('Forte indício para pleitear Rescisão Indireta (a "justa causa" do empregador).');
      points.push('Garantia de recebimento de todas as verbas como se demitido fosse.');
    }

    if (teveHorasExtras) {
      points.push('Cobrança dos adicionais de horas extras com reflexos em DSR, férias, 13º e FGTS.');
    }

    if (!carteiraAssinada) {
      points.push('Ação para reconhecimento de Vínculo Empregatício com anotação retroativa na CTPS.');
    }

    return {
      severity: 'high',
      title: 'Alta Probabilidade de Direitos Não Pagos',
      points,
      recommendedDescription: `Simulação Trabalhista: Saída (${motivoSaida.replace(/_/g, ' ')}), tempo (${tempoTrabalho.replace(/_/g, ' ')}), horas extras (${teveHorasExtras ? 'sim' : 'não'}), carteira (${carteiraAssinada ? 'assinada' : 'sem registro'}). Solicito análise do cálculo rescisório.`
    };
  };

  const getPrevidenciarioResult = () => {
    const points: string[] = [];
    const isIdosaAposentavel = (genero === 'mulher' && idade >= 62) || (genero === 'homem' && idade >= 65);

    if (isIdosaAposentavel) {
      points.push(`Você já atingiu a idade mínima regulamentar (${genero === 'mulher' ? '62 anos' : '65 anos'}) para aposentadoria por idade urbana.`);
    }

    if (rendaFamiliarBaixa && (idade >= 65 || temProblemaSaude)) {
      points.push('Elegível para requerer o BPC / LOAS (1 salário mínimo mensal), mesmo sem ter contribuído para o INSS.');
    }

    if (temProblemaSaude) {
      points.push('Possibilidade de requerer Auxílio por Incapacidade Temporária ou Aposentadoria por Invalidez com perícia.');
    }

    return {
      severity: isIdosaAposentavel || (rendaFamiliarBaixa && idade >= 65) ? 'high' : 'medium',
      title: 'Indício de Benefício Previdenciário Concedível',
      points: points.length > 0 ? points : ['Recomendamos um Planejamento Previdenciário detalhado para simular o tempo de contribuição exato.'],
      recommendedDescription: `Simulação INSS: Idade ${idade} anos (${genero}), baixa renda (${rendaFamiliarBaixa ? 'sim' : 'não'}), questão de saúde (${temProblemaSaude ? 'sim' : 'não'}). Gostaria de verificar concessão ou recurso de benefício.`
    };
  };

  const getConsumidorResult = () => {
    const points: string[] = [];
    if (tipoAbuso === 'spc_serasa_indevido') {
      points.push('A jurisprudência do STJ e TJDFT reconhece que negativação indevida gera dano moral presumido (in re ipsa).');
      points.push('Pedido de liminar com urgência para retirada imediata do seu CPF dos órgãos de proteção ao crédito sob pena de multa diária.');
      points.push('Ação indenizatória com ressarcimento dos prejuízos.');
    } else if (tipoAbuso === 'golpe_bancario_pix') {
      points.push('Responsabilidade objetiva da instituição financeira por falha de segurança (Súmula 479 do STJ).');
      points.push('Tentativa de bloqueio cautelar e ação de restituição de valores transferidos.');
    } else {
      points.push('Direito à repetição de indébito (devolução em dobro do valor pago indevidamente, art. 42 do CDC).');
    }

    return {
      severity: 'high',
      title: 'Direito à Reparação e Limpeza de Nome',
      points,
      recommendedDescription: `Simulação Consumidor: Caso de ${tipoAbuso.replace(/_/g, ' ')}. Tentou resolver administrativamente: ${tentouResolver ? 'Sim' : 'Não'}. Solicito auxílio para exclusão de negativação ou ação de indenização.`
    };
  };

  const currentResult = activeTab === 'trabalhista' 
    ? getTrabalhistaResult() 
    : activeTab === 'previdenciario' 
      ? getPrevidenciarioResult() 
      : getConsumidorResult();

  return (
    <section id="triagem" className="py-20 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ferramenta Interativa Gratuita</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Triagem Rápida & Simulador de Direitos
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Responda algumas perguntas rápidas sobre sua situação para obter um diagnóstico jurídico preliminar antes de agendar sua consulta com o Dr. Francisco Filho.
          </p>
        </div>

        {/* Simulator Box */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-800 mb-8 overflow-x-auto gap-2">
            <button
              id="sim-tab-trabalhista-btn"
              onClick={() => setActiveTab('trabalhista')}
              className={`pb-3 px-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'trabalhista'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Causas Trabalhistas</span>
            </button>

            <button
              id="sim-tab-previdenciario-btn"
              onClick={() => setActiveTab('previdenciario')}
              className={`pb-3 px-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'previdenciario'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Aposentadoria / INSS / LOAS</span>
            </button>

            <button
              id="sim-tab-consumidor-btn"
              onClick={() => setActiveTab('consumidor')}
              className={`pb-3 px-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'consumidor'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Nome Negativado & Consumidor</span>
            </button>
          </div>

          {/* Form & Dynamic Output Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form inputs */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* TRABALHISTA FORM */}
              {activeTab === 'trabalhista' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Qual foi a forma de rescisão / situação?</label>
                    <select
                      id="sim-trab-motivo-select"
                      value={motivoSaida}
                      onChange={(e) => setMotivoSaida(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="demitido_sem_justa_causa">Fui demitido sem justa causa pela empresa</option>
                      <option value="trabalhando_sob_abuso">Estou trabalhando, mas sofrendo abusos / atrasos (Rescisão Indireta)</option>
                      <option value="pediu_demissao">Pedi demissão</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Quanto tempo você trabalhou na empresa?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'menos_1_ano', label: 'Menos de 1 ano' },
                        { id: '1_a_3_anos', label: '1 a 3 anos' },
                        { id: 'mais_3_anos', label: 'Mais de 3 anos' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          id={`sim-trab-tempo-${t.id}`}
                          onClick={() => setTempoTrabalho(t.id as any)}
                          className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all ${
                            tempoTrabalho === t.id
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-300">
                      <input
                        type="checkbox"
                        id="sim-trab-horas-extras-check"
                        checked={teveHorasExtras}
                        onChange={(e) => setTeveHorasExtras(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                      />
                      <span>Trabalhou além da jornada normal ou fez horas extras não pagas?</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-300">
                      <input
                        type="checkbox"
                        id="sim-trab-carteira-check"
                        checked={carteiraAssinada}
                        onChange={(e) => setCarteiraAssinada(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                      />
                      <span>Carteira de Trabalho (CTPS) foi devidamente assinada?</span>
                    </label>
                  </div>
                </>
              )}

              {/* PREVIDENCIARIO FORM */}
              {activeTab === 'previdenciario' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Sua Idade:</label>
                      <input
                        id="sim-prev-idade-input"
                        type="number"
                        min={18}
                        max={100}
                        value={idade}
                        onChange={(e) => setIdade(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Gênero:</label>
                      <select
                        id="sim-prev-genero-select"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white"
                      >
                        <option value="mulher">Mulher</option>
                        <option value="homem">Homem</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-300">
                      <input
                        type="checkbox"
                        id="sim-prev-renda-check"
                        checked={rendaFamiliarBaixa}
                        onChange={(e) => setRendaFamiliarBaixa(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500"
                      />
                      <span>Família de baixa renda (CadÚnico / renda por pessoa inferior a 1/4 do salário mínimo)?</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-300">
                      <input
                        type="checkbox"
                        id="sim-prev-saude-check"
                        checked={temProblemaSaude}
                        onChange={(e) => setTemProblemaSaude(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500"
                      />
                      <span>Possui doença incapacitante para o trabalho ou deficiência física/mental?</span>
                    </label>
                  </div>
                </>
              )}

              {/* CONSUMIDOR FORM */}
              {activeTab === 'consumidor' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Qual foi o problema ocorrido?</label>
                    <select
                      id="sim-cons-problema-select"
                      value={tipoAbuso}
                      onChange={(e) => setTipoAbuso(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="spc_serasa_indevido">Nome negativado indevidamente no SPC/Serasa (dívida não contratada ou já quitada)</option>
                      <option value="golpe_bancario_pix">Fraude bancária / Golpe do Pix / Empréstimo não autorizado</option>
                      <option value="cobranca_indevida">Cobrança abusiva de telefonia, plano de saúde ou fornecedora de energia/água</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-300">
                      <input
                        type="checkbox"
                        id="sim-cons-tentou-resolver-check"
                        checked={tentouResolver}
                        onChange={(e) => setTentouResolver(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500"
                      />
                      <span>Já tentou contato com a empresa ou possui números de protocolo?</span>
                    </label>
                  </div>
                </>
              )}

            </div>

            {/* Dynamic Diagnosis Result Column */}
            <div className="lg:col-span-6 bg-slate-950/90 rounded-xl p-5 border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Resultado da Análise Preliminar</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                  Viável
                </span>
              </div>

              <h4 className="font-heading text-lg font-bold text-white">
                {currentResult.title}
              </h4>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                {currentResult.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 italic">
                * Este simulador gera uma triagem informativa e não substitui a consulta jurídica formal com o advogado, regulamentada pelo Código de Ética da OAB.
              </p>

              {/* Transfer to WhatsApp Scheduler CTA */}
              <button
                id="sim-transfer-to-scheduler-btn"
                onClick={() => {
                  onTransferToScheduler(activeTab, currentResult.recommendedDescription);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Agendar com Estes Dados no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
