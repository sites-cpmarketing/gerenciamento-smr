'use server';
/**
 * @fileoverview Flow to analyze campaign performance data.
 *
 * - analyseCampaignPerformance: A function that takes campaign data and KPIs to provide intelligent insights.
 * - PerformanceAnalysisInput: The input type for the analyseCampaignPerformance function.
 * - PerformanceAnalysis: The return type for the analyseCampaignPerformance function.
 */
import { ai } from '@/ai/genkit';
import { PerformanceAnalysisInputSchema, PerformanceAnalysisSchema, type PerformanceAnalysis, type PerformanceAnalysisInput } from '@/lib/types';


export async function analyseCampaignPerformance(input: PerformanceAnalysisInput): Promise<PerformanceAnalysis> {
  return analyseCampaignPerformanceFlow(input);
}


const analysisPrompt = ai.definePrompt({
    name: 'performanceAnalysisPrompt',
    input: { schema: PerformanceAnalysisInputSchema },
    output: { schema: PerformanceAnalysisSchema },
    prompt: `Você é um analista de marketing de performance sênior, especialista em otimização de campanhas de tráfego pago para infoprodutos. Sua tarefa é analisar os dados de uma campanha e fornecer um resumo e sugestões de otimização claras e acionáveis.

    Regras Críticas:
    1.  **Seja Prudente:** NÃO tire conclusões precipitadas. Se houver apenas um período de dados (ex: apenas a "Semana 1"), sua análise deve ser preliminar. Deixe claro que são observações iniciais e que mais dados são necessários para confirmar tendências. NUNCA sugira pausar uma campanha com base em apenas um período de dados, a menos que os resultados sejam desastrosos (ex: ROI muito negativo).
    2.  **Compare com as Metas:** Sua análise DEVE ser baseada na comparação dos resultados com os KPIs definidos. Para cada métrica, calcule o valor real e compare com a meta.
    3.  **Foco em Ação:** As sugestões devem ser práticas. Em vez de dizer "melhore o CTR", sugira "O CTR está abaixo da meta. Teste novos criativos com uma chamada para ação mais direta ou com um apelo visual diferente para ver se aumenta o engajamento."
    4.  **Priorize:** Use o prefixo "Atenção: " para as sugestões mais urgentes, como um CPL muito acima da meta ou um ROI negativo.
    5.  **Cálculos Importantes (Faça-os internamente):**
        *   **CTR (%):** (Cliques / Impressões) * 100
        *   **CPC (R$):** Investimento / Cliques
        *   **CPL (R$):** Investimento / Leads
        *   **CPA E-book (R$):** Investimento / Vendas E-book
        *   **CPA Treinamento (R$):** Investimento / Vendas Treinamento
        *   **ROI:** (Receita - Investimento) / Investimento

    Contexto da Campanha:
    - O objetivo principal da fase atual é validar a oferta e o funil com um ROI mínimo de 1.0.

    Dados para Análise:
    - KPIs (Metas): {{{json kpis}}}
    - Dados de Performance: {{{json data}}}

    Analise os dados fornecidos e retorne sua análise no formato JSON especificado.
    `,
});

const analyseCampaignPerformanceFlow = ai.defineFlow(
  {
    name: 'analyseCampaignPerformanceFlow',
    inputSchema: PerformanceAnalysisInputSchema,
    outputSchema: PerformanceAnalysisSchema,
  },
  async (input) => {
    const { output } = await analysisPrompt(input);
    return output!;
  }
);
