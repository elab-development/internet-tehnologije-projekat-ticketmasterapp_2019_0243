import React, { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import { IEvent } from "../../common/common.interfaces";
import "./EventGrid.css";
import { getAllEvents } from "../../api/event.api";
import { useAuthContext } from "../../context/auth-context";

const EventGrid: React.FC<{}> = ({}) => {
  const [events, setEvents] = useState<IEvent[]>();

  const { authState } = useAuthContext();

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
        <EventCard
          key={event.id}
          event={event}
          allowPurchase={!!authState.accessToken}
        />
      ))}
    </div>
  );
};

export default EventGrid;
