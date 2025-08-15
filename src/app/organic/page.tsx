
"use client";

import { useState, useEffect } from 'react';
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Instagram, Mic, Video, FileText, Lightbulb, CalendarDays, Users, BarChartHorizontal, Home } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const organicPlan = {
  strategy: {
    title: "Estratégia de Conteúdo Orgânico - Aquecimento e Autoridade",
    description: "O objetivo central é transformar o Instagram da SMR em uma ferramenta de aquecimento de audiência. Vamos criar conteúdo de valor que estabeleça autoridade no nicho de vendas e PNL, construir uma comunidade engajada e, crucialmente, educar o público para o funil de vendas de baixo custo (E-book Mind$ell) e identificar leads qualificados para o upsell do Treinamento. A estratégia orgânica alimenta a paga, criando públicos de remarketing mais quentes e aumentando a taxa de conversão.",
  },
  pillars: [
    { id: "p1", title: "Técnicas de Vendas Práticas", description: "Dicas acionáveis, gatilhos mentais e hacks de vendas que o público pode aplicar imediatamente. Conecta-se diretamente com a promessa do E-book." },
    { id: "p2", title: "PNL Aplicada a Vendas", description: "Como usar PNL para entender a mente do cliente, criar rapport e melhorar a comunicação. Desmistifica a PNL e gera curiosidade para o Treinamento." },
    { id: "p3", title: "Mentalidade de Vendedor", description: "Conteúdo sobre motivação, resiliência, superação de objeções e a psicologia do sucesso em vendas. Gera conexão e inspiração." },
    { id: "p4", title: "Bastidores e Prova Social", description: "Mostrar resultados de alunos (mesmo que iniciais), o dia a dia, e a construção da autoridade para gerar confiança e desejo." },
  ],
  formats: [
    { id: "f1", title: "Reels (Atração)", icon: Video, description: "Vídeos curtos e dinâmicos com dicas rápidas e tendências para alcançar novas audiências e crescer o perfil." },
    { id: "f2", title: "Carrossel (Educação)", icon: FileText, description: "Conteúdo denso e educativo, em formato de passo a passo, para aprofundar nos pilares e gerar salvamentos." },
    { id: "f3", title: "Stories (Conexão)", icon: Instagram, description: "Enquetes, caixas de perguntas, bastidores e rotina diária para criar um relacionamento próximo com a audiência." },
    { id: "f4", title: "Lives (Aprofundamento)", icon: Mic, description: "Aulas ao vivo para aprofundar em temas complexos, quebrar objeções e fazer ofertas diretas para a audiência qualificada." },
  ],
  weeklySchedule: {
    title: "Exemplo de Calendário Semanal",
    description: "Um cronograma base para garantir consistência e cobrir todos os pilares de conteúdo de forma equilibrada.",
    schedule: [
        { day: "Segunda-feira", post: "Reel do Pilar 3 (Motivação para a semana)" },
        { day: "Terça-feira", post: "Carrossel do Pilar 1 (3 Técnicas de Fechamento)" },
        { day: "Quarta-feira", post: "Reel do Pilar 2 (Erro comum de PNL em vendas)" },
        { day: "Quinta-feira", post: "Carrossel do Pilar 4 (Estudo de caso de um aluno/cliente)" },
        { day: "Sexta-feira", post: "Reel de 'Pergunta e Resposta' (interação)" },
        { day: "Sábado/Domingo", post: "Post mais leve ou reflexivo" },
        { day: "Stories Diários", post: "Mix de bastidores, enquetes e caixas de perguntas" },
    ]
  },
  checklist: [
    {
      id: "phase1",
      title: "Fase 1: Configuração e Planejamento (Semana 1-2)",
      items: [
        { id: "c1", text: "Revisar e otimizar a bio do Instagram com uma proposta de valor clara e link para a oferta principal (E-book)." },
        { id: "c2", text: "Definir paleta de cores, fontes e criar 3-5 templates básicos no Canva/Figma para os posts." },
        { id: "c3", text: "Criar 5 Destaques estratégicos: 'Comece Aqui', 'E-book', 'Alunos', 'Técnicas', 'PNL'." },
        { id: "c4", text: "Planejar o calendário de conteúdo do primeiro mês (mínimo 12 posts), distribuindo os temas entre os pilares." },
        { id: "c5", text: "Roteirizar os 4 primeiros Reels (1 de cada pilar) com foco em ganchos fortes nos primeiros 3 segundos." },
        { id: "c6", text: "Estruturar o conteúdo para 2 Carrosséis educativos para aprofundar nos pilares 1 e 2." },
        { id: "c7", text: "Definir o tema e a estrutura da primeira Live: '5 Erros que te Impedem de Vender (e como a PNL corrige isso)'." },
      ]
    },
    {
      id: "phase2",
      title: "Fase 2: Execução Inicial e Análise (Semana 3-4)",
      items: [
        { id: "c8", text: "Gravar e editar o primeiro lote de 4 Reels." },
        { id: "c9", text: "Criar a arte e as legendas para os 2 primeiros Carrosséis." },
        { id: "c10", text: "Agendar os posts da primeira semana usando Meta Business Suite ou similar." },
        { id: "c11", text: "Definir estratégia de Stories: Mínimo de 3-5 stories por dia (Ex: Bom dia com enquete, Bastidores do trabalho, Dica rápida, Caixa de perguntas)." },
        { id: "c12", text: "Promover a primeira Live nos Stories com contagem regressiva durante 3 dias." },
        { id: "c13", text: "Executar a primeira Live e, ao final, fazer a chamada para ação para o E-book." },
        { id: "c14", text: "Analisar as métricas da primeira semana: quais posts tiveram mais engajamento e salvamentos?" },
        { id: "c15", text: "Criar um público personalizado no Gerenciador de Anúncios com base no engajamento do Instagram (últimos 30 dias)." }
      ]
    }
  ]
};

