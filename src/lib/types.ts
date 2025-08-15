import { z } from 'zod';

export type ActionItem = {
  id: string;
  text: string;
  details?: string;
  link?: string;
};

export type KpiMetric = 'CPL' | 'CTR' | 'CPA';

export type Kpi = {
  metric: KpiMetric;
  target: string;
};

export type Offer = {
  id: string;
  title: string;
  price: string;
  positioning: string;
  valueProposition: string;
};

export type CreativePlan = {
  id: string;
  format: 'Vídeo' | 'Imagem Estática';
  title: string;
  description: string;
  purpose: string;
}

export type Audience = {
  title: string;
  description: string;
}

export type CampaignExecutionPlan = {
  audience: Audience;
  creatives: CreativePlan[];
  planB: {
    audience: Audience;
    creatives: CreativePlan[];
  }
}

export type Campaign = {
  id: string;
  title: string;
  product: string;
  platform: string;
  budget: string;
  description: string;
  execution: CampaignExecutionPlan;
};

export type EmailFlow = {
  id: string;
  title: string;
  audience: string;
  objective: string;
  emails: {
    id: string;
    subject: string;
    content: string;
  }[];
}

export type ChecklistGroup = {
  id: string;
  title: string;
  items: ActionItem[];
};

export type Phase2Product = {
    id: string;
    title: string;
    targetPrice: string;
    description: string;
};

export type Phase2Strategy = {
    title: string;
    secondaryBait: {
        title: string;
        description: string;
    };
    action: {
        title: string;
        description: string;
    }
};

export type InvestmentDetails = {
    title: string;
    description: string;
    budget: {
        daily: string;
        monthly: string;
        breakdown: {
            campaign: string;
            value: string;
        }[];
    };
    projections: {
        title: string;
        items: {
            metric: string;
            value: string;
            description: string;
        }[];
    };
    roi: {
        title: string;
        goal: string;
        description: string;
    };
    scenarios: {
        title: string;
        items: {
            name: string;
            description: string;
        }[];
    };
};

export type CampaignPlan = {
  strategy: {
    title: string;
    description: string;
  };
  kpis: Kpi[];
  offers: Offer[];
  campaigns: Campaign[];
  emailFlows: EmailFlow[];
  executionChecklist: ChecklistGroup[];
  phase2: {
    title: string;
    futureProducts: Phase2Product[];
    audienceStrategy: Phase2Strategy;
  };
  investment: InvestmentDetails;
};

export type TrackingDataRow = {
  id: number;
  period: Date;
  investment: number;
  impressions: number;
  clicks: number;
  leads: number;
  ebookSales: number;
  trainingSales: number;
  revenue: number;
};

const KpiSchema = z.object({
  metric: z.enum(['CPL', 'CTR', 'CPA']),
  target: z.string(),
});

const TrackingDataRowSchema = z.object({
  period: z.string().describe("The start date of the tracking period, in 'yyyy-MM-dd' format."),
  investment: z.number(),
  impressions: z.number(),
  clicks: z.number(),
  leads: z.number(),
  ebookSales: z.number(),
  trainingSales: z.number(),
  revenue: z.number(),
});

export const PerformanceAnalysisInputSchema = z.object({
  kpis: z.array(KpiSchema).describe("Key Performance Indicators with their targets."),
  data: z.array(TrackingDataRowSchema).describe("Time-series data of campaign performance metrics."),
});
export type PerformanceAnalysisInput = z.infer<typeof PerformanceAnalysisInputSchema>;


export const PerformanceAnalysisSchema = z.object({
  summary: z.string().describe("A brief, high-level summary of the campaign's overall performance, highlighting key achievements and areas for concern."),
  suggestions: z.array(z.string()).describe("A list of clear, actionable suggestions for optimization. Each suggestion should be a complete sentence and directly address a specific metric or observation. Prefix suggestions that require immediate attention with 'Atenção: '."),
});
export type PerformanceAnalysis = z.infer<typeof PerformanceAnalysisSchema>;
