
import { NavLink, Link } from "react-router";

import { useAuth } from "../../context/AuthContext";
import supabase from "../../lib/supabaseClient";

function Navbar() {
  const { session, agent } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-500/15 text-blue-400"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error.message);
    }
  }

  return (
    <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">

        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
            T
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            TicketDesk
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-2">

          <NavLink to="/" end className={navLinkClass}>
            Submit a Ticket
          </NavLink>

          {session ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              {/* Signed-in Agent Name */}
              <span className="px-3 py-2 text-sm font-medium text-white">
                {agent?.name ?? "Loading agent..."}
              </span>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Agent Login
            </NavLink>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
