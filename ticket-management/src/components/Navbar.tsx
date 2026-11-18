import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand">
          TicketDesk
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Board
          </NavLink>

          <NavLink
            to="/new"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            New Ticket
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;