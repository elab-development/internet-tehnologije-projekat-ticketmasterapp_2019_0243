import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { IEvent, IVenue } from "../../common/common.interfaces";
import "./AdminTable.css";
import GenericButton from "../GenericButton/GenericButton";
import {
  createOrUpdateEvent,
  getAllEvents,
  getExchangeRate,
} from "../../api/event.api";
import { exportToExcel, trimDate } from "../../common/helpers";
import { getAllVenues } from "../../api/venue.api";

const AdminTable: React.FC<{}> = ({}) => {
  const [events, setEvents] = useState<IEvent[]>();
  const [places, setPlaces] = useState<IVenue[]>([]);
  const [modalOpen, toggleModalOpen] = useState(false);

  const [exchangeRate, setExchangeRate] = useState(0);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventVenue, setNewEventVenue] = useState("");
  const [newEventPrice, setNewEventPrice] = useState("");
  const [newEventDate, setNewEventDate] = useState("");

  useEffect(() => {
    // fetchExchangeData();
  }, []);

  useEffect(() => {
    if (!modalOpen) {
      fetchData();
    }
  }, [modalOpen]);

  const handleSubmit = async () => {
    if (!newEventTitle || !newEventVenue || !newEventPrice || !newEventDate) {
      // TODO: Toast here
      return;
    }

    const data: any = {
      name: newEventTitle,
      date: newEventDate,
      placeId: newEventVenue,
      priceInEur: newEventPrice,
    };

    await createOrUpdateEvent(data);
    // TODO: toast
    toggleModalOpen(false);
    resetEventForm();
  };

  const fetchData = async () => {
    try {
      const response = await getAllEvents();
      const venueResponse = await getAllVenues();
      setEvents(response);
      setPlaces(venueResponse);
    } catch (error: any) {}
  };

  const fetchExchangeData = async () => {
    try {
      const exchangeRateResponse = await getExchangeRate();
      setExchangeRate(exchangeRateResponse.data.conversion_rates["RSD"]);
    } catch (error: any) {}
  };

  const resetEventForm = () => {
    setNewEventTitle("");
    setNewEventVenue("");
    setNewEventPrice("");
    setNewEventDate("");
  };

  const exportCSV = () => {
    exportToExcel(events, "Event spreadsheet");
  };

  return (
    <div>
      <div className="admin-actions">
        <h2>Actions</h2>
        <div style={{ display: " flex", gap: "12px", height: "fit-content" }}>
          <GenericButton title="Export CSV" onClick={() => exportCSV()} />
          <GenericButton
            title="Add event"
            onClick={() => toggleModalOpen(true)}
          />
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
                <TableCell>Price in RSD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.place.name}</TableCell>
                  <TableCell>{trimDate(event.date)}</TableCell>
                  <TableCell>{event.priceInEur}</TableCell>
                  <TableCell>
                    {(event.priceInEur * exchangeRate).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No events to display</p>
      )}
      <Modal open={modalOpen} onClose={() => toggleModalOpen(false)}>
        <Box className="modal-box">
          <h2>Add Event</h2>
          <TextField
            label="Title"
            name="title"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Place"
            name="place"
            value={newEventVenue}
            onChange={(e) => setNewEventVenue(e.target.value)}
            fullWidth
            margin="normal"
          >
            {places.map((place) => (
              <MenuItem key={place.id} value={place.id}>
                {place.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newEventDate}
            onChange={(e) => setNewEventDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Price"
            name="priceInEur"
            type="text"
            value={newEventPrice}
            onChange={(e) => setNewEventPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <GenericButton title="Submit" onClick={handleSubmit} />
        </Box>
      </Modal>
    </div>
  );
};

export default AdminTable;
