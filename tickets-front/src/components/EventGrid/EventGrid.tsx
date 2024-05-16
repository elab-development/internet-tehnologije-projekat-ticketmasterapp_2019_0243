import React from "react";
import EventCard from "../EventCard/EventCard";
import { IEvent } from "../../common/common.interfaces";
import "./EventGrid.scss";
import { EVENTS } from "../../common/common.data";

interface EventGridProps {
  events: IEvent[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  return (
    <div className="event-grid">
      {EVENTS.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventGrid;
