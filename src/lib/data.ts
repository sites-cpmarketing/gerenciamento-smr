import type { CampaignPlan } from '@/lib/types';

export const campaignPlanData: CampaignPlan = {
  strategy: {
    title: "Estratégia e Metas",
    description: "O foco central da Fase 1 é a validação da oferta e do funil de vendas dos produtos de entrada (E-book e Treinamento). A meta principal é atingir um Retorno Sobre o Investimento (ROI) de pelo menos 1.0. Isso significa que, para cada real investido em anúncios, deve retornar pelo menos um real em vendas, provando a sustentabilidade do modelo antes de escalar o investimento.",
  },
  kpis: [
    { metric: 'CPL', target: "≤ R$ 4,00" },
    { metric: 'CTR', target: "≥ 0,9%" },
    { metric: 'CPA', target: "E-book: ≤ R$ 20,00" },
    { metric: 'CPA', target: "Treinamento: ≤ R$ 70,00" },
  ],
  offers: [
    {
      id: 'offer-1',
      title: "E-book Mind$ell",
      price: "R$ 19,90",
      positioning: "Um guia prático e direto para vendedores e empreendedores que desejam resultados rápidos, aprendendo a usar gatilhos mentais para aumentar suas vendas imediatamente.",
      valueProposition: "“Aprenda 5 gatilhos mentais poderosos para vender mais em menos de 1 hora de leitura.”",
    },
    {
      id: 'offer-2',
      title: "Treinamento Mind$ell",
      price: "R$ 97,00",
      positioning: "O treinamento completo para quem quer dominar técnicas avançadas de vendas e PNL, transformando sua abordagem comercial e fechando negócios com mais confiança e eficácia.",
      valueProposition: "“Domine técnicas de vendas e PNL para fechar negócios mais rápido e persuadir clientes — 100% online, no seu ritmo.”",
    },
  ],
  campaigns: [
    {
      id: 'camp-1',
      title: "Campanha 1: Captação Direta (Tráfego Frio)",
      product: "E-book Mind$ell",
      platform: "Meta Ads",
      budget: "R$ 12,00/dia",
      description: "Objetivo: Conversão (Compra). Esta campanha é o motor principal para atrair novos clientes com o E-book de baixo custo (R$ 19,90) para validar a oferta e o público.",
      execution: {
        audience: {
          title: "Público Principal (Interesses)",
          description: "Segmentação Detalhada > Interesses: 'Vendas', 'Técnicas de Vendas', 'Negociação', 'Programação Neurolinguística (PNL)', 'Persuasão', 'Empreendedorismo', 'Hotmart'. Interesses em autores: 'Tony Robbins', 'Dale Carnegie', 'Robert Cialdini'."
        },
        creatives: [
            {
              id: 'cr-1-1',
              format: 'Imagem Estática',
              title: "Venda Mais com Gatilhos Mentais",
              description: "Use uma imagem de impacto com o título do e-book em destaque. Texto de apoio: 'Descubra 5 gatilhos mentais para aplicar hoje e aumentar suas vendas. Baixe o guia completo por apenas R$ 19,90.'",
              purpose: "Foco no benefício direto (vender mais) e na rapidez. Ideal para quem busca resultados imediatos."
            },
            {
              id: 'cr-1-2',
              format: 'Vídeo',
              title: "Seus Clientes Dizem 'Não'?",
              description: "Vídeo curto (15-30s) mostrando uma pessoa frustrada com vendas e depois tendo uma 'luz' ao ler o e-book. Narração: 'Aprenda a virar o jogo com técnicas de persuasão testadas. Este e-book revela os segredos para fechar mais negócios. Adquira já!'",
              purpose: "Foco na 'dor' (rejeição) para gerar conexão emocional. Ideal para quem se sente frustrado com os resultados atuais."
            },
            {
              id: 'cr-1-3',
              format: 'Imagem Estática',
              title: "PNL para Vendedores",
              description: "Carrossel com 3 imagens: a primeira com a pergunta 'PNL funciona para vender?', a segunda com um gatilho mental explicado, e a terceira com a chamada para ação para o e-book.",
              purpose: "Foco na técnica (PNL) para atrair um público mais analítico e interessado em desenvolvimento profissional."
            }
        ],
        planB: {
          audience: {
            title: "Público Alternativo (Comportamentos)",
            description: "Segmentação Detalhada > Comportamentos: 'Compradores envolvidos'. Camada adicional de Interesses: 'Marketing digital', 'Pequenas empresas'. Excluir pessoas que já compraram o e-book."
          },
          creatives: [
            {
              id: 'cr-b-1-1',
              format: 'Vídeo',
              title: "O Segredo dos Vendedores de Sucesso",
              description: "Vídeo com depoimento rápido (simulado ou real) de alguém que leu o e-book e teve resultado. Legendas dinâmicas. Texto: 'Cansado de ouvir 'não'? Existe uma forma de vender sem pressionar. Conheça os gatilhos que fecham negócios.'",
              purpose: "Foco na prova social e na 'dor' do público (rejeição em vendas) para gerar uma conexão emocional mais forte."
            },
            {
              id: 'cr-b-1-2',
              format: 'Imagem Estática',
              title: "Para Empreendedores que Vendem",
              description: "Imagem mostrando o gráfico de vendas de uma empresa crescendo. Título: 'Seu produto é ótimo, mas as vendas não decolam? O problema pode estar na sua abordagem. Aprenda a persuadir com nosso guia prático.'",
              purpose: "Foco em um nicho (empreendedores) com uma dor específica (vendas baixas)."
            }
          ]
        }
      }
    },
    {
      id: 'camp-2',
      title: "Campanha 2: Remarketing (Tráfego Quente)",
      product: "E-book Mind$ell / Treinamento Mind$ell",
      platform: "Meta Ads",
      budget: "R$ 6,00/dia",
      description: "Objetivo: Conversão (Compra). O foco aqui é recuperar vendas de pessoas que já demonstraram interesse, tanto no E-book quanto no Treinamento (upsell).",
      execution: {
        audience: {
          title: "Público Principal (Visitantes do Site)",
          description: "Público Personalizado > Fontes do Site: Pessoas que visitaram a página de vendas do E-book ou do Treinamento nos últimos 14 dias, mas não acionaram o evento de compra (Purchase)."
        },
        creatives: [
            {
              id: 'cr-2-1',
              format: 'Imagem Estática',
              title: "Você Chegou Perto. Finalize sua Compra.",
              description: "Imagem do produto que a pessoa visitou (E-book ou Treinamento) com um selo de 'Oferta Exclusiva'. Texto: 'Vimos que você se interessou. Não perca a chance de transformar seus resultados. Complete seu pedido e comece hoje.'",
              purpose: "Lembrete direto e com senso de urgência para recuperar carrinhos abandonados e visitantes indecisos."
            },
            {
              id: 'cr-2-2',
              format: 'Vídeo',
              title: "Ainda dá tempo de garantir sua vaga",
              description: "Vídeo curto do instrutor falando: 'Notei que você visitou nossa página do Treinamento Mind$ell. Quero pessoalmente te convidar para se juntar à nossa turma de especialistas. Finalize sua inscrição.'",
              purpose: "Gera escassez e exclusividade para incentivar a conclusão da compra do treinamento, com um toque pessoal."
            }
        ],
        planB: {
          audience: {
            title: "Público Alternativo (Compradores do E-book)",
            description: "Público Personalizado > Lista de Clientes: Clientes que compraram o E-book nos últimos 30 dias. O objetivo é fazer o upsell para o treinamento completo."
          },
          creatives: [
            {
              id: 'cr-b-2-1',
              format: 'Imagem Estática',
              title: "Você Deu o Primeiro Passo. Qual o Próximo?",
              description: "Carrossel comparando o conteúdo do E-book (check ✓) com os módulos do Treinamento (o que ele vai aprender a mais). Texto: 'Você aprendeu os gatilhos mentais. Aprofunde com o Treinamento Mind$ell.'",
              purpose: "Utilizar a compra anterior como gancho para a próxima oferta, mostrando uma jornada de aprendizado clara e lógica."
            },
            {
              id: 'cr-b-2-2',
              format: 'Vídeo',
              title: "De Leitor a Especialista",
              description: "Vídeo mostrando a 'jornada do herói': uma pessoa lendo o e-book e depois aplicando as técnicas com sucesso em uma reunião. Texto: 'O e-book foi só o começo. No Treinamento, você aplica na prática.'",
              purpose: "Foco na transformação e evolução do cliente, validando a compra anterior e incentivando a próxima."
            }
          ]
        }
      }
    },
  ],
  executionChecklist: [
    {
        id: 'day-1',
        title: "Dia 1: Preparação Técnica e Criativa",
        items: [
            { id: 'strat-1', text: "Verificar Pixel do Meta: Confirmar que está ativo nas LPs" },
            { id: 'strat-2', text: "Criar Landing Pages: Desenvolver as páginas de venda para o E-book e o Treinamento" },
            { id: 'strat-3', text: "Separar Criativos: Organizar todas as imagens e vídeos para as campanhas" },
        ]
    },
    {
        id: 'day-2',
        title: "Dia 2: Configuração das Campanhas",
        items: [
            { id: 'strat-4', text: "Montar Campanhas no Meta Ads: Configurar as campanhas de Captação e Remarketing" },
            { id: 'strat-5', text: "Implementar Fluxos de E-mail: Construir as sequências de upsell e engajamento" },
            { id: 'strat-6', text: "Criar Públicos de Remarketing: Configurar públicos de visitantes (7 e 30 dias)" },
        ]
    },
    {
        id: 'day-3',
        title: "Dia 3: Testes Finais e Lançamento",
        items: [
            { id: 'strat-7', text: "Realizar Compras-Teste: Verificar os funis do E-book e do Treinamento" },
            { id: 'strat-8', text: "Revisão Final das Campanhas: Fazer uma última checagem em textos, links e orçamentos" },
            { id: 'strat-9', text: "Ativar Campanhas: Publicar as campanhas de captação e agendar o remarketing" },
        ]
    }
  ],
  phase2: {
      title: "Fase 2: Expansão da Esteira",
      futureProducts: [
          {
              id: 'p2-prod-1',
              title: "Método Finance",
              targetPrice: "~R$ 397,80",
              description: "Um treinamento completo sobre gestão financeira para pequenos negócios, ensinando a controlar o fluxo de caixa, precificar e aumentar a lucratividade."
          },
          {
              id: 'p2-prod-2',
              title: "Consultoria Premium Online",
              targetPrice: "~R$ 1.897,90",
              description: "Acompanhamento individual e personalizado para empresários que desejam reestruturar as finanças e as vendas de suas empresas com orientação direta."
          }
      ],
      audienceStrategy: {
          title: "Estratégia de Construção de Audiência",
          secondaryBait: {
              title: "Isca Digital Secundária",
              description: "Utilizar a \"Planilha Simplificada de Fluxo de Caixa\" como isca gratuita em campanhas de geração de leads de baixo custo. O objetivo não é a venda imediata, mas sim construir uma lista de e-mails altamente qualificada de pessoas com \"dor\" em finanças."
          },
          action: {
              title: "Ação",
              description: "Manter uma campanha de tráfego contínua e de baixo orçamento (ex: R$ 5/dia) para a página de captura da planilha. Nutrir essa lista com conteúdo sobre gestão financeira para prepará-la para o futuro lançamento do Método Finance."
          }
      }
  }
};
