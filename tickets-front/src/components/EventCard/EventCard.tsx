import React from "react";
import "./EventCard.css";
import { IEvent } from "../../common/common.interfaces";
import { trimDate } from "../../common/helpers";
import GenericButton from "../GenericButton/GenericButton";

interface EventCardProps {
  event: IEvent;
  allowPurchase: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, allowPurchase }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{event.place.name}</p>
      <p>{trimDate(event.date)}</p>
      <p>{event.priceInEur}</p>
      <GenericButton
        title="Purchase"
        onClick={undefined}
        disabled={allowPurchase}
      />
    </div>
  );
};

export default EventCard;
