import { NavLink } from "react-router";

function Navbar() {
  const getLinkClass = (props: { isActive: boolean }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      props.isActive
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <NavLink
          to="/"
          className="text-xl font-bold text-blue-700"
        >
          TicketDesk
        </NavLink>

        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/" end className={getLinkClass}>
            Submit a Ticket
          </NavLink>

          <NavLink to="/login" className={getLinkClass}>
            Agent Login
          </NavLink>

          <NavLink to="/dashboard" className={getLinkClass}>
            Dashboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;