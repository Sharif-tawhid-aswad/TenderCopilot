import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SupabaseConfigWarning() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="w-full max-w-lg border-amber-200 bg-amber-50">
        <CardHeader>
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Supabase Not Configured</CardTitle>
          </div>
          <CardDescription className="text-amber-700">
            Authentication and database features are currently disabled.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-amber-800">
            To enable these features, you need to set the following environment variables in your <code>.env.local</code> file or deployment settings:
          </p>
          <div className="bg-white p-3 rounded border border-amber-200 font-mono text-xs text-amber-900 space-y-1">
            <p>NEXT_PUBLIC_SUPABASE_URL=...</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=...</p>
          </div>
          <p className="text-sm text-amber-800">
            After setting these variables, restart your development server or redeploy the application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
