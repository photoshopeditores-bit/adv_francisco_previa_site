import { LawFirmConfig, PracticeArea, Review, FaqItem } from '../types';

export const DEFAULT_OFFICE_CONFIG: LawFirmConfig = {
  firmName: 'Francisco Filho Advocacia',
  lawyerName: 'Dr. Francisco Filho',
  oabNumber: 'OAB/DF',
  phone: '(61) 98452-3021',
  whatsappNumber: '5561984523021',
  email: 'contato@franciscofilho.adv.br',
  addressLine1: 'QNO 14, Conjunto F, Expansão do Setor O',
  neighborhood: 'Expansão do Setor O, Ceilândia',
  city: 'Ceilândia (Brasília)',
  state: 'DF',
  zipCode: '72255-203',
  googleMapsUrl: 'https://maps.app.goo.gl/q9LBSZYyyjVLQPSV7',
  latitude: -15.7890794,
  longitude: -48.1337764,
  mainPhotoUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnXSXssY4aq2tdG4SptXTmM33hzgvwaHow8HORIab5pEUyApFAy0hPZF8ZIwrK3s6L-f2zDzb6l30F2klE3hTkHzvcz3Yb85ymMut6sTn3sJuPP_lgnCFNYiyiJ1AZER0tNZGnzA64TgOmA=w800-h1066-k-no',
  workingHours: {
    weekdays: 'Segunda a Sexta: 08:30 às 18:00',
    saturday: 'Sábado: 08:30 às 12:30 (Plantão com hora marcada)',
    sunday: 'Domingo: Fechado (Plantão emergencial via WhatsApp)',
  },
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'trabalhista',
    title: 'Direito Trabalhista',
    shortDesc: 'Defesa incisiva de trabalhadores e assessoria para garantia de verbas rescisórias e direitos.',
    fullDesc: 'Atuação especializada na defesa de empregados e prestadores de serviços, buscando a reparação de abusos, pagamento integral de verbas e cumprimento da CLT.',
    icon: 'Briefcase',
    popularCases: [
      'Rescisão indireta e demissão sem justa causa',
      'Cálculo e cobrança de horas extras e adicional noturno',
      'Adicional de insalubridade e periculosidade',
      'Acidente de trabalho e indenização por estabilidade',
      'Assédio moral ou desvio de função no ambiente de trabalho'
    ],
    requiredDocs: [
      'Carteira de Trabalho (CTPS física ou digital)',
      'Termo de Rescisão (TRCT) se houver',
      'Últimos 3 contracheques / holerites',
      'Extrato analítico do FGTS',
      'Comprovantes de mensagens, e-mails ou testemunhas'
    ]
  },
  {
    id: 'previdenciario',
    title: 'Direito Previdenciário (INSS)',
    shortDesc: 'Concessão e revisão de aposentadorias, BPC/LOAS, pensão por morte e auxílios.',
    fullDesc: 'Assessoria completa em processos administrativos perante o INSS e ações judiciais na Justiça Federal para obtenção de benefícios bloqueados ou negados.',
    icon: 'ShieldCheck',
    popularCases: [
      'Aposentadoria por Idade, Tempo de Contribuição e Especial',
      'BPC / LOAS para Idosos e Pessoas com Deficiência de baixa renda',
      'Auxílio-Doença (Incapacidade Temporária) negado pelo INSS',
      'Pensão por Morte e Auxílio-Reclusão',
      'Planejamento Previdenciário e Revisão da Vida Toda'
    ],
    requiredDocs: [
      'Extrato CNIS atualizado (Meu INSS)',
      'Laudos, atestados médicos e receituários (para benefícios por incapacidade)',
      'Comprovante de residência atualizado',
      'Comprovante de inscrição no CadÚnico (para BPC/LOAS)',
      'Documento com foto (RG ou CNH) e CPF'
    ]
  },
  {
    id: 'familia',
    title: 'Direito de Família e Sucessões',
    shortDesc: 'Apoio humanizado e seguro em divórcios, partilhas, pensão alimentícia e inventários.',
    fullDesc: 'Condução cuidadosa de questões sensíveis com foco na pacificação, proteção do interesse de menores e preservação patrimonial da família.',
    icon: 'HeartHandshake',
    popularCases: [
      'Divórcio consensual em cartório ou litigioso judicial',
      'Fixação, revisão e execução de pensão alimentícia',
      'Guarda compartilhada, unilateral e regulamentação de visitas',
      'Inventário judicial e extrajudicial (partilha de bens)',
      'Reconhecimento e dissolução de união estável'
    ],
    requiredDocs: [
      'Certidão de casamento ou união estável atualizada',
      'Certidão de nascimento dos filhos',
      'Documentos dos bens (matrícula de imóveis, CRLV de veículos)',
      'Comprovantes de rendimentos das partes',
      'Comprovante de residência'
    ]
  },
  {
    id: 'consumidor',
    title: 'Direito do Consumidor',
    shortDesc: 'Combate a abusos de bancos, companhias aéreas, operadoras e inclusão indevida no SPC/Serasa.',
    fullDesc: 'Proteção jurídica contra práticas comerciais desleais, fraudes financeiras, cobranças indevidas e vícios em produtos ou serviços.',
    icon: 'Scale',
    popularCases: [
      'Limpeza de nome por negativação indevida (SPC/Serasa) com danos morais',
      'Golpes bancários (Pix fraudulento, empréstimo consignado não solicitado)',
      'Cobranças indevidas de operadoras de telefonia e concessionárias',
      'Atrasos de voo, cancelamento ou extravio de bagagem',
      'Defeitos em produtos não solucionados no prazo legal'
    ],
    requiredDocs: [
      'Comprovante da compra ou contratação (nota fiscal, contrato)',
      'Extratos bancários ou faturas demonstrando a cobrança/golpe',
      'Comprovante da negativação no SPC/Serasa',
      'Protocolos de atendimento e reclamações anteriores (Procon/Consumidor.gov)'
    ]
  },
  {
    id: 'civil',
    title: 'Direito Civil & Imobiliário',
    shortDesc: 'Elaboração de contratos blindados, ações possessórias, usucapião e cobranças.',
    fullDesc: 'Segurança jurídica para negociações, regularização fundiária no Distrito Federal, contratos de locação e reparação de danos civis.',
    icon: 'FileText',
    popularCases: [
      'Regularização de imóveis, usucapião e escrituras em Ceilândia/DF',
      'Ações de despejo, cobrança de aluguéis e renovatórias',
      'Contratos de compra e venda com cláusulas de proteção',
      'Cobrança judicial de dívidas, títulos e notas promissórias',
      'Indenização por danos materiais e morais'
    ],
    requiredDocs: [
      'Contratos vigentes ou cessão de direitos',
      'Documentos comprobatórios da posse ou titularidade do bem',
      'Comprovantes de pagamento, transferências ou extratos',
      'Notificações extrajudiciais prévias'
    ]
  },
  {
    id: 'criminal',
    title: 'Direito Criminal & Correspondente',
    shortDesc: 'Assistência imediata em delegacias do DF, audiências de custódia e diligências forenses.',
    fullDesc: 'Atuação combativa para garantia da ampla defesa e contraditório, além de correspondência jurídica para escritórios de outros estados no Distrito Federal.',
    icon: 'Gavel',
    popularCases: [
      'Acompanhamento imediato em flagrantes e oitivas policiais no DF',
      'Audiência de custódia e pedidos de liberdade provisória / revogação de prisão',
      'Habeas Corpus perante o TJDFT e Tribunais Superiores (STJ/STF)',
      'Defesa técnica em processos penais e tribunal do júri',
      'Diligências e cópias forenses para correspondentes jurídicos'
    ],
    requiredDocs: [
      'Boletim de ocorrência (se disponível)',
      'Número do inquérito policial ou do processo no PJe/TJDFT',
      'Documentos de identificação do investigado/réu',
      'Comprovante de residência fixa e trabalho lícito'
    ]
  }
];

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Marcos Vinicius Ribeiro',
    rating: 5,
    timeAgo: 'há 2 meses',
    text: 'Profissional de excelência! O Dr. Francisco me atendeu rapidamente pelo WhatsApp, tirou todas as dúvidas do meu processo trabalhista e resolveu o que estava travado há meses. Recomendo muito em Ceilândia!',
    serviceType: 'Direito Trabalhista',
    initials: 'MV'
  },
  {
    id: 'rev-2',
    author: 'Luciana Ferreira dos Santos',
    rating: 5,
    timeAgo: 'há 1 mês',
    text: 'Consegui o BPC/LOAS da minha mãe que tinha sido negado pelo INSS. O Dr. Francisco Filho foi extremamente paciente, ético e conduziu tudo com maestria na Justiça. Gratidão total!',
    serviceType: 'Direito Previdenciário (INSS)',
    initials: 'LF'
  },
  {
    id: 'rev-3',
    author: 'Antônio Carlos Mendes',
    rating: 5,
    timeAgo: 'há 3 semanas',
    text: 'Escritório muito bem localizado no Setor O, de fácil acesso. Agendamento prático pelo WhatsApp, sem burocracia. O Dr. Francisco explica cada detalhe da lei em linguagem clara.',
    serviceType: 'Consultoria Cível e Contratos',
    initials: 'AC'
  },
  {
    id: 'rev-4',
    author: 'Juliana Paiva de Alencar',
    rating: 5,
    timeAgo: 'há 4 meses',
    text: 'Excelente atendimento no meu divórcio e guarda do meu filho. Muita discrição, respeito e rapidez na homologação do acordo. Super recomendo o escritório!',
    serviceType: 'Direito de Família',
    initials: 'JP'
  },
  {
    id: 'rev-5',
    author: 'Raimundo Nonato Silva',
    rating: 5,
    timeAgo: 'há 5 meses',
    text: 'Resolveram uma negativação indevida do meu nome que um banco colocou sem meu conhecimento. Além de limparem o nome, conseguimos uma justa indenização. Muito honesto e competente.',
    serviceType: 'Direito do Consumidor',
    initials: 'RN'
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'agendamento',
    question: 'Como funciona o agendamento de consultas pelo WhatsApp?',
    answer: 'Você escolhe a área de interesse, a modalidade (Presencial em Ceilândia ou Online por videoconferência), a data e o horário desejado. Ao finalizar, o sistema formata automaticamente uma mensagem completa e abre seu WhatsApp com um clique para confirmação imediata com nossa equipe.'
  },
  {
    id: 'faq-2',
    category: 'agendamento',
    question: 'Posso ser atendido 100% online se não morar em Ceilândia ou no DF?',
    answer: 'Sim! Realizamos atendimentos jurídicos remotos para clientes em todo o Distrito Federal, Entorno e qualquer estado do Brasil através de videochamada segura (Google Meet ou WhatsApp) com assinatura digital de procuração e envio de documentos pelo celular.'
  },
  {
    id: 'faq-3',
    category: 'honorarios',
    question: 'Como funcionam os honorários advocatícios?',
    answer: 'Nossos honorários são pautados pela transparência, boa-fé e estrita observância da Tabela da OAB/DF. Em diversas ações trabalhistas e previdenciárias, dependendo da análise do caso, é possível trabalhar no modelo de êxito ("ad exitum"), onde os honorários são pagos ao final da causa.'
  },
  {
    id: 'faq-4',
    category: 'trabalhista',
    question: 'Fui demitido ou sofri assédio no trabalho. Qual o prazo para entrar com ação?',
    answer: 'Pela legislação trabalhista brasileira (CLT e Constituição Federal), o trabalhador tem até 2 anos após a rescisão do contrato de trabalho para ajuizar uma Reclamatória Trabalhista, podendo cobrar os direitos relativos aos últimos 5 anos trabalhados.'
  },
  {
    id: 'faq-5',
    category: 'previdenciario',
    question: 'O INSS negou meu pedido de auxílio ou aposentadoria. O que fazer?',
    answer: 'Quando o INSS indefere um benefício injustamente, você não precisa se conformar. Podemos ingressar com um Recurso Administrativo ou propor Ação Judicial na Justiça Federal, onde você passará por perícia médica imparcial designada pelo juiz.'
  },
  {
    id: 'faq-6',
    category: 'geral',
    question: 'O escritório atua como Correspondente Jurídico em Brasília?',
    answer: 'Sim. Realizamos cópias forenses, protocolos, despachos com magistrados, distribuição de recursos e representação em audiências presenciais ou telepresenciais no TJDFT, TRF-1, TRT-10 e Tribunais Superiores.'
  }
];

export const AVAILABLE_TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00'
];
