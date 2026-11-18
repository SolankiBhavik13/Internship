import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

function Dashboard() {
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTicketCount() {
      setLoading(true);
      setError(null);

      const { count, error } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true });

      if (error) {
        setError(error.message);
      } else {
        setTicketCount(count ?? 0);
      }

      setLoading(false);
    }

    fetchTicketCount();
  }, []);

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
          <p className="text-slate-500">Total Tickets</p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : ticketCount}
          </h2>
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

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          Failed to fetch tickets: {error}
        </div>
      )}

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