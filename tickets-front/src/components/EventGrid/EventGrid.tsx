import React from "react";
import EventCard from "../EventCard/EventCard";
import { IEvent } from "../../common/common.interfaces";
import "./EventGrid.scss";

interface EventGridProps {
  events: IEvent[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventGrid;
