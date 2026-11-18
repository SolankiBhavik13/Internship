import { useEffect, useState, type FormEvent } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router";

// Required ticket types
type TicketStatus = "open" | "in_progress" | "resolved";

type TicketPriority = "low" | "medium" | "high" | "urgent";

type Ticket = {
  id: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
};

// Required typed starter tickets
const seedTickets: Ticket[] = [
  {
    id: "1",
    subject: "Login page not working",
    description: "Users are unable to log in to their accounts.",
    priority: "urgent",
    status: "open",
    createdAt: "2026-11-18T09:00:00",
  },
  {
    id: "2",
    subject: "Update dashboard design",
    description: "The dashboard needs a cleaner layout.",
    priority: "high",
    status: "open",
    createdAt: "2026-11-18T10:00:00",
  },
  {
    id: "3",
    subject: "Fix navigation menu",
    description: "Some navigation links are not working correctly.",
    priority: "medium",
    status: "in_progress",
    createdAt: "2026-11-18T11:00:00",
  },
  {
    id: "4",
    subject: "Add contact information",
    description: "Add contact details to the About page.",
    priority: "low",
    status: "in_progress",
    createdAt: "2026-11-18T12:00:00",
  },
  {
    id: "5",
    subject: "Fix footer alignment",
    description: "The footer alignment issue has been corrected.",
    priority: "medium",
    status: "resolved",
    createdAt: "2026-11-18T13:00:00",
  },
];

