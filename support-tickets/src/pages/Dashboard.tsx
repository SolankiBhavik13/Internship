
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

import PageHeader from "../components/ui/PageHeader";

import type { Ticket } from "../types/database";

import {
  PRIORITY_COLORS,
  STATUS_COLORS,
  CATEGORY_COLORS,
} from "../data/constants";

type TicketSummary = Pick<
  Ticket,
  "id" | "subject" | "category" | "priority" | "status"
>;

function Dashboard() {
  const [ticketCount, setTicketCount] = useState<number>(0);

  const [tickets, setTickets] = useState<TicketSummary[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);

      const [countResult, ticketsResult] = await Promise.all([
        supabase
          .from("tickets")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("tickets")
          .select("id, subject, category, priority, status")
          .order("created_at", { ascending: false }),
      ]);

      if (countResult.error) {
        setError(countResult.error.message);
      } else {
        setTicketCount(countResult.count ?? 0);
      }

      if (ticketsResult.error) {
        setError(
          ticketsResult.error.message
        );
      } else {
        setTickets(
          (ticketsResult.data ?? []) as TicketSummary[]
        );
      }

      setLoading(false);
    }

    fetchDashboardData();
  }, []);

  const inProgressCount = tickets.filter(
    (ticket) => ticket.status === "in_progress"
  ).length;

  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === "resolved"
  ).length;

  return (
    
    <div className="mx-auto max-w-7xl px-6 py-12">
      <PageHeader
    title="Agent Dashboard"
    subtitle="Manage and track customer support tickets."
    />
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold text-slate-900">
        Agent Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Manage and track customer support tickets.
      </p>


      {/* Dashboard Statistics */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">

        {/* Total Tickets */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500">
            Total Tickets
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : ticketCount}
          </h2>
        </div>


        {/* In Progress Tickets */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : inProgressCount}
          </h2>
        </div>


        {/* Resolved Tickets */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-500">
            Resolved Tickets
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : resolvedCount}
          </h2>
        </div>

      </div>


      {/* Error Message */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          Failed to fetch tickets: {error}
        </div>
      )}


      {/* All Support Tickets */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8">

        <h2 className="text-xl font-semibold">
          All Support Tickets
        </h2>

        {loading ? (
          <p className="mt-4 text-slate-500">
            Loading tickets...
          </p>
        ) : error ? (
          <p className="mt-4 text-slate-500">
            Unable to load tickets.
          </p>
        ) : tickets.length === 0 ? (
          <p className="mt-4 text-slate-500">
            No tickets found.
          </p>
        ) : (

          <div className="mt-6 space-y-4">

            {tickets.map((ticket) => (

              <div
                key={ticket.id}
                className="rounded-xl border border-slate-200 p-5 transition hover:shadow-md"
              >

                {/* Ticket Subject */}
                <h3 className="text-lg font-semibold text-slate-900">
                  {ticket.subject}
                </h3>


                {/* Ticket Badges */}
                <div className="mt-4 flex flex-wrap gap-3">

                  {/* Category */}
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${CATEGORY_COLORS[ticket.category]}`}
                  >
                    {ticket.category}
                  </span>


                  {/* Priority */}
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${PRIORITY_COLORS[ticket.priority]}`}
                  >
                    {ticket.priority}
                  </span>


                  {/* Status */}
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_COLORS[ticket.status]}`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;
