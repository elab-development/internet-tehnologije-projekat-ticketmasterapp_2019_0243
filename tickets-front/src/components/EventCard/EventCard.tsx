import React from "react";
import "./EventCard.scss";
import { IEvent } from "../../common/common.interfaces";

interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{event.date}</p>
    </div>
  );
};

export default EventCard;
