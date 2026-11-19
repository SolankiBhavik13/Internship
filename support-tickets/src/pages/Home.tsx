import PageHeader from "../components/ui/PageHeader";

function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <PageHeader
      title="Submit a Ticket"
      subtitle="Tell us about your problem and our team will help you."
      />
      <div className="text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Customer Support
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          TicketDesk - AI Support
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Describe your problem. AI sorts it before a human even looks.
        </p>

        <div className="mt-10">
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Submit a Ticket
          </button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">
          How can we help you?
        </h2>

        <p className="mt-2 text-slate-600">
          The ticket submission form will be added in Week 6.
        </p>
      </div>
    </div>
  );
}

export default Home;