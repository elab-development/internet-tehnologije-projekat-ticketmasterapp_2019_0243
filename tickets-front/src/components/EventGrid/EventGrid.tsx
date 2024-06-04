import React, { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import { IEvent } from "../../common/common.interfaces";
import "./EventGrid.css";
import { getAllEvents } from "../../api/event.api";

const EventGrid: React.FC<{}> = ({}) => {
  const [events, setEvents] = useState<IEvent[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllEvents();
      setEvents(response);
    } catch (error: any) {}
  };
  return (
    <div className="event-grid">
      {events?.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventGrid;
