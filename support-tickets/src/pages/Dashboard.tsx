
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import PageHeader from "../components/ui/PageHeader";
import type { Ticket } from "../types/database";

import {
  PRIORITY_COLORS,
  STATUS_COLORS,
  CATEGORY_COLORS,
} from "../data/constants";

function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTickets() {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) {
        setError(dbError.message);
      } else if (data) {
        setTickets(data as unknown as Ticket[]);
      }

      setLoading(false);
    }

    fetchTickets();
  }, []);

  return (
    <div>
      <PageHeader
        title="Tickets"
        subtitle="Every customer problem, newest first - AI already triaged them"
      />

      {/* Ticket Count */}
      <p className="mb-6 text-sm text-slate-400">
        {tickets.length} {tickets.length === 1 ? "open ticket" : "open tickets"}
      </p>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"></div>
          <p className="mt-4 text-slate-400">Loading tickets...</p>
        </div>
      ) : error ? (

        /* Error State */
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">
          Failed to load tickets: {error}
        </div>

      ) : tickets.length === 0 ? (

        /* Empty State */
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-12 text-center">
          <div className="mb-4 text-5xl">🎫</div>
          <h2 className="text-xl font-semibold text-white">
            No tickets yet
          </h2>
          <p className="mt-2 text-slate-400">
            No tickets yet - submit one from the home page.
          </p>
        </div>

      ) : (

        /* Tickets Table */
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-slate-700 bg-slate-800">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                  Subject
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                  Customer
                </th>
                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-300">
                  Category
                </th>
                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-300">
                  Priority
                </th>
                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-300">
                  Status
                </th>
                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-300">
                  Created
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="transition-colors hover:bg-slate-800/50"
                >
                  {/* Subject */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">
                      {ticket.subject}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-200">
                      {ticket.customer_name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {ticket.customer_email}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[ticket.category]}`}
                    >
                      {ticket.category}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${PRIORITY_COLORS[ticket.priority]}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[ticket.status]}`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td className="px-5 py-4 text-right text-sm text-slate-400">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
