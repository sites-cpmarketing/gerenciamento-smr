import type { CampaignPlan } from '@/lib/types';

export const campaignPlanData: CampaignPlan = {
  strategy: {
    title: "Estratégia e Metas",
    description: "Foco total na validação e venda dos produtos de entrada com o tema de Vendas e PNL. Objetivo: Validar a oferta do E-book e do Treinamento Mind$ell, alcançando um Retorno Sobre o Investimento (ROI) ≥ 1.0 no primeiro ciclo de 30 dias.",
  },
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
      title: "Campanha 1: Captação Direta (E-book + Treinamento)",
      platform: "Meta Ads",
      description: "Objetivo de Conversão (Compra) com orçamento de R$ 12/dia, direcionando para ambos os produtos.",
      kpis: [
        { metric: 'CPL', target: "≤ R$ 4,00" },
        { metric: 'CTR', target: "≥ 0,9%" },
        { metric: 'CPA', target: "E-book: ≤ R$ 20,00" },
      ],
      actionItems: [],
    },
    {
      id: 'camp-2',
      title: "Campanha 2: Remarketing",
      platform: "Meta Ads",
      description: "Objetivo de Conversão (Compra) com orçamento de R$ 6/dia, para visitantes e leads que não compraram.",
      kpis: [
        { metric: 'CPA', target: "Treinamento: ≤ R$ 70,00" },
      ],
      actionItems: [],
    },
  ],
  emailFlows: [
      {
          id: 'flow-1',
          title: "Fluxo Pós-Compra E-book (Upsell)",
          description: "Sequência de 3 e-mails para apresentar o Treinamento Mind$ell como o próximo passo lógico, oferecendo um desconto especial para quem já é cliente."
      },
      {
          id: 'flow-2',
          title: "Fluxo Pós-Compra Treinamento (Engajamento)",
          description: "Sequência de 3 e-mails para dar as boas-vindas, entregar conteúdo de valor e preparar o terreno para a futura oferta do \"Método Finance\"."
      }
  ],
  creatives: [
      {
          id: 'creative-1',
          for: "E-book Mind$ell",
          headline: "Venda Mais com Gatilhos Mentais",
          text: "Descubra 5 gatilhos mentais para aplicar hoje e aumentar suas vendas. Baixe o guia completo por apenas R$ 19,90."
      },
      {
          id: 'creative-2',
          for: "Treinamento Mind$ell",
          headline: "Domine a Arte de Vender com PNL",
          text: "Cansado de perder vendas? Aprenda técnicas de PNL para fechar mais negócios. Curso completo por R$ 97."
      }
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
