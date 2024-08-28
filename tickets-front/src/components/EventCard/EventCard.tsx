import React from "react";
import "./EventCard.css";
import { IEvent } from "../../common/common.interfaces";
import { trimDate } from "../../common/helpers";
import GenericButton from "../GenericButton/GenericButton";

interface EventCardProps {
  event: IEvent;
  handlePurchase: (eventId: number, vip: boolean) => Promise<void>;
}

const EventCard: React.FC<EventCardProps> = ({ event, handlePurchase }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{event.place.name}</p>
      <p>{trimDate(event.date)}</p>
      <p>{event.priceInEur}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <GenericButton
          title="Purchase"
          onClick={() => handlePurchase(event.id, false)}
        />
        <GenericButton
          title="Purchase VIP"
          onClick={() => handlePurchase(event.id, true)}
        />
      </div>
    </div>
  );
};

export default EventCard;