const ChecklistItem = ({ item, isChecked, onToggle }: { item: { id: string, text: string }, isChecked: boolean, onToggle: (checked: boolean) => void }) => {
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

export default function OrganicPage() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        try {
            const storedState = localStorage.getItem('smr-organic-checklist');
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
            localStorage.setItem('smr-organic-checklist', JSON.stringify(checkedItems));
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
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-12">
       <header className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="outline" size="icon">
                        <Home className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="text-left space-y-1">
                    <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">GESTÃO DE CONTEÚDO ORGÂNICO</h1>
                    <p className="text-md text-muted-foreground">Plano de Ação para Construção de Autoridade e Vendas no Instagram</p>
                </div>
            </div>
        </header>

        <div className="space-y-10">
            <Card className="border-l-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl"><Lightbulb className="w-6 h-6 text-primary"/>{organicPlan.strategy.title}</CardTitle>
                    <CardDescription className="pt-2 text-base leading-relaxed">{organicPlan.strategy.description}</CardDescription>
                </CardHeader>
            </Card>

            <section className="space-y-6">
                 <h2 className="text-2xl font-bold flex items-center gap-3"><Users className="w-6 h-6 text-primary" />Pilares de Conteúdo</h2>
                 <div className="grid gap-6 md:grid-cols-2">
                    {organicPlan.pillars.map(pillar => (
                        <Card key={pillar.id} className="bg-card-foreground/5">
                            <CardHeader>
                                <CardTitle>{pillar.title}</CardTitle>
                                <CardDescription className="pt-2">{pillar.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                 </div>
            </section>

             <section className="space-y-6">
                 <h2 className="text-2xl font-bold flex items-center gap-3"><BarChartHorizontal className="w-6 h-6 text-primary" />Formatos Estratégicos</h2>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {organicPlan.formats.map(format => {
                        const Icon = format.icon;
                        return (
                            <Card key={format.id}>
                                <CardHeader className="text-center items-center">
                                    <Icon className="w-8 h-8 text-primary mb-2"/>
                                    <CardTitle>{format.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-center text-muted-foreground">{format.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                 </div>
            </section>

             <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-3"><CalendarDays className="w-6 h-6 text-primary" />{organicPlan.weeklySchedule.title}</h2>
                <Card>
                    <CardHeader>
                       <CardDescription>{organicPlan.weeklySchedule.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {organicPlan.weeklySchedule.schedule.map(item => (
                                <div key={item.day} className="flex items-center gap-4 p-3 bg-card-foreground/5 rounded-lg">
                                    <p className="font-semibold text-primary w-32">{item.day}</p>
                                    <p className="text-foreground">{item.post}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

             <section className="space-y-8">
                 <h2 className="text-2xl font-bold">Checklist de Implementação</h2>
                 {organicPlan.checklist.map(phase => (
                     <Card key={phase.id}>
                        <CardHeader>
                            <CardTitle className="text-xl">{phase.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {phase.items.map(item => (
                                    <ChecklistItem
                                        key={item.id}
                                        item={item}
                                        isChecked={!!checkedItems[item.id]}
                                        onToggle={(checked) => handleCheckChange(item.id, checked)}
                                    />
                                ))}
                            </div>
                        </CardContent>
                     </Card>
                 ))}
            </section>
        </div>
    </div>
  );
}

    