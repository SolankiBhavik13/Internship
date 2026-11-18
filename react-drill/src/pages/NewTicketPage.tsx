
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { useTickets } from "../context/TicketContext";
import type { TicketPriority } from "../types";

function NewTicketPage() {
  const navigate = useNavigate();
  const { addTicket } = useTickets();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("medium");

  const [subjectError, setSubjectError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSubject = subject.trim();
    const trimmedDescription = description.trim();

    let isValid = true;

    if (!trimmedSubject) {
      setSubjectError("Subject is required.");
      isValid = false;
    } else {
      setSubjectError("");
    }

    if (!trimmedDescription) {
      setDescriptionError("Description is required.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!isValid) return;

    addTicket(trimmedSubject, trimmedDescription, priority);
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

          {subjectError && (
            <p className="field-error">{subjectError}</p>
          )}
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

export default NewTicketPage;