// Custom localStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      return initialValue;
    }

    try {
      return JSON.parse(savedValue) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Navigation bar
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          TicketDesk
        </Link>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
            Board
          </NavLink>

          <NavLink to="/new" className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
            New Ticket
          </NavLink>

          <NavLink to="/about" className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

// Ticket card
type TicketCardProps = {
  ticket: Ticket;
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
};

function TicketCard({ ticket, onAdvance, onDelete }: TicketCardProps) {
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const statusLabels: Record<TicketStatus, string> = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
  };

  return (
    <article className="ticket-card">
      <div className="ticket-card-top">
        <span className={`priority-badge priority-${ticket.priority}`}>
          {ticket.priority}
        </span>

        <span className={`status-badge status-${ticket.status}`}>
          {statusLabels[ticket.status]}
        </span>
      </div>

      <h3>{ticket.subject}</h3>
      <p className="ticket-description">{ticket.description}</p>
      <p className="ticket-date">Created: {formattedDate}</p>

      <div className="ticket-actions">
        <button
          className="move-button"
          onClick={() => onAdvance(ticket.id)}
          disabled={ticket.status === "resolved"}
        >
          {ticket.status === "open"
            ? "Move to In Progress"
            : ticket.status === "in_progress"
              ? "Mark Resolved"
              : "Completed"}
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(ticket.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

// Ticket column
type TicketColumnProps = {
  title: string;
  status: TicketStatus;
  tickets: Ticket[];
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
};

function TicketColumn({
  title,
  status,
  tickets,
  onAdvance,
  onDelete,
}: TicketColumnProps) {
  const columnTickets = tickets.filter(
    (ticket) => ticket.status === status
  );

  return (
    <section className={`ticket-column column-${status}`}>
      <div className="column-header">
        <h2>{title}</h2>
        <span className="ticket-count">{columnTickets.length}</span>
      </div>

      <div className="column-content">
        {columnTickets.length > 0 ? (
          columnTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onAdvance={onAdvance}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="empty-column">No tickets in this section.</p>
        )}
      </div>
    </section>
  );
}

// Board page
type BoardPageProps = {
  tickets: Ticket[];
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
};

function BoardPage({ tickets, onAdvance, onDelete }: BoardPageProps) {
  const [search, setSearch] = useState("");

  const filteredTickets = tickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  const columns: { title: string; status: TicketStatus }[] = [
    { title: "Open", status: "open" },
    { title: "In Progress", status: "in_progress" },
    { title: "Resolved", status: "resolved" },
  ];

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">TICKET MANAGEMENT</p>
          <h1>Ticket Board</h1>
          <p className="page-subtitle">
            Manage and track all your support tickets.
          </p>
        </div>

        <div className="total-tickets">
          <span>Total Tickets</span>
          <strong>{tickets.length}</strong>
        </div>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search tickets by subject..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredTickets.length === 0 ? (
        <div className="no-results">
          {tickets.length === 0
            ? "No tickets available. Create your first ticket."
            : "No tickets match your search. Try another subject."}
        </div>
      ) : (
        <div className="board-grid">
          {columns.map((column) => (
            <TicketColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tickets={filteredTickets}
              onAdvance={onAdvance}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// New ticket form
type NewTicketPageProps = {
  onAddTicket: (
    subject: string,
    description: string,
    priority: TicketPriority
  ) => void;
};

function NewTicketPage({ onAddTicket }: NewTicketPageProps) {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [subjectError, setSubjectError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanSubject = subject.trim();
    const cleanDescription = description.trim();

    let valid = true;

    if (!cleanSubject) {
      setSubjectError("Subject is required.");
      valid = false;
    } else {
      setSubjectError("");
    }

    if (!cleanDescription) {
      setDescriptionError("Description is required.");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (!valid) return;

    onAddTicket(cleanSubject, cleanDescription, priority);
    navigate("/");
  };

  return (
    <div className="form-page">
      <div className="form-heading">
        <p className="eyebrow">CREATE A TICKET</p>
        <h1>New Ticket</h1>
        <p className="page-subtitle">
          Add a new issue to your ticket board.
        </p>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Ticket Subject</label>
          <input
            id="subject"
            type="text"
            placeholder="Enter ticket subject"
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
              if (event.target.value.trim()) setSubjectError("");
            }}
          />
          {subjectError && <p className="field-error">{subjectError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={5}
            placeholder="Describe the issue..."
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              if (event.target.value.trim()) setDescriptionError("");
            }}
          />
          {descriptionError && (
            <p className="field-error">{descriptionError}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TicketPriority)
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Create Ticket
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// About page
function AboutPage() {
  return (
    <div className="about-page">
      <p className="eyebrow">ABOUT THE PROJECT</p>
      <h1>About TicketDesk</h1>

      <p>
        TicketDesk is a simple ticket management application built
        using React and TypeScript.
      </p>

      <p>
        It helps users create, organize, search, and track support
        tickets through three stages: Open, In Progress, and Resolved.
      </p>

      <div className="about-features">
        <h2>App Features</h2>
        <ul>
          <li>Create new support tickets.</li>
          <li>Organize tickets by status.</li>
          <li>Set ticket priority.</li>
          <li>Search tickets by subject.</li>
          <li>Move tickets between stages.</li>
          <li>Save tickets using browser localStorage.</li>
        </ul>
      </div>
    </div>
  );
}

// 404 page
function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="home-button">
        Back to Board
      </Link>
    </div>
  );
}

// Main application
function App() {
  // Required persistence key and seed data
  const [tickets, setTickets] = useLocalStorage<Ticket[]>(
    "desk-tickets",
    seedTickets
  );

  const addTicket = (
    subject: string,
    description: string,
    priority: TicketPriority
  ) => {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      subject,
      description,
      priority,
      status: "open",
      createdAt: new Date().toISOString(),
    };

    setTickets((previousTickets) => [newTicket, ...previousTickets]);
  };

  // Immutable status update
  const advanceTicket = (id: string) => {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) => {
        if (ticket.id !== id) return ticket;

        if (ticket.status === "open") {
          return { ...ticket, status: "in_progress" };
        }

        if (ticket.status === "in_progress") {
          return { ...ticket, status: "resolved" };
        }

        return ticket;
      })
    );
  };

  // Immutable delete update
  const deleteTicket = (id: string) => {
    setTickets((previousTickets) =>
      previousTickets.filter((ticket) => ticket.id !== id)
    );
  };

  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <BoardPage
                tickets={tickets}
                onAdvance={advanceTicket}
                onDelete={deleteTicket}
              />
            }
          />

          <Route
            path="/new"
            element={<NewTicketPage onAddTicket={addTicket} />}
          />

          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="footer">
        TicketDesk © 2026 | Built with React + TypeScript
      </footer>
    </div>
  );
}

export default App;