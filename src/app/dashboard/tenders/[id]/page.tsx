import { getTenderById } from "@/lib/tenders/server";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  FileText,
  Activity,
  ArrowLeft,
  CheckCircle,
  Clock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/env";
import { SupabaseConfigWarning } from "@/components/supabase-config-warning";

async function getTender(id: string) {
  try {
    const tender = await getTenderById(id);
    return tender;
  } catch (_error) {
    return null;
  }
}

export default async function TenderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) {
    return <SupabaseConfigWarning />;
  }

  const { id } = await params;
  const tender = await getTender(id);

  if (!tender) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{tender.title}</h1>
          <div className="text-muted-foreground flex items-center gap-2">
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
              tender.status === 'completed' ? 'bg-green-100 text-green-700' :
              tender.status === 'analyzing' ? 'bg-blue-100 text-blue-700' :
              'bg-slate-100 text-slate-700'
            }`}>
              {tender.status}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Uploaded on {new Date(tender.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">File Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-600" />
              <span className="font-medium truncate">{tender.file_name}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-medium">{tender.organization || "Not Specified"}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Analysis Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {tender.status === 'completed' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                tender.status === 'analyzing' ? <Activity className="h-4 w-4 text-indigo-600 animate-pulse" /> :
                <Clock className="h-4 w-4 text-slate-400" />}
              <span className="font-medium capitalize">{tender.status}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-50 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <Activity className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold">AI Analysis in Queue</h3>
          <p className="text-slate-500 max-w-sm">
            Our specialized agents are being prepared to analyze this tender. Text extraction and agent workflows will be available in the next phase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
