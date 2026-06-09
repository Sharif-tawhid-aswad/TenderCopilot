import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  FileText,
  Activity,
  CheckCircle,
  TrendingUp,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { getTenders } from "@/lib/tenders/server";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/env";
import { SupabaseConfigWarning } from "@/components/supabase-config-warning";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return <SupabaseConfigWarning />;
  }

  const supabase = await createClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const fullName = user?.user_metadata?.full_name || "there";

  const tenders = await getTenders();

  // Calculate real stats
  const totalTenders = tenders.length;
  const activeAnalyses = tenders.filter(t => t.status === 'analyzing').length;
  const completedReports = tenders.filter(t => t.status === 'completed').length;

  // Placeholder success rate
  const successRate = totalTenders > 0 ? Math.round((completedReports / totalTenders) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {fullName}. Here is what is happening with your tenders.
          </p>
        </div>
        <Button asChild className="gap-1 bg-indigo-600 hover:bg-indigo-700">
          <Link href="/dashboard/upload">
            <Plus className="h-4 w-4" />
            Upload Tender
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTenders}</div>
            <p className="text-xs text-muted-foreground">Uploaded to storage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Analyses</CardTitle>
            <Activity className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAnalyses}</div>
            <p className="text-xs text-muted-foreground">Processing now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Reports</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedReports}</div>
            <p className="text-xs text-muted-foreground">Analysis finished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analysis Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">Completion percentage</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Tenders Section */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Tender Uploads</CardTitle>
                <CardDescription>
                  {totalTenders > 0
                    ? `You have ${totalTenders} tenders in your account.`
                    : "You haven't uploaded any tenders yet."}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tenders.length > 0 ? (
                tenders.slice(0, 5).map((tender) => (
                  <div key={tender.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{tender.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {tender.organization || "No Organization"} • {new Date(tender.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                        tender.status === 'completed' ? 'bg-green-100 text-green-700' :
                        tender.status === 'analyzing' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {tender.status}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/dashboard/tenders/${tender.id}`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No tenders found</p>
                  <Button variant="link" asChild>
                    <Link href="/dashboard/upload">Upload your first tender</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Recent Analyses */}
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="justify-start gap-2 h-10" asChild>
                <Link href="/dashboard/upload">
                  <Plus className="h-4 w-4" />
                  New Analysis
                </Link>
              </Button>
              <Button variant="outline" className="justify-start gap-2 h-10" disabled>
                <FileText className="h-4 w-4" />
                Draft Proposal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              {completedReports > 0 ? (
                <div className="space-y-4">
                  {tenders.filter(t => t.status === 'completed').slice(0, 3).map(tender => (
                    <div key={tender.id} className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{tender.title}</p>
                        <p className="text-xs text-muted-foreground">Completed recently</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4 italic">
                  No completed analyses yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
