
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChartHorizontal, Users } from "lucide-react";
import Link from "next/link";

export default function HubPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-headline font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
                SMR DASHBOARD
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
                Sua central de controle para marketing de performance.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/traffic" className="group">
                <Card className="h-full hover:border-primary/80 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                <BarChartHorizontal className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Gestão de Tráfego Pago</CardTitle>
                                <CardDescription className="mt-1">Painel de campanhas, métricas e ROI.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Monitore e otimize suas campanhas de tráfego pago, analise o desempenho com IA e acompanhe os KPIs para maximizar seu retorno sobre o investimento.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Acessar Painel de Tráfego
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/organic" className="group">
                <Card className="h-full hover:border-primary/80 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Gestão de Conteúdo Orgânico</CardTitle>
                                <CardDescription className="mt-1">Planejamento de conteúdo para Instagram.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Organize sua estratégia de conteúdo para o Instagram, defina pilares, planeje posts e acompanhe seu calendário editorial para construir uma audiência engajada.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Acessar Painel Orgânico
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </Link>
        </div>
      </div>
    </main>
  );
}
