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
  ArrowUpRight,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockStats, mockTenders } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here is what is happening with your tenders.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalTenders}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Analyses</CardTitle>
            <Activity className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeAnalyses}</div>
            <p className="text-xs text-muted-foreground">Running now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Reports</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.completedReports}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Eligibility match average</p>
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
                <CardDescription>You uploaded {mockTenders.length} tenders recently.</CardDescription>
              </div>
              <Button size="sm" className="gap-1 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4" />
                Upload New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTenders.map((tender) => (
                <div key={tender.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{tender.title}</p>
                    <p className="text-xs text-muted-foreground">{tender.organization} • {tender.uploadDate}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                      tender.status === 'completed' ? 'bg-green-100 text-green-700' :
                      tender.status === 'analyzing' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {tender.status}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
              <Button variant="outline" className="justify-start gap-2 h-10">
                <Plus className="h-4 w-4" />
                New Analysis
              </Button>
              <Button variant="outline" className="justify-start gap-2 h-10">
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
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-100 rounded text-indigo-600">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">IT Support Services</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 2 mins ago
                    </p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-indigo-600">
                    45%
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded text-green-600">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">City Infra Upgrade</p>
                    <p className="text-xs text-muted-foreground">Completed 1h ago</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-green-600">
                    Done
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
