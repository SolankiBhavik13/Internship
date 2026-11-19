import { useParams } from "react-router";

import PageHeader from "../components/ui/PageHeader";

function TicketDetail() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <PageHeader
      title="Ticket Details"
      subtitle="View ticket information and manage customer support requests"
      />
      
      <h1 className="text-3xl font-bold text-slate-900">
        Ticket Details
      </h1>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8">
        <p className="text-slate-500">Ticket ID</p>

        <h2 className="mt-2 text-xl font-semibold">
          {id}
        </h2>

        <p className="mt-5 text-slate-600">
          AI reasoning, customer comments, and ticket status
          will be added in Week 10.
        </p>
      </div>
    </div>
  );
}

export default TicketDetail;