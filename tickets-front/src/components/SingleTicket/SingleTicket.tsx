import React from "react";
import { ITicket } from "../../common/common.interfaces";
import { trimDate } from "../../common/helpers";

interface EventCardProps {
  ticket: ITicket;
}

const SingleTicket: React.FC<EventCardProps> = ({ ticket }) => {
  return (
    <div className="event-card" style={{ backgroundColor: "#eab676" }}>
      <h2>{ticket.event.name}</h2>
      <p style={{ textTransform: "capitalize" }}>{ticket.type}</p>
      <p>{trimDate(ticket.event.date)}</p>
    </div>
  );
};

export default SingleTicket;
