"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  Coins,
  Mails,
  BarChartHorizontal,
  Wand2,
  BrainCircuit,
  AlertTriangle,
  Trash2,
  CalendarDays,
  PlusCircle,
} from 'lucide-react';
import type { CampaignPlan, ActionItem, Kpi, KpiMetric, ChecklistGroup, CreativePlan, Audience, InvestmentDetails, EmailFlow, TrackingDataRow, PerformanceAnalysis } from '@/lib/types';
import { analyseCampaignPerformance } from '@/ai/flows/analyse-flow';
import { Skeleton } from './ui/skeleton';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
        const parts = desc.split(/(Demografia:|Interesses:|Comportamentos:|Fontes do Site:|Excluir:|Interesses em autores:|Idade:|Localização:)/g);
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

const EmailFlows = ({ flows }: { flows: EmailFlow[] }) => (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Mails className="w-7 h-7 text-primary" />
        <h2 className="text-2xl font-bold">Fluxo de Nutrição de E-mails</h2>
      </div>
      <Accordion type="multiple" className="w-full space-y-6">
        {flows.map(flow => (
          <AccordionItem value={flow.id} key={flow.id} className="bg-card border rounded-lg px-4">
            <AccordionTrigger>
              <div className="text-left">
                <p className="text-xl font-bold">{flow.title}</p>
                <Badge variant="secondary" className="mt-2">Público: {flow.audience}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <Card className="bg-card-foreground/5">
                <CardHeader>
                  <CardTitle className="text-base">Objetivo do Fluxo</CardTitle>
                  <CardDescription>{flow.objective}</CardDescription>
                </CardHeader>
              </Card>
              <div className="space-y-3">
                {flow.emails.map(email => (
                  <Card key={email.id} className="border-l-4 border-accent">
                    <CardHeader>
                      <CardTitle className="text-lg">Assunto: <span className="font-normal">{email.subject}</span></CardTitle>
                      <CardDescription className="pt-2"><strong className="text-foreground">Resumo do Conteúdo:</strong> {email.content}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );

const CampaignTracking = ({ plan }: { plan: CampaignPlan }) => {
    const initialData: TrackingDataRow[] = [
      { id: 1, period: "Semana 1 (01-07 Jul)", investment: 126, impressions: 15000, clicks: 135, leads: 32, ebookSales: 5, trainingSales: 1, revenue: 196.50 },
      { id: 2, period: "Semana 2 (08-14 Jul)", investment: 126, impressions: 0, clicks: 0, leads: 0, ebookSales: 0, trainingSales: 0, revenue: 0 },
    ];
    
    type StoredAnalysis = PerformanceAnalysis & { id: string; date: string };
    
    const [trackingData, setTrackingData] = useState<TrackingDataRow[]>([]);
    const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            const storedAnalyses = localStorage.getItem('smr-analyses');
            if (storedAnalyses) {
                setAnalyses(JSON.parse(storedAnalyses));
            }
            const storedTrackingData = localStorage.getItem('smr-tracking-data');
            if (storedTrackingData) {
                setTrackingData(JSON.parse(storedTrackingData));
            } else {
                setTrackingData(initialData);
            }
        } catch (error) {
            console.error("Failed to parse from localStorage", error);
            setTrackingData(initialData);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('smr-analyses', JSON.stringify(analyses));
            localStorage.setItem('smr-tracking-data', JSON.stringify(trackingData));
        }
    }, [analyses, trackingData, isMounted]);

    const handleDataChange = (id: number, field: keyof TrackingDataRow, value: string | number) => {
        let updatedData = trackingData.map(row => {
            if (row.id === id) {
                const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
                return { ...row, [field]: numericValue };
            }
            return row;
        });

        updatedData = updatedData.map(row => {
            if(row.id === id && (field === 'ebookSales' || field === 'trainingSales')) {
                 const revenue = (row.ebookSales * 19.90) + (row.trainingSales * 97.00);
                 return {...row, revenue };
            }
            return row;
        });

        setTrackingData(updatedData);
    };

    const handlePeriodChange = (id: number, value: string) => {
         setTrackingData(trackingData.map(row => (row.id === id ? { ...row, period: value } : row)));
    };
    
    const handleAddRow = () => {
        const newRow: TrackingDataRow = {
            id: new Date().getTime(),
            period: `Semana ${trackingData.length + 1}`,
            investment: 0,
            impressions: 0,
            clicks: 0,
            leads: 0,
            ebookSales: 0,
            trainingSales: 0,
            revenue: 0,
        };
        setTrackingData([...trackingData, newRow]);
    };

    const handleRemoveRow = (id: number) => {
        setTrackingData(trackingData.filter(row => row.id !== id));
    };


    const calculateCTR = (impressions: number, clicks: number) => {
        if (impressions === 0) return "0.00%";
        return `${((clicks / impressions) * 100).toFixed(2)}%`;
    }

    const calculateCPC = (investment: number, clicks: number) => {
        if (clicks === 0) return "N/A";
        return `R$ ${(investment / clicks).toFixed(2)}`;
    }

    const calculateCPL = (investment: number, leads: number) => {
        if (leads === 0) return "N/A";
        return `R$ ${(investment / leads).toFixed(2)}`;
    };

    const calculateROI = (investment: number, revenue: number) => {
        if (investment === 0) return "N/A";
        const roi = (revenue - investment) / investment;
        return roi.toFixed(2);
    };

    const handleAnalyse = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await analyseCampaignPerformance({
                kpis: plan.kpis,
                data: trackingData.filter(d => d.investment > 0),
            });
            const newAnalysis: StoredAnalysis = {
                ...result,
                id: new Date().toISOString(),
                date: new Date().toISOString(),
            };
            setAnalyses(prev => [newAnalysis, ...prev]);
        } catch (error) {
            console.error("Error analysing performance:", error);
             const errorAnalysis: StoredAnalysis = {
                id: new Date().toISOString(),
                date: new Date().toISOString(),
                summary: "Ocorreu um erro ao analisar os dados. Por favor, tente novamente.",
                suggestions: []
            };
            setAnalyses(prev => [errorAnalysis, ...prev]);
        }
        setIsLoading(false);
    }, [trackingData, plan.kpis]);
    
    const handleDeleteAnalysis = (id: string) => {
        setAnalyses(prev => prev.filter(a => a.id !== id));
    };


    return (
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <BarChartHorizontal className="w-7 h-7 text-primary" />
                <h2 className="text-2xl font-bold">Acompanhamento de Performance</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Métricas da Campanha</CardTitle>
                    <CardDescription>
                        Acompanhe os resultados da campanha semanalmente para otimizar o investimento e as estratégias.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[150px]">Período</TableHead>
                                    <TableHead>Investimento (R$)</TableHead>
                                    <TableHead>Impressões</TableHead>
                                    <TableHead>Cliques</TableHead>
                                    <TableHead>CTR</TableHead>
                                    <TableHead>CPC</TableHead>
                                    <TableHead>Leads</TableHead>
                                    <TableHead>CPL</TableHead>
                                    <TableHead>Vendas E-book</TableHead>
                                    <TableHead>Vendas Treinamento</TableHead>
                                    <TableHead>Receita</TableHead>
                                    <TableHead>ROI</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trackingData.map((row) => {
                                    const roi = calculateROI(row.investment, row.revenue);
                                    const roiValue = parseFloat(roi);
                                    const ctr = calculateCTR(row.impressions, row.clicks);
                                    const cpc = calculateCPC(row.investment, row.clicks);
                                    const cpl = calculateCPL(row.investment, row.leads);

                                    return (
                                    <TableRow key={row.id}>
                                        <TableCell className="font-medium">
                                          <Input type="text" value={row.period} onChange={e => handlePeriodChange(row.id, e.target.value)} className="w-36" />
                                        </TableCell>
                                        <TableCell>
                                          <Input type="number" value={row.investment} onChange={e => handleDataChange(row.id, 'investment', e.target.value)} className="w-24" />
                                        </TableCell>
                                        <TableCell>
                                          <Input type="number" value={row.impressions} onChange={e => handleDataChange(row.id, 'impressions', e.target.value)} className="w-24" />
                                        </TableCell>
                                        <TableCell>
                                          <Input type="number" value={row.clicks} onChange={e => handleDataChange(row.id, 'clicks', e.target.value)} className="w-20" />
                                        </TableCell>
                                        <TableCell>{ctr}</TableCell>
                                        <TableCell>{cpc}</TableCell>
                                        <TableCell>
                                          <Input type="number" value={row.leads} onChange={e => handleDataChange(row.id, 'leads', e.target.value)} className="w-20" />
                                        </TableCell>
                                        <TableCell>{cpl}</TableCell>
                                        <TableCell>
                                          <Input type="number" value={row.ebookSales} onChange={e => handleDataChange(row.id, 'ebookSales', e.target.value)} className="w-20" />
                                        </TableCell>
                                        <TableCell>
                                          <Input type="number" value={row.trainingSales} onChange={e => handleDataChange(row.id, 'trainingSales', e.target.value)} className="w-20" />
                                        </TableCell>
                                        <TableCell className="font-semibold">R$ {row.revenue.toFixed(2)}</TableCell>
                                        <TableCell className={`font-bold ${roiValue >= 1.0 ? 'text-green-500' : (roiValue >= 0 ? 'text-yellow-500' : 'text-red-500')}`}>
                                          {roi}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveRow(row.id)}>
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )})}
                            </TableBody>
                            <TableCaption>
                                <Button variant="outline" onClick={handleAddRow}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar Período
                                </Button>
                            </TableCaption>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <div className="space-y-4">
                <Button onClick={handleAnalyse} disabled={isLoading}>
                    {isLoading ? "Analisando..." : <> <Wand2 className="mr-2 h-4 w-4" /> Gerar Análise com IA </>}
                </Button>

                {isLoading && (
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary" /> Análise de Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-[80%]" />
                           <div className="pt-4 space-y-3">
                                <Skeleton className="h-8 w-1/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                           </div>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-6 mt-6">
                    {analyses.map((analysis) => (
                        <Card key={analysis.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary" /> Análise de Performance</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-2">
                                            <CalendarDays className="w-4 h-4"/>
                                            {format(new Date(analysis.date), "dd 'de' MMMM 'de' yyyy, 'às' HH:mm", { locale: ptBR })}
                                        </CardDescription>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAnalysis(analysis.id)}>
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-6">{analysis.summary}</p>
                                <div className="space-y-4">
                                    {analysis.suggestions.map((suggestion, index) => (
                                        <Alert key={index} variant={suggestion.includes("Atenção") ? "destructive" : "default"}>
                                           {suggestion.includes("Atenção") ? <AlertTriangle className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
                                            <AlertTitle>{suggestion.includes("Atenção") ? "Ponto de Atenção" : "Sugestão de Otimização"}</AlertTitle>
                                            <AlertDescription>
                                                {suggestion.replace("Atenção: ", "")}
                                            </AlertDescription>
                                        </Alert>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
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
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-10">
            <header className="text-center space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">GERENCIAMENTO SMR</h1>
                <p className="text-lg text-muted-foreground">Painel de Controle da Campanha Mind$ell & Finance</p>
            </header>

            <Tabs defaultValue="fase1" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="fase1">Fase 1: Lançamento</TabsTrigger>
                <TabsTrigger value="acompanhamento">Acompanhamento</TabsTrigger>
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
                             <AccordionItem value={campaign.id} key={campaign.id} className="bg-card border rounded-lg px-4">
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

                <EmailFlows flows={plan.emailFlows} />

                <Accordion type="single" collapsible className="w-full space-y-6">
                  <AccordionItem value="item-1" className="bg-card border rounded-lg px-4">
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
               <TabsContent value="acompanhamento" className="space-y-8 mt-8">
                    <CampaignTracking plan={plan}/>
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

    