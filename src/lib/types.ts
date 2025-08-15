export type ActionItem = {
  id: string;
  text: string;
  details?: string;
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
  executionChecklist: ChecklistGroup[];
  phase2: {
    title: string;
    futureProducts: Phase2Product[];
    audienceStrategy: Phase2Strategy;
  };
  investment: InvestmentDetails;
};