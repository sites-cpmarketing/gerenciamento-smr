"use client";

import { useState, useEffect, useMemo } from 'react';
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Gift,
  Megaphone,
  CheckCircle,
  ListTodo,
  DollarSign,
  MousePointerClick,
  Lightbulb,
  Building,
  Rocket,
  TrendingUp,
  Users,
  ShieldQuestion,
  Goal,
  Film,
  Image as ImageIconLucide,
  PiggyBank,
  LineChart,
  Coins
} from 'lucide-react';
import type { CampaignPlan, ActionItem, Kpi, KpiMetric, ChecklistGroup, CreativePlan, Audience, InvestmentDetails } from '@/lib/types';

const kpiIcons: Record<KpiMetric, React.ComponentType<{ className?: string }>> = {
  CPL: DollarSign,
  CTR: MousePointerClick,
  CPA: Target,
};

const creativeIcons: Record<CreativePlan['format'], React.ComponentType<{ className?: string }>> = {
    'Vídeo': Film,
    'Imagem Estática': ImageIconLucide,
};

const ChecklistItem = ({ item, isChecked, onToggle }: { item: ActionItem, isChecked: boolean, onToggle: (checked: boolean) => void }) => {
  const uniqueId = `check-${item.id}`;
  return (
    <div className="flex items-center space-x-3 bg-card-foreground/5 p-3 rounded-lg border border-transparent transition-all hover:border-primary/50">
      <Checkbox id={uniqueId} checked={isChecked} onCheckedChange={onToggle as (checked: CheckedState) => void} />
      <label
        htmlFor={uniqueId}
        className={`text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors ${isChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}
      >
        {item.text}
      </label>
    </div>
  );
};

const KpiDisplay = ({ kpi }: { kpi: Kpi }) => {
  const Icon = kpiIcons[kpi.metric];
  return (
    <Badge variant="secondary" className="flex items-center gap-2 py-1.5 px-3">
      <Icon className="w-4 h-4 text-accent" />
      <span className="font-semibold">{kpi.metric}:</span>
      <span className="text-muted-foreground">{kpi.target}</span>
    </Badge>
  );
};

const ChecklistGroupComponent = ({ group, checkedItems, onToggle }: { group: ChecklistGroup, checkedItems: Record<string, boolean>, onToggle: (id: string, checked: boolean) => void }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {group.items.map(item => <ChecklistItem key={item.id} item={item} isChecked={!!checkedItems[item.id]} onToggle={(checked) => onToggle(item.id, checked)} />)}
                </div>
            </CardContent>
        </Card>
    );
};

const AudienceCard = ({ audience, icon: Icon, title }: { audience: Audience, icon: React.ComponentType<{className?: string}>, title: string }) => {
    const formatDescription = (desc: string) => {
        const parts = desc.split(/(Demografia:|Interesses:|Comportamentos:|Fontes do Site:|Excluir:|Interesses em autores:)/g);
        const elements = [];
        let currentSection = "";

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (part.endsWith(':')) {
                if (currentSection) {
                    elements.push(<p key={i-1} className="text-muted-foreground">{currentSection.trim()}</p>);
                }
                elements.push(<strong key={i} className="text-foreground pt-2 block">{part}</strong>);
                currentSection = "";
            } else {
                currentSection += " " + part;
            }
        }
        if (currentSection) {
            elements.push(<p key={parts.length} className="text-muted-foreground">{currentSection.trim().replace(/ > /g, ' ')}</p>);
        }
        return elements.slice(1);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    <CardTitle>{title}</CardTitle>
                </div>
                <CardDescription as="div" className="pt-2 !mt-2 space-y-1">
                   {formatDescription(audience.description)}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

const CreativeCard = ({ creative }: { creative: CreativePlan }) => {
    const Icon = creativeIcons[creative.format];

    const formatCreativeDescription = (desc: string) => {
        const parts = desc.split(/(Visual:|Copy:)/g);
        const elements = [];
        let currentSection = "";
         for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (part.endsWith(':')) {
                if (currentSection) {
                     elements.push(<p key={i-1} className="text-muted-foreground">{currentSection.trim()}</p>);
                }
                elements.push(<strong key={i} className="text-foreground pt-2 block">{part}</strong>);
                currentSection = "";
            } else {
                currentSection += " " + part;
            }
        }
        if (currentSection) {
            elements.push(<p key={parts.length} className="text-muted-foreground">{currentSection.trim()}</p>);
        }
        return elements.slice(1);
    };

    return (
    <Card className="bg-card-foreground/5 border-l-4 border-primary">
        <CardHeader>
            <CardDescription as="div">
                <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <strong className="text-foreground text-base">{creative.title} ({creative.format})</strong>
                </div>

                <div className="space-y-1">{formatCreativeDescription(creative.description)}</div>

                <div className="flex items-start gap-2 pt-3 mt-3 border-t border-border/50">
                    <Lightbulb className="w-4 h-4 mt-1 text-accent shrink-0" />
                    <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground/80">Propósito:</strong> {creative.purpose}
                    </p>
                </div>
            </CardDescription>
        </CardHeader>
    </Card>
)};

const InvestmentCard = ({ investment }: { investment: InvestmentDetails }) => (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <PiggyBank className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl">{investment.title}</CardTitle>
            </div>
            <CardDescription className="pt-2">{investment.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Orçamento Geral</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-card-foreground/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Diário</p>
                        <p className="text-2xl font-bold text-primary">{investment.budget.daily}</p>
                    </div>
                    <div className="bg-card-foreground/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Mensal (Estimado)</p>
                        <p className="text-2xl font-bold text-primary">{investment.budget.monthly}</p>
                    </div>
                </div>
                <div className="mt-4 space-y-2">
                    {investment.budget.breakdown.map(item => (
                         <div key={item.campaign} className="flex justify-between items-center text-sm bg-card-foreground/5 p-2 rounded-md">
                            <p className="text-muted-foreground">{item.campaign}</p>
                            <p className="font-semibold text-foreground">{item.value}</p>
                         </div>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2"><Coins className="w-5 h-5 text-accent" />{investment.projections.title}</h3>
                <div className="space-y-2">
                    {investment.projections.items.map(item => (
                        <div key={item.metric} className="p-3 bg-card-foreground/5 rounded-lg">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-foreground">{item.metric}</p>
                                <p className="font-bold text-primary">{item.value}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                 <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2"><LineChart className="w-5 h-5 text-accent" />{investment.roi.title}</h3>
                 <div className="p-4 bg-card-foreground/5 rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-foreground">Meta de ROI</p>
                        <p className="text-2xl font-bold text-primary">{investment.roi.goal}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{investment.roi.description}</p>
                 </div>
            </div>

            <div>
                 <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-accent" />{investment.scenarios.title}</h3>
                <div className="space-y-3">
                    {investment.scenarios.items.map(item => (
                         <div key={item.name} className="p-3 border-l-4 border-primary/50 bg-card-foreground/5 rounded-r-lg">
                            <p className="font-semibold text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                         </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);


export function MindFlowApp({ plan }: { plan: CampaignPlan }) {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [isMounted, setIsMounted] = useState(false);

    const allActionItems = useMemo(() =>
        plan.executionChecklist.flatMap(group => group.items)
    , [plan]);

    const totalTasks = allActionItems.length;
    const completedTasks = Object.values(checkedItems).filter(Boolean).length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    useEffect(() => {
        try {
            const storedState = localStorage.getItem('smr-checklist-progress');
            if (storedState) {
                setCheckedItems(JSON.parse(storedState));
            }
        } catch (error) {
            console.error("Failed to parse checklist from localStorage", error);
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('smr-checklist-progress', JSON.stringify(checkedItems));
        }
    }, [checkedItems, isMounted]);

    const handleCheckChange = (id: string, checked: boolean) => {
        setCheckedItems(prev => ({ ...prev, [id]: checked }));
    };

    if (!isMounted) {
        return (
             <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 space-y-10">
            <header className="text-center space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">GERENCIAMENTO SMR</h1>
                <p className="text-lg text-muted-foreground">Painel de Controle da Campanha Mind$ell & Finance</p>
            </header>

            <Tabs defaultValue="fase1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fase1">Fase 1: Lançamento Mind$ell</TabsTrigger>
                 <TabsTrigger value="investimento">Investimento</TabsTrigger>
                <TabsTrigger value="fase2">Fase 2: Expansão</TabsTrigger>
              </TabsList>
              <TabsContent value="fase1" className="space-y-8 mt-8">

                 <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Gift className="w-7 h-7 text-primary" />
                        <h2 className="text-2xl font-bold">Produtos e Ofertas</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-1">
                        {plan.offers.map(offer => (
                            <Card key={offer.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                      <CardTitle>{offer.title} - <span className="text-primary">{offer.price}</span></CardTitle>
                                    </div>
                                    <CardDescription className="pt-2 !mt-4">
                                      <strong className="text-foreground">Posicionamento:</strong> {offer.positioning}
                                    </CardDescription>
                                     <CardDescription className="pt-2">
                                      <strong className="text-foreground">Proposta de Valor:</strong> {offer.valueProposition}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Goal className="w-7 h-7 text-primary" />
                        <h2 className="text-2xl font-bold">Objetivos e Métricas (KPIs)</h2>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{plan.strategy.title}</CardTitle>
                            <CardDescription className="pt-2">{plan.strategy.description}</CardDescription>
                            <div className="flex flex-wrap gap-2 pt-4">
                                {plan.kpis.map(kpi => <KpiDisplay key={kpi.metric + kpi.target} kpi={kpi} />)}
                            </div>
                        </CardHeader>
                    </Card>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Megaphone className="w-7 h-7 text-primary" />
                        <h2 className="text-2xl font-bold">Campanhas e Planos de Execução</h2>
                    </div>
                    <Accordion type="multiple" className="w-full space-y-6">
                        {plan.campaigns.map(campaign => (
                             <AccordionItem value={campaign.id} key={campaign.id}>
                                <AccordionTrigger>
                                  <div className="flex items-center gap-3 w-full">
                                      <div className="flex-grow text-left">
                                          <p className="text-xl font-bold">{campaign.title}</p>
                                          <div className="flex items-center gap-4 mt-2">
                                            <Badge>{campaign.platform}</Badge>
                                            <Badge variant="secondary">Orçamento: {campaign.budget}</Badge>
                                            <Badge variant="outline">Produto: {campaign.product}</Badge>
                                          </div>
                                      </div>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-6 space-y-6">
                                    <Card className="bg-card-foreground/5">
                                      <CardHeader>
                                        <CardTitle>Descrição da Campanha</CardTitle>
                                        <CardDescription className="pt-2">{campaign.description}</CardDescription>
                                      </CardHeader>
                                    </Card>

                                    <h3 className="text-lg font-semibold text-primary pl-1">Plano Principal</h3>
                                    <div className="grid gap-6">
                                       <AudienceCard audience={campaign.execution.audience} icon={Users} title="Público" />
                                       <div className="space-y-4">
                                         {campaign.execution.creatives.map(creative => (
                                            <CreativeCard key={creative.id} creative={creative} />
                                         ))}
                                       </div>
                                    </div>

                                    <h3 className="text-lg font-semibold text-destructive pl-1">Plano B (Contingência)</h3>
                                     <div className="grid gap-6">
                                       <AudienceCard audience={campaign.execution.planB.audience} icon={ShieldQuestion} title="Público Alternativo" />
                                       <div className="space-y-4">
                                            {campaign.execution.planB.creatives.map(creative => (
                                                <CreativeCard key={creative.id} creative={creative} />
                                            ))}
                                       </div>
                                    </div>
                                </AccordionContent>
                             </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                <Accordion type="single" collapsible className="w-full space-y-6">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                          <ListTodo className="w-7 h-7 text-primary" />
                          <h2 className="text-2xl font-bold">Checklist de Execução</h2>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-6 space-y-8">
                       <Card className="shadow-lg">
                          <CardHeader>
                              <div className="flex items-center gap-4">
                                  <CheckCircle className="w-8 h-8 text-accent" />
                                  <div>
                                      <CardTitle>Progresso da Campanha</CardTitle>
                                      <CardDescription>{completedTasks} de {totalTasks} tarefas concluídas</CardDescription>
                                  </div>
                              </div>
                          </CardHeader>
                          <CardContent>
                              <Progress value={progressPercentage} className="h-3" />
                          </CardContent>
                      </Card>
                      <div className="space-y-4">
                          {plan.executionChecklist.map(group => (
                              <ChecklistGroupComponent key={group.id} group={group} checkedItems={checkedItems} onToggle={handleCheckChange} />
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
               <TabsContent value="investimento" className="space-y-8 mt-8">
                    <InvestmentCard investment={plan.investment} />
              </TabsContent>
              <TabsContent value="fase2" className="space-y-8 mt-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Rocket className="w-6 h-6 text-primary" />
                                <CardTitle className="text-xl">{plan.phase2.title}</CardTitle>
                            </div>
                            <CardDescription className="pt-2">Planejamento futuro para o lançamento dos produtos de maior valor e construção de audiência qualificada.</CardDescription>
                        </CardHeader>
                    </Card>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Building className="w-7 h-7 text-primary" />
                            <h2 className="text-2xl font-bold">Produtos Futuros</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-1">
                            {plan.phase2.futureProducts.map(product => (
                                <Card key={product.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                          <CardTitle>{product.title} - <span className="text-primary">{product.targetPrice}</span></CardTitle>
                                        </div>
                                        <CardDescription className="pt-2 !mt-4">
                                         {product.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-7 h-7 text-primary" />
                            <h2 className="text-2xl font-bold">{plan.phase2.audienceStrategy.title}</h2>
                        </div>
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{plan.phase2.audienceStrategy.secondaryBait.title}</CardTitle>
                                    <CardDescription className="pt-2">{plan.phase2.audienceStrategy.secondaryBait.description}</CardDescription>
                                </CardHeader>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle>{plan.phase2.audienceStrategy.action.title}</CardTitle>
                                    <CardDescription className="pt-2">{plan.phase2.audienceStrategy.action.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </section>
              </TabsContent>
            </Tabs>
        </div>
    );
}