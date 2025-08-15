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
  description: string;
  actionItems: ActionItem[];
};

export type Campaign = {
  id: string;
  title: string;
  platform: string;
  kpis: Kpi[];
  actionItems: ActionItem[];
};

export type CampaignPlan = {
  strategy: {
    title: string;
    description: string;
    actionItems: ActionItem[];
  };
  offers: Offer[];
  campaigns: Campaign[];
};
