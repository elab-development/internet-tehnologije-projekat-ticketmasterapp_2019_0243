import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth-context";
import { Pages } from "../../common/common.enums";
import { getTicketsForUser } from "../../api/ticket.api";
import SingleTicket from "../SingleTicket/SingleTicket";

const TicketGrid: React.FC<{ navigateToPage?: (page: Pages) => void }> = ({
  navigateToPage,
}) => {
  const [tickets, setTickets] = useState<any[]>();

  const { authState } = useAuthContext();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (authState.id) {
        const response = await getTicketsForUser(Number(authState.id));
        setTickets(response);
      }
    } catch (error: any) {}
  };

  return (
    <>
      <div className="event-grid">
        {tickets?.map((ticket) => (
          <SingleTicket ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default TicketGrid;
