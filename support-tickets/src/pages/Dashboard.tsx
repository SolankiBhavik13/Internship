function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Agent Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Manage and track customer support tickets.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500">Open Tickets</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500">In Progress</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500">Resolved Tickets</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-semibold">
          All Support Tickets
        </h2>

        <p className="mt-3 text-slate-500">
          Ticket list, urgent-first sorting, and filters will be added in Week 9.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;