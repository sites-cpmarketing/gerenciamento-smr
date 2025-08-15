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
  Mail,
  Lightbulb,
  Building,
  Rocket,
  TrendingUp
} from 'lucide-react';
import type { CampaignPlan, ActionItem, Kpi, KpiMetric, ChecklistGroup } from '@/lib/types';

const kpiIcons: Record<KpiMetric, React.ComponentType<{ className?: string }>> = {
  CPL: DollarSign,
  CTR: MousePointerClick,
  CPA: Target,
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

const ChecklistGroup = ({ group, checkedItems, onToggle }: { group: ChecklistGroup, checkedItems: Record<string, boolean>, onToggle: (id: string, checked: boolean) => void }) => {
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fase1">Fase 1: Lançamento Mind$ell</TabsTrigger>
                <TabsTrigger value="fase2">Fase 2: Expansão</TabsTrigger>
              </TabsList>
              <TabsContent value="fase1" className="space-y-8 mt-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Target className="w-6 h-6 text-primary" />
                            <CardTitle className="text-xl">{plan.strategy.title}</CardTitle>
                        </div>
                        <CardDescription className="pt-2">{plan.strategy.description}</CardDescription>
                    </CardHeader>
                </Card>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Gift className="w-7 h-7 text-primary" />
                        <h2 className="text-2xl font-bold">Ofertas e Posicionamento</h2>
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
                        <Megaphone className="w-7 h-7 text-primary" />
                        <h2 className="text-2xl font-bold">Campanhas e Públicos</h2>
                    </div>
                    <div className="space-y-6">
                        {plan.campaigns.map(campaign => {
                            return (
                                <Card key={campaign.id}>
                                    <CardHeader>
                                        <CardTitle>{campaign.title}</CardTitle>
                                        <Badge className="w-fit mt-2">
                                            {campaign.platform}
                                        </Badge>
                                        <CardDescription className="pt-2">{campaign.description}</CardDescription>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {campaign.kpis.map(kpi => <KpiDisplay key={kpi.metric + kpi.target} kpi={kpi} />)}
                                        </div>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                         <Card>
                            <CardHeader>
                                <CardTitle>Público-Alvo (Vendas e PNL)</CardTitle>
                                <CardDescription className="pt-2">Vendedores, empreendedores, coaches, consultores, profissionais de marketing. Interesses em: vendas, negociação, PNL, persuasão, desenvolvimento pessoal, Tony Robbins, Dale Carnegie.</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Mail className="w-7 h-7 text-primary" />
                        <h2 className="text-2xl font-bold">Fluxos de Automação de E-mail</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-1">
                        {plan.emailFlows.map(flow => (
                            <Card key={flow.id}>
                                <CardHeader>
                                    <CardTitle>{flow.title}</CardTitle>
                                    <CardDescription className="pt-2">{flow.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                 <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="w-7 h-7 text-primary" />
                        <h2 className="text-2xl font-bold">Detalhamento dos Anúncios</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-1">
                        {plan.creatives.map(creative => (
                            <Card key={creative.id}>
                                <CardHeader>
                                    <CardTitle>{creative.for}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                   <p className="text-sm"><strong>Headline:</strong> {creative.headline}</p>
                                   <p className="text-sm text-muted-foreground"><strong>Propósito:</strong> {creative.text}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
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
                              <ChecklistGroup key={group.id} group={group} checkedItems={checkedItems} onToggle={handleCheckChange} />
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
