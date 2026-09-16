const DashboardLoading = () => {
  return (
    <div className="page-container">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-72 animate-pulse rounded bg-slate-200" />
      <div className="card w-full p-6">
        <div className="space-y-4">
          <div className="h-6 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
