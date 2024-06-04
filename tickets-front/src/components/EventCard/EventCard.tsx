import React from "react";
import "./EventCard.css";
import { IEvent } from "../../common/common.interfaces";

interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{event.place.name}</p>
      <p>{event.date}</p>
      <p>{event.priceInEur}</p>
    </div>
  );
};

export default EventCard;
