import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { IEvent } from "../../common/common.interfaces";
import "./AdminTable.css";
import GenericButton from "../GenericButton/GenericButton";
import { getAllEvents } from "../../api/event.api";
import { trimDate } from "../../common/helpers";

const AdminTable: React.FC<{}> = ({}) => {
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
    <div>
      <div className="admin-actions">
        <h2>Actions</h2>
        <div>
          <GenericButton title="Add event" onClick={() => {}} />
        </div>
      </div>
      {events && events.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="admin-table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Place</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.place.name}</TableCell>
                  <TableCell>{trimDate(event.date)}</TableCell>
                  <TableCell>{event.priceInEur}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No events to display</p>
      )}
    </div>
  );
};

export default AdminTable;
