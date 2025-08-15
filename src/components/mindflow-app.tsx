"use client";

import { useState, useEffect, useMemo } from 'react';
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  Gift,
  Megaphone,
  CheckCircle,
  ListTodo,
  DollarSign,
  MousePointerClick,
  Instagram,
  FileText,
  GraduationCap
} from 'lucide-react';
import type { CampaignPlan, ActionItem, Kpi, KpiMetric } from '@/lib/types';

const kpiIcons: Record<KpiMetric, React.ComponentType<{ className?: string }>> = {
  CPL: DollarSign,
  CTR: MousePointerClick,
  CPA: Target,
};

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Meta Ads": Megaphone,
  "Instagram (Orgânico)": Instagram,
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

const OfferIcon = ({ title }: { title: string }) => {
  if (title.toLowerCase().includes('e-book')) {
    return <FileText className="w-7 h-7 text-primary" />;
  }
  if (title.toLowerCase().includes('treinamento')) {
    return <GraduationCap className="w-7 h-7 text-primary" />;
  }
  return <Gift className="w-7 h-7 text-primary" />;
}

export function MindFlowApp({ plan }: { plan: CampaignPlan }) {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [isMounted, setIsMounted] = useState(false);

    const allActionItems = useMemo(() => [
        ...plan.strategy.actionItems,
        ...plan.offers.flatMap(o => o.actionItems),
        ...plan.campaigns.flatMap(c => c.actionItems),
    ], [plan]);

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
                <p className="text-lg text-muted-foreground">Painel de Controle da Campanha Mind$ell</p>
            </header>
            
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

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Target className="w-6 h-6 text-primary" />
                        <CardTitle className="text-xl">{plan.strategy.title}</CardTitle>
                    </div>
                    <CardDescription className="pt-2">{plan.strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <h4 className="font-semibold mb-3 text-sm text-muted-foreground flex items-center gap-2"><ListTodo className="w-4 h-4" />Checklist de Execução</h4>
                    <div className="space-y-2">
                        {plan.strategy.actionItems.map(item => <ChecklistItem key={item.id} item={item} isChecked={!!checkedItems[item.id]} onToggle={(checked) => handleCheckChange(item.id, checked)} />)}
                    </div>
                </CardContent>
            </Card>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Gift className="w-7 h-7 text-primary" />
                    <h2 className="text-2xl font-bold">Produtos e Ofertas</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-1">
                    {plan.offers.map(offer => (
                        <Card key={offer.id}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                  <OfferIcon title={offer.title}/>
                                  <CardTitle>{offer.title}</CardTitle>
                                </div>
                                <CardDescription className="pt-2">{offer.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold mb-3 text-sm text-muted-foreground flex items-center gap-2"><ListTodo className="w-4 h-4" />Afazeres da Oferta</h4>
                                <div className="space-y-2">
                                    {offer.actionItems.map(item => <ChecklistItem key={item.id} item={item} isChecked={!!checkedItems[item.id]} onToggle={(checked) => handleCheckChange(item.id, checked)} />)}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Megaphone className="w-7 h-7 text-primary" />
                    <h2 className="text-2xl font-bold">Frentes de Campanha</h2>
                </div>
                <div className="space-y-6">
                    {plan.campaigns.map(campaign => {
                        const PlatformIcon = platformIcons[campaign.platform] || Megaphone;
                        return (
                            <Card key={campaign.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle>{campaign.title}</CardTitle>
                                        <Badge>
                                            <PlatformIcon className="w-4 h-4 mr-2" />
                                            {campaign.platform}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {campaign.kpis.map(kpi => <KpiDisplay key={kpi.metric + kpi.target} kpi={kpi} />)}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h4 className="font-semibold mb-3 text-sm text-muted-foreground flex items-center gap-2"><ListTodo className="w-4 h-4" />Afazeres da Frente</h4>
                                    <div className="space-y-2">
                                        {campaign.actionItems.map(item => <ChecklistItem key={item.id} item={item} isChecked={!!checkedItems[item.id]} onToggle={(checked) => handleCheckChange(item.id, checked)} />)}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </section>
        </div>
    );
}
