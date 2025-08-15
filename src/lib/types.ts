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

export type Creative = {
  id: string;
  for: string;
  headline: string;
  text: string;
};

export type EmailFlow = {
  id: string;
  title: string;
  description: string;
};

export type Campaign = {
  id: string;
  title: string;
  platform: string;
  kpis: Kpi[];
  actionItems: ActionItem[];
  description: string;
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
  offers: Offer[];
  campaigns: Campaign[];
  emailFlows: EmailFlow[];
  creatives: Creative[];
  executionChecklist: ChecklistGroup[];
  phase2: {
    title: string;
    futureProducts: Phase2Product[];
    audienceStrategy: Phase2Strategy;
  };
};
