
import type { Ticket, TicketStatus } from "../types";
import TicketCard from "./TicketCard";

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
        <span className="ticket-count">
          {columnTickets.length}
        </span>
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
          <p className="empty-column">
            No tickets in this section.
          </p>
        )}
      </div>
    </section>
  );
}

export default TicketColumn;
