import type { CampaignPlan } from '@/lib/types';

export const campaignPlanData: CampaignPlan = {
  strategy: {
    title: "Estratégia de Marketing Digital SMR",
    description: "O objetivo desta campanha é aumentar o reconhecimento da marca SMR e gerar leads qualificados através de uma estratégia focada em Meta Ads e crescimento orgânico no Instagram.",
    actionItems: [
      { id: 'strat-1', text: "Definir o público-alvo detalhado para ambas as plataformas" },
      { id: 'strat-2', text: "Estabelecer o orçamento para a campanha de Meta Ads" },
      { id: 'strat-3', text: "Planejar a linha editorial e calendário de postagens para o Instagram" },
    ],
  },
  offers: [
    {
      id: 'offer-1',
      title: "Oferta: Consultoria Gratuita",
      description: "Oferecer uma consultoria inicial gratuita para novos clientes que chegarem através dos anúncios ou do Instagram.",
      actionItems: [
        { id: 'offer-1-1', text: "Criar landing page para a oferta de consultoria" },
        { id: 'offer-1-2', text: "Definir roteiro e materiais para a sessão de consultoria" },
      ],
    },
  ],
  campaigns: [
    {
      id: 'camp-1',
      title: "Campanha: Instagram Orgânico",
      platform: "Instagram (Orgânico)",
      kpis: [
        { metric: 'CTR', target: "5% de cliques no link da bio" },
      ],
      actionItems: [
        { id: 'camp-1-1', text: "Publicar 3 Reels por semana sobre os serviços da SMR" },
        { id: 'camp-1-2', text: "Criar 5 posts no feed com estudos de caso e dicas" },
        { id: 'camp-1-3', text: "Realizar uma live semanal para tirar dúvidas" },
        { id: 'camp-1-4', text: "Interagir diariamente com seguidores e outras contas do nicho" },
      ],
    },
    {
      id: 'camp-2',
      title: "Campanha: Meta Ads",
      platform: "Meta Ads",
      kpis: [
        { metric: 'CPL', target: "Abaixo de R$20 por lead" },
        { metric: 'CTR', target: "Acima de 2%" },
        { metric: 'CPA', target: "Abaixo de R$200 por cliente" },
      ],
      actionItems: [
        { id: 'camp-2-1', text: "Projetar criativos de anúncio (imagem e vídeo)" },
        { id: 'camp-2-2', text: "Escrever o texto do anúncio e os títulos (copy)" },
        { id: 'camp-2-3', text: "Configurar o rastreamento de conversão (Pixel e API)" },
        { id: 'camp-2-4', text: "Segmentar públicos (interesses, lookalike, remarketing)" },
        { id: 'camp-2-5', text: "Otimizar o orçamento da campanha semanalmente" },
      ],
    },
  ],
};
