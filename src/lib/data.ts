import type { CampaignPlan } from '@/lib/types';

export const campaignPlanData: CampaignPlan = {
  strategy: {
    title: "Estratégia de Lançamento Q3",
    description: "Nosso foco para o terceiro trimestre é aumentar a aquisição de usuários para o novo 'Módulo de IA' e impulsionar as vendas de planos premium.",
    actionItems: [
      { id: 'strat-1', text: "Finalizar o posicionamento da mensagem para o 'Módulo de IA'" },
      { id: 'strat-2', text: "Definir o público-alvo principal e secundário" },
      { id: 'strat-3', text: "Alocar orçamento de marketing em todos os canais" },
    ],
  },
  offers: [
    {
      id: 'offer-1',
      title: "Oferta: Acesso Antecipado",
      description: "Ofereça acesso antecipado ao 'Módulo de IA' para um grupo seleto de usuários beta para gerar buzz inicial e coletar feedback.",
      actionItems: [
        { id: 'offer-1-1', text: "Criar landing page para inscrição no acesso antecipado" },
        { id: 'offer-1-2', text: "Configurar campanha de email para a lista de espera existente" },
        { id: 'offer-1-3', text: "Produzir um vídeo teaser de 30 segundos" },
      ],
    },
    {
      id: 'offer-2',
      title: "Oferta: Desconto de Lançamento",
      description: "Um desconto de 25% nos planos premium no primeiro mês para novos clientes que se inscreverem na primeira semana do lançamento.",
      actionItems: [
        { id: 'offer-2-1', text: "Criar códigos de cupom e configurar o gateway de pagamento" },
        { id: 'offer-2-2', text: "Atualizar a página de preços com a oferta de tempo limitado" },
      ],
    }
  ],
  campaigns: [
    {
      id: 'camp-1',
      title: "Campanha: Conteúdo de Blog",
      platform: "Marketing de Conteúdo",
      kpis: [
        { metric: 'CTR', target: "3% no CTA do post" },
      ],
      actionItems: [
        { id: 'camp-1-1', text: "Escrever 3 posts de blog sobre os benefícios da IA em marketing" },
        { id: 'camp-1-2', text: "Criar infográficos para acompanhar os posts" },
        { id: 'camp-1-3', text: "Promover os posts no LinkedIn e Twitter" },
      ],
    },
    {
      id: 'camp-2',
      title: "Campanha: Anúncios no LinkedIn",
      platform: "Mídia Paga",
      kpis: [
        { metric: 'CPL', target: "Abaixo de R$25" },
        { metric: 'CTR', target: "Acima de 1.5%" },
      ],
      actionItems: [
        { id: 'camp-2-1', text: "Projetar criativos de anúncio (imagem e vídeo)" },
        { id: 'camp-2-2', text: "Escrever o texto do anúncio e os títulos" },
        { id: 'camp-2-3', text: "Configurar o rastreamento de conversão e o pixel" },
      ],
    },
    {
        id: 'camp-3',
        title: "Campanha: Webinar de Lançamento",
        platform: "Eventos",
        kpis: [
            { metric: 'CPA', target: "Abaixo de R$150 por plano premium" },
        ],
        actionItems: [
            { id: 'camp-3-1', text: "Definir o tópico e os palestrantes do webinar" },
            { id: 'camp-3-2', text: "Criar apresentação de slides e materiais" },
            { id: 'camp-3-3', text: "Promover o webinar via email e redes sociais" },
        ],
    },
  ],
};
