import { useState } from "react";
import { useTickets } from "../context/TicketContext";
import SearchBar from "../components/SearchBar";
import TicketColumn from "../components/TicketColumn";
import type { TicketStatus } from "../types";

function BoardPage() {
  const { tickets, advanceTicket, deleteTicket } = useTickets();

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

      <SearchBar search={search} setSearch={setSearch} />

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
              onAdvance={advanceTicket}
              onDelete={deleteTicket}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BoardPage;