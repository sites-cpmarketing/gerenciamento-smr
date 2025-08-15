
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Instagram, Mic, Video, FileText, Calendar, Lightbulb } from "lucide-react";

// Mock data for organic content plan
const organicPlan = {
  strategy: {
    title: "Estratégia de Conteúdo Orgânico - Instagram SMR",
    description: "O objetivo é estabelecer a SMR como autoridade no nicho de vendas e PNL, construir uma comunidade engajada e gerar leads qualificados de forma orgânica, que serão nutridos para futuras ofertas.",
  },
  pillars: [
    { id: "p1", title: "Técnicas de Vendas", description: "Dicas práticas, gatilhos mentais e hacks de vendas." },
    { id: "p2", title: "PNL Aplicada", description: "Como usar PNL para entender clientes e melhorar a comunicação." },
    { id: "p3", title: "Mentalidade de Vendedor", description: "Motivação, superação de objeções e resiliência." },
    { id: "p4", title: "Bastidores e Prova Social", description: "Resultados de alunos, dia a dia e construção de autoridade." },
  ],
  formats: [
    { id: "f1", title: "Reels", icon: Video, description: "Vídeos curtos com dicas rápidas e tendências." },
    { id: "f2", title: "Carrossel", icon: FileText, description: "Conteúdo denso e educativo, passo a passo." },
    { id: "f3", title: "Stories", icon: Instagram, description: "Enquetes, perguntas, bastidores e conexão." },
    { id: "f4", title: "Lives", icon: Mic, description: "Aprofundamento de temas e interação direta com a audiência." },
  ],
  checklist: [
    { id: "c1", text: "Definir a persona principal do Instagram." },
    { id: "c2", text: "Otimizar a bio do Instagram com uma chamada para ação clara." },
    { id: "c3", text: "Criar 5 destaques estratégicos (Ex: 'Comece Aqui', 'Alunos', 'E-book', 'Técnicas')." },
    { id: "c4", text: "Planejar o calendário de conteúdo do próximo mês (12 posts - 3 por pilar)." },
    { id: "c5", text: "Gravar e editar 4 Reels para o primeiro pilar." },
    { id: "c6", text: "Criar 2 posts em formato carrossel para o segundo pilar." },
    { id: "c7", text: "Agendar a primeira Live com tema '5 Erros que te Impedem de Vender'." },
    { id: "c8", text: "Definir estratégia diária de Stories (mínimo 3 por dia)." },
  ]
};

export default function OrganicPage() {
  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-10">
       <header className="flex justify-between items-center">
            <div className="text-left space-y-1">
                <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">GESTÃO DE CONTEÚDO ORGÂNICO</h1>
                <p className="text-md text-muted-foreground">Planejamento e Estratégia para Instagram</p>
            </div>
        </header>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl"><Lightbulb className="w-6 h-6 text-primary"/>{organicPlan.strategy.title}</CardTitle>
                    <CardDescription className="pt-2">{organicPlan.strategy.description}</CardDescription>
                </CardHeader>
            </Card>

            <section className="space-y-6">
                 <h2 className="text-2xl font-bold">Pilares de Conteúdo</h2>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                 <h2 className="text-2xl font-bold">Formatos de Conteúdo</h2>
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
                 <h2 className="text-2xl font-bold">Checklist de Implementação</h2>
                 <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {organicPlan.checklist.map(item => (
                                <div key={item.id} className="flex items-center gap-3 bg-card-foreground/5 p-3 rounded-lg border border-border/50">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <p className="text-foreground">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                 </Card>
            </section>
        </div>
    </div>
  );
}
