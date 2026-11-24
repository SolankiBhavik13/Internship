
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import PageHeader from "../components/ui/PageHeader";
import type { Ticket } from "../types/database";

import {
  PRIORITY_COLORS,
  STATUS_COLORS,
  CATEGORY_COLORS,
  TICKET_STATUS,
} from "../data/constants";

function minutesAgo(dateString: string) {
  const createdTime = new Date(dateString).getTime();
  const difference = Date.now() - createdTime;

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;

  return new Date(dateString).toLocaleDateString();
}

function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tickets from Supabase
  async function loadTickets() {
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

  // Load tickets when Dashboard opens
  useEffect(() => {
    loadTickets();
  }, []);

  // Calculate open ticket count
  const openCount = tickets.filter(
    (ticket) => ticket.status === TICKET_STATUS.OPEN
  ).length;

  return (
    <div>
      <PageHeader
        title="Tickets"
        subtitle="Every customer problem, newest first - AI already triaged them"
      />

      {/* Ticket Count and Refresh Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"} -{" "}
          {openCount} still open
        </p>

        <button
          onClick={loadTickets}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={loading ? "animate-spin" : ""}
          >
            <path d="M20 7v5h-5" />
            <path d="M4 17v-5h5" />
            <path d="M5.64 9A8 8 0 0 1 19 7l1 5" />
            <path d="M4 12l1 5a8 8 0 0 0 13.36-2" />
          </svg>

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

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
                  <td className="px-5 py-4 max-w-[250px]">
                    <p
                        className="font-medium text-white line-clamp-2 break-words"
                        title={ticket.subject}
                        >
                          {ticket.subject}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-200">
                      {ticket.customer_name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {ticket.customer_email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[ticket.category]}`}
                    >
                      {ticket.category}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${PRIORITY_COLORS[ticket.priority]}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[ticket.status]}`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Created Date and Relative Time */}
                  <td className="px-5 py-4 text-right text-sm text-slate-400">
                    <p>
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(ticket.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mt-1 text-xs text-blue-400">
                      {minutesAgo(ticket.created_at)}
                    </p>
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
