import type { Ticket } from "../types";

type TicketCardProps = {
  ticket: Ticket;
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
};

function TicketCard({
  ticket,
  onAdvance,
  onDelete,
}: TicketCardProps) {
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const statusLabels = {
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

export default TicketCard;