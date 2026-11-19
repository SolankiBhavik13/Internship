
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">

        <p className="font-semibold text-white">
          TicketDesk
        </p>

        <p className="text-sm text-slate-400">
          Built by you - React, Tailwind, Supabase and Gemini
        </p>

        <p className="text-sm text-slate-500">
          © {currentYear} TicketDesk
        </p>

      </div>
    </footer>
  );
}

export default Footer;
