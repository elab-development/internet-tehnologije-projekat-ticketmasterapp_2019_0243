import React, { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import { IEvent } from "../../common/common.interfaces";
import "./EventGrid.css";
import { getAllEvents } from "../../api/event.api";
import { useAuthContext } from "../../context/auth-context";
import { Pages } from "../../common/common.enums";
import { createOrUpdateTicket } from "../../api/ticket.api";

const EventGrid: React.FC<{ navigateToPage: (page: Pages) => void }> = ({
  navigateToPage,
}) => {
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

  const handlePurchase = async (eventId: number, vip: boolean) => {
    if (authState.roleId !== 2) {
      return;
    }

    const data = {
      type: vip ? "vip" : "regular",
      userId: authState.id,
      eventId: eventId,
      quantity: 1,
    };

    try {
      await createOrUpdateTicket(data);
      navigateToPage(Pages.TICKETS);
    } catch (error) {}
  };

  return (
    <>
      <div className="event-grid">
        {events?.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            handlePurchase={handlePurchase}
          />
        ))}
      </div>
    </>
  );
};

export default EventGrid;
