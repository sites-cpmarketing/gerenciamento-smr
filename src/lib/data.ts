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
          description: "Demografia: Idade: 25-50 anos. Localização: Brasil. Interesses: Vendas, Técnicas de Vendas, Negociação, Programação Neurolinguística (PNL), Persuasão, Empreendedorismo, Hotmart. Interesses em autores: Tony Robbins, Dale Carnegie, Robert Cialdini."
        },
        creatives: [
            {
              id: 'cr-1-1',
              format: 'Imagem Estática',
              title: "Venda Mais com Gatilhos Mentais",
              description: "Visual: Imagem de impacto com o título do e-book em destaque. Copy: 'Descubra 5 gatilhos mentais para aplicar hoje e aumentar suas vendas. Baixe o guia completo por apenas R$ 19,90.'",
              purpose: "Foco no benefício direto (vender mais) e na rapidez. Ideal para quem busca resultados imediatos."
            },
            {
              id: 'cr-1-2',
              format: 'Vídeo',
              title: "Seus Clientes Dizem 'Não'?",
              description: "Visual: Vídeo curto (15-30s) mostrando uma pessoa frustrada com vendas e depois tendo uma 'luz' ao ler o e-book. Copy: 'Aprenda a virar o jogo com técnicas de persuasão testadas. Este e-book revela os segredos para fechar mais negócios. Adquira já!'",
              purpose: "Foco na 'dor' (rejeição) para gerar conexão emocional. Ideal para quem se sente frustrado com os resultados atuais."
            },
            {
              id: 'cr-1-3',
              format: 'Imagem Estática',
              title: "PNL para Vendedores",
              description: "Visual: Carrossel com 3 imagens: a primeira com a pergunta 'PNL funciona para vender?', a segunda com um gatilho mental explicado, e a terceira com a CTA. Copy: 'Quer saber como a PNL pode dobrar suas vendas? Veja como no nosso e-book.'",
              purpose: "Foco na técnica (PNL) para atrair um público mais analítico e interessado em desenvolvimento profissional."
            }
        ],
        planB: {
          audience: {
            title: "Público Alternativo (Comportamentos)",
            description: "Demografia: Idade: 28-45 anos. Localização: Principais capitais (São Paulo, Rio de Janeiro, Belo Horizonte). Comportamentos: Compradores envolvidos. Interesses: Marketing digital, Pequenas empresas. Excluir: Pessoas que já compraram o e-book."
          },
          creatives: [
            {
              id: 'cr-b-1-1',
              format: 'Vídeo',
              title: "O Segredo dos Vendedores de Sucesso",
              description: "Visual: Vídeo com depoimento rápido (simulado ou real) de alguém que leu o e-book e teve resultado. Legendas dinâmicas. Copy: 'Cansado de ouvir 'não'? Existe uma forma de vender sem pressionar. Conheça os gatilhos que fecham negócios.'",
              purpose: "Foco na prova social e na 'dor' do público (rejeição em vendas) para gerar uma conexão emocional mais forte."
            },
            {
              id: 'cr-b-1-2',
              format: 'Imagem Estática',
              title: "Para Empreendedores que Vendem",
              description: "Visual: Imagem mostrando o gráfico de vendas de uma empresa crescendo. Copy: 'Seu produto é ótimo, mas as vendas não decolam? O problema pode estar na sua abordagem. Aprenda a persuadir com nosso guia prático.'",
              purpose: "Foco em um nicho (empreendedores) com uma dor específica (vendas baixas)."
            }
          ]
        }
      }
    },
    {
      id: 'camp-2',
      title: "Campanha 2: Remarketing (Tráfego Quente)",
      product: "E-book / Treinamento",
      platform: "Meta Ads",
      budget: "R$ 6,00/dia",
      description: "Objetivo: Conversão (Compra). O foco aqui é recuperar vendas de pessoas que já demonstraram interesse, tanto no E-book quanto no Treinamento (upsell).",
      execution: {
        audience: {
          title: "Público Principal (Visitantes do Site)",
          description: "Fontes do Site: Pessoas que visitaram a página de vendas do E-book ou do Treinamento nos últimos 14 dias. Excluir: Compradores (evento de Purchase)."
        },
        creatives: [
            {
              id: 'cr-2-1',
              format: 'Imagem Estática',
              title: "Você Chegou Perto. Finalize sua Compra.",
              description: "Visual: Imagem do produto que a pessoa visitou (E-book ou Treinamento) com um selo de 'Oferta Exclusiva'. Copy: 'Vimos que você se interessou. Não perca a chance de transformar seus resultados. Complete seu pedido e comece hoje.'",
              purpose: "Lembrete direto e com senso de urgência para recuperar carrinhos abandonados e visitantes indecisos."
            },
            {
              id: 'cr-2-2',
              format: 'Vídeo',
              title: "Ainda dá tempo de garantir sua vaga",
              description: "Visual: Vídeo curto do instrutor falando diretamente para a câmera. Copy: 'Notei que você visitou nossa página do Treinamento Mind$ell. Quero pessoalmente te convidar para se juntar à nossa turma de especialistas. Finalize sua inscrição.'",
              purpose: "Gera escassez e exclusividade para incentivar a conclusão da compra do treinamento, com um toque pessoal."
            }
        ],
        planB: {
          audience: {
            title: "Público Alternativo (Compradores do E-book)",
            description: "Fontes do Site: Público Personalizado de clientes que compraram o E-book nos últimos 30 dias. O objetivo é fazer o upsell para o treinamento completo."
          },
          creatives: [
            {
              id: 'cr-b-2-1',
              format: 'Imagem Estática',
              title: "Você Deu o Primeiro Passo. Qual o Próximo?",
              description: "Visual: Carrossel comparando o conteúdo do E-book (check ✓) com os módulos do Treinamento. Copy: 'Você aprendeu os gatilhos mentais. Que tal aprofundar com o Treinamento Mind$ell e se tornar um especialista? Veja o que você vai dominar.'",
              purpose: "Utilizar a compra anterior como gancho para a próxima oferta, mostrando uma jornada de aprendizado clara e lógica."
            },
            {
              id: 'cr-b-2-2',
              format: 'Vídeo',
              title: "De Leitor a Especialista",
              description: "Visual: Vídeo mostrando a 'jornada do herói': uma pessoa lendo o e-book e depois aplicando as técnicas com sucesso em uma reunião. Copy: 'O e-book foi só o começo. No Treinamento, você aplica na prática e vira o jogo. Pronto para o próximo nível?'",
              purpose: "Foco na transformação e evolução do cliente, validando a compra anterior e incentivando a próxima."
            }
          ]
        }
      }
    },
  ],
  emailFlows: [
    {
      id: "flow-1",
      title: "Fluxo Pós-Compra E-book (Upsell)",
      audience: "Clientes que compraram o E-book Mind$ell.",
      objective: "Apresentar o Treinamento Mind$ell como o próximo passo lógico, oferecendo um desconto especial para quem já é cliente e incentivando a compra.",
      emails: [
        {
          id: "email-1-1",
          subject: "O seu guia chegou! E agora?",
          content: "Agradece a compra, entrega o acesso ao e-book e introduz a ideia de que o e-book é o 'primeiro passo' para uma transformação maior."
        },
        {
          id: "email-1-2",
          subject: "O segredo que não coube no e-book...",
          content: "Cria curiosidade sobre o conteúdo do treinamento, mostrando o que o cliente pode alcançar ao se aprofundar. Apresenta o treinamento e seus benefícios."
        },
        {
          id: "email-1-3",
          subject: "Um convite especial para você (com desconto)",
          content: "Faz a oferta direta do treinamento com um cupom de desconto exclusivo para quem comprou o e-book, criando um senso de urgência (ex: 'válido por 48h')."
        }
      ]
    },
    {
      id: "flow-2",
      title: "Fluxo Pós-Compra Treinamento (Engajamento)",
      audience: "Clientes que compraram o Treinamento Mind$ell.",
      objective: "Dar as boas-vindas, entregar conteúdo de valor, garantir que o cliente consuma o treinamento e prepará-lo para futuras ofertas de maior valor (Método Finance).",
      emails: [
        {
          id: "email-2-1",
          subject: "Seja bem-vindo(a) ao Treinamento Mind$ell!",
          content: "Boas-vindas, instruções de acesso e um guia rápido de como aproveitar melhor o curso. O foco é gerar uma ótima primeira impressão."
        },
        {
          id: "email-2-2",
          subject: "Uma dica extra para seus estudos",
          content: "Envia um conteúdo complementar ao treinamento (ex: um artigo, uma ferramenta ou uma dica rápida em vídeo) para manter o engajamento e reforçar a autoridade."
        },
        {
          id: "email-2-3",
          subject: "Como estão seus resultados?",
          content: "Pede feedback sobre o treinamento e introduz sutilmente a importância da gestão financeira para o sucesso em vendas, plantando a semente para o 'Método Finance'."
        }
      ]
    },
    {
      id: "flow-3",
      title: "Fluxo de Remarketing (Recuperação de Vendas)",
      audience: "Visitantes que acessaram a página de vendas (E-book ou Treinamento), mas não compraram. A captura de contato para este público será potencializada com a implementação de um web push (via RD Station) com intenção de saída para capturar leads no momento em que demonstram abandonar a página.",
      objective: "Recuperar o interesse do visitante, quebrar objeções comuns (preço, tempo, confiança) e usar a urgência e a prova social para incentivar a conclusão da compra.",
      emails: [
        {
          id: "email-3-1",
          subject: "Você esqueceu algo?",
          content: "Lembrete amigável sobre o item que ele visitou. Reforça o benefício principal do produto (e-book ou treinamento) e oferece um link direto para finalizar a compra."
        },
        {
          id: "email-3-2",
          subject: "Ainda em dúvida? Veja o que dizem nossos alunos",
          content: "Apresenta depoimentos ou estudos de caso para quebrar objeções e construir prova social. O foco é mostrar que o investimento vale a pena."
        },
        {
          id: "email-3-3",
          subject: "Sua oferta especial está prestes a expirar",
          content: "Cria um senso de urgência real, oferecendo um bônus ou um desconto por tempo limitado (ex: 'últimas 24h'). A CTA é clara: 'Compre agora ou perca o benefício'."
        }
      ]
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
  },
  investment: {
    title: "Análise Financeira e Projeções",
    description: "Controle detalhado do orçamento, metas de retorno e projeções de receita para a Fase 1.",
    budget: {
      daily: "R$ 18,00",
      monthly: "R$ 540,00",
      breakdown: [
        { campaign: "Campanha 1: Captação Direta", value: "R$ 12,00/dia" },
        { campaign: "Campanha 2: Remarketing", value: "R$ 6,00/dia" }
      ]
    },
    projections: {
      title: "Projeções de Custo (Mensal)",
      items: [
        { metric: "Custo com E-book", value: "~R$ 360,00", description: "Considerando 18 vendas a um CPA de R$ 20,00." },
        { metric: "Custo com Treinamento", value: "~R$ 180,00", description: "Considerando ~2-3 vendas a um CPA de R$ 70,00." },
      ]
    },
    roi: {
      title: "Retorno Sobre Investimento (ROI)",
      goal: "≥ 1.0",
      description: "A meta é que o faturamento cubra o investimento. ROI = (Receita - Custo) / Custo. Para ROI de 1.0, a receita precisa ser de R$ 1.080,00 para um custo de R$ 540,00."
    },
    scenarios: {
      title: "Cenários de Receita (Validação)",
      items: [
        { name: "Cenário Conservador (ROI ≈ 1.0)", description: "Vender 27 E-books (R$ 537,30) e 5 Treinamentos (R$ 485,00), totalizando R$ 1.022,30." },
        { name: "Cenário Otimista (ROI ≈ 1.5)", description: "Vender 40 E-books (R$ 796,00) e 8 Treinamentos (R$ 776,00), totalizando R$ 1.572,00." },
      ]
    }
  }
};
