import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import type { Ticket, TicketPriority } from "../types";
import { seedTickets } from "../data/seedTickets";
import useLocalStorage from "../hooks/useLocalStorage";

type TicketContextType = {
  tickets: Ticket[];
  addTicket: (subject: string, description: string, priority: TicketPriority) => void;
  advanceTicket: (id: string) => void;
  deleteTicket: (id: string) => void;
};

const TicketContext = createContext<TicketContextType | undefined>(
  undefined
);

export function TicketProvider({ children }: { children: ReactNode }) {
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

    setTickets((previousTickets) => [
      newTicket,
      ...previousTickets,
    ]);
  };

  const advanceTicket = (id: string) => {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) => {
        if (ticket.id !== id) {
          return ticket;
        }

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

  const deleteTicket = (id: string) => {
    setTickets((previousTickets) =>
      previousTickets.filter((ticket) => ticket.id !== id)
    );
  };

  return (
    <TicketContext.Provider
      value={{ tickets, addTicket, advanceTicket, deleteTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error("useTickets must be used inside TicketProvider");
  }

  return context;
}