import { MindFlowApp } from '@/components/mindflow-app';
import { campaignPlanData } from '@/lib/data';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MindFlowApp plan={campaignPlanData} />
    </main>
  );
}
