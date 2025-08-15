import type { CampaignPlan } from '@/lib/types';

export const campaignPlanData: CampaignPlan = {
  strategy: {
    title: "Plano de Campanha Estratégico: Lançamento Mind$ell",
    description: "Foco total na validação e venda dos produtos de entrada com o tema de Vendas e PNL. Objetivo: Validar a oferta do E-book e do Treinamento Mind$ell, alcançando um Retorno Sobre o Investimento (ROI) ≥ 1.0 no primeiro ciclo de 30 dias.",
    actionItems: [
      { id: 'strat-1', text: "Verificar Pixel do Meta: Confirmar que está ativo nas LPs" },
      { id: 'strat-2', text: "Criar Landing Pages: Desenvolver as páginas de venda para o E-book e o Treinamento" },
      { id: 'strat-3', text: "Separar Criativos: Organizar todas as imagens e vídeos para as campanhas" },
      { id: 'strat-4', text: "Montar Campanhas no Meta Ads: Configurar as campanhas de Captação e Remarketing" },
      { id: 'strat-5', text: "Implementar Fluxos de E-mail: Construir as sequências de upsell e engajamento" },
      { id: 'strat-6', text: "Criar Públicos de Remarketing: Configurar públicos de visitantes (7 e 30 dias)" },
      { id: 'strat-7', text: "Realizar Compras-Teste: Verificar os funis do E-book e do Treinamento" },
      { id: 'strat-8', text: "Revisão Final das Campanhas: Fazer uma última checagem em textos, links e orçamentos" },
      { id: 'strat-9', text: "Ativar Campanhas: Publicar as campanhas de captação e agendar o remarketing" },
    ],
  },
  offers: [
    {
      id: 'offer-1',
      title: "Produto de Entrada: E-book Mind$ell (R$ 19,90)",
      description: "“Aprenda 5 gatilhos mentais poderosos para vender mais em menos de 1 hora de leitura.” Um guia prático para vendedores e empreendedores que desejam resultados rápidos.",
      actionItems: [
        { id: 'offer-1-1', text: "Anúncio - Headline: \"Venda Mais com Gatilhos Mentais\"" },
        { id: 'offer-1-2', text: "Anúncio - Texto: \"Descubra 5 gatilhos mentais para aplicar hoje e aumentar suas vendas. Baixe o guia completo por apenas R$ 19,90.\"" },
        { id: 'offer-1-3', text: "Criar fluxo de e-mail pós-compra para upsell do Treinamento Mind$ell" },
      ],
    },
    {
      id: 'offer-2',
      title: "Produto Principal: Treinamento Mind$ell (R$ 97,00)",
      description: "“Domine técnicas de vendas e PNL para fechar negócios mais rápido e persuadir clientes — 100% online, no seu ritmo.” O treinamento completo para quem quer dominar técnicas avançadas.",
      actionItems: [
        { id: 'offer-2-1', text: "Anúncio - Headline: \"Domine a Arte de Vender com PNL\"" },
        { id: 'offer-2-2', text: "Anúncio - Texto: \"Cansado de perder vendas? Aprenda técnicas de PNL para fechar mais negócios. Curso completo por R$ 97.\"" },
        { id: 'offer-2-3', text: "Criar fluxo de e-mail pós-compra para engajamento e futura oferta do Método Finance" },
      ],
    },
  ],
  campaigns: [
    {
      id: 'camp-1',
      title: "Campanha 1: Captação Direta (E-book + Treinamento)",
      platform: "Meta Ads",
      kpis: [
        { metric: 'CPL', target: "≤ R$ 4,00" },
        { metric: 'CTR', target: "≥ 0,9%" },
        { metric: 'CPA', target: "E-book: ≤ R$ 20,00" },
      ],
      actionItems: [
        { id: 'camp-1-1', text: "Configurar campanha de conversão (Compra) com orçamento de R$ 12/dia" },
        { id: 'camp-1-2', text: "Direcionar anúncios para o público-alvo de vendas e PNL" },
        { id: 'camp-1-3', text: "Monitorar CPL e CTR diariamente na primeira semana" },
      ],
    },
    {
      id: 'camp-2',
      title: "Campanha 2: Remarketing",
      platform: "Meta Ads",
      kpis: [
        { metric: 'CPA', target: "Treinamento: ≤ R$ 70,00" },
      ],
      actionItems: [
        { id: 'camp-2-1', text: "Configurar campanha de conversão (Compra) com orçamento de R$ 6/dia" },
        { id: 'camp-2-2', text: "Direcionar para visitantes do site e leads que não compraram" },
        { id: 'camp-2-3', text: "Usar criativos que quebram objeções e reforçam a oferta" },
      ],
    },
    {
        id: 'camp-3',
        title: "Campanha Contínua: Construção de Audiência (Fase 2)",
        platform: "Instagram (Orgânico)",
        kpis: [
          { metric: 'CTR', target: "N/A" },
        ],
        actionItems: [
          { id: 'camp-3-1', text: "Planejar isca digital: \"Planilha Simplificada de Fluxo de Caixa\"" },
          { id: 'camp-3-2', text: "Manter campanha de tráfego de baixo orçamento (R$ 5/dia) para a isca" },
          { id: 'camp-3-3', text: "Nutrir a lista de e-mails com conteúdo sobre gestão financeira" },
        ],
      },
  ],
};
