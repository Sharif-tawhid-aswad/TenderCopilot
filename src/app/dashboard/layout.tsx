import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <SidebarProvider>
      <AppSidebar user={user ?? undefined} />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b px-6 bg-background">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <div className="flex-1">
             {/* Header content like breadcrumbs can go here */}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
