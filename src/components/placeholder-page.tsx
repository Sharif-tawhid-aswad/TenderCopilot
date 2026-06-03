export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      <div className="bg-slate-100 p-6 rounded-full">
        <div className="h-12 w-12 text-slate-400 border-4 border-dashed rounded-full animate-pulse" />
      </div>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="text-slate-500 text-center max-w-md">
        This page is part of the next phase. Phase 1 focused on the Landing Page, Login, Signup, and Dashboard.
      </p>
    </div>
  );
}
