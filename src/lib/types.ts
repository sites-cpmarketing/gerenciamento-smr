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
  headline: string;
  text: string;
  purpose: string;
}

export type Audience = {
  title: string;
  description: string;
}

export type CampaignExecutionPlan = {
  audience: Audience;
  creative: CreativePlan;
  planB: {
    audience: Audience;
    creative: CreativePlan;
  }
}

export type Campaign = {
  id: string;
  title: string;
  platform: string;
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
};
