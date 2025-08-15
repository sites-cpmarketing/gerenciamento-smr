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
      platform: "Meta Ads",
      description: "Objetivo: Conversão (Compra). Esta campanha é o motor principal para atrair novos clientes com o E-book de baixo custo para validar a oferta e o público.",
      execution: {
        audience: {
          title: "Público Principal (Amplo)",
          description: "Vendedores, empreendedores, coaches, consultores, profissionais de marketing. Interesses em: vendas, negociação, PNL, persuasão, desenvolvimento pessoal, Tony Robbins, Dale Carnegie."
        },
        creative: {
          headline: "Venda Mais com Gatilhos Mentais",
          text: "Descubra 5 gatilhos mentais para aplicar hoje e aumentar suas vendas. Baixe o guia completo por apenas R$ 19,90.",
          purpose: "Chamar a atenção com uma promessa clara e de resultado rápido. O preço baixo quebra a barreira inicial da compra."
        },
        planB: {
          audience: {
            title: "Público Alternativo (Lookalike)",
            description: "Público semelhante (1%) aos compradores do E-book. Será criado após as primeiras 50-100 vendas para encontrar pessoas com perfil idêntico aos clientes."
          },
          creative: {
            headline: "O Segredo dos Vendedores de Sucesso",
            text: "Cansado de ouvir 'não'? Existe uma forma de vender sem pressionar. Conheça os gatilhos mentais que fecham negócios. E-book por R$ 19,90.",
            purpose: "Testar uma nova abordagem focada na 'dor' do público (rejeição) em vez de focar apenas no 'ganho' (vender mais)."
          }
        }
      }
    },
    {
      id: 'camp-2',
      title: "Campanha 2: Remarketing (Tráfego Quente)",
      platform: "Meta Ads",
      description: "Objetivo: Conversão (Compra). O foco aqui é recuperar vendas de pessoas que já demonstraram interesse, oferecendo o Treinamento como o próximo passo.",
      execution: {
        audience: {
          title: "Público Principal (Engajados)",
          description: "Pessoas que visitaram a página de vendas do E-book ou do Treinamento nos últimos 14 dias, mas não compraram."
        },
        creative: {
          headline: "Domine a Arte de Vender com PNL",
          text: "Você chegou perto. Transforme seu interesse em resultado. Domine técnicas de vendas e PNL para fechar negócios com confiança. Inscreva-se no treinamento completo.",
          purpose: "Reforçar o valor do treinamento para um público que já conhece a oferta. A comunicação é direta e foca na decisão final."
        },
        planB: {
          audience: {
            title: "Público Alternativo (Compradores do E-book)",
            description: "Clientes que compraram o E-book. O objetivo é fazer o upsell para o treinamento completo."
          },
          creative: {
            headline: "Você Deu o Primeiro Passo. Qual o Próximo?",
            text: "Você aprendeu os gatilhos mentais. Agora, aprofunde seu conhecimento com o Treinamento Mind$ell e tenha acesso a um método completo de vendas e PNL.",
            purpose: "Utilizar a compra anterior como gancho para a próxima oferta, mostrando uma jornada de aprendizado clara e lógica."
          }
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
