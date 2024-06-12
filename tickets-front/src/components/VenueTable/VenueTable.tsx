import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import { IVenue } from "../../common/common.interfaces";
import GenericButton from "../GenericButton/GenericButton";
import { createOrUpdateVenue, getAllVenues } from "../../api/venue.api";

const VenueTable: React.FC<{}> = ({}) => {
  const [venues, setVenues] = useState<IVenue[]>();
  const [modalOpen, toggleModalOpen] = useState(false);

  const [newVenueName, setNewVenueName] = useState("");
  const [newVenueCity, setNewVenueCity] = useState("");
  const [newVenueCountry, setNewVenueCountry] = useState("");

  useEffect(() => {
    if (!modalOpen) {
      fetchData();
    }
  }, [modalOpen]);

  const handleSubmit = async () => {
    if (!newVenueName || !newVenueCity || !newVenueCountry) {
      // TODO: Toast here
      return;
    }

    const data: any = {
      name: newVenueName,
      city: newVenueCity,
      country: newVenueCountry,
    };

    await createOrUpdateVenue(data);
    // TODO: toast
    toggleModalOpen(false);
    resetEventForm();
  };

  const resetEventForm = () => {
    setNewVenueName("");
    setNewVenueCity("");
    setNewVenueCountry("");
  };

  const fetchData = async () => {
    try {
      const response = await getAllVenues();
      setVenues(response);
    } catch (error: any) {}
  };

  return (
    <div>
      <div className="admin-actions">
        <h2>Actions</h2>
        <div>
          <GenericButton
            title="Add venue"
            onClick={() => toggleModalOpen(true)}
          />
        </div>
      </div>
      {venues && venues.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="admin-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {venues.map((venue) => (
                <TableRow key={venue.id}>
                  <TableCell>{venue.name}</TableCell>
                  <TableCell>{venue.city}</TableCell>
                  <TableCell>{venue.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No venues to display</p>
      )}
      <Modal open={modalOpen} onClose={() => toggleModalOpen(false)}>
        <Box className="modal-box">
          <h2>Add Venue</h2>
          <TextField
            label="Name"
            name="title"
            value={newVenueName}
            onChange={(e) => setNewVenueName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="place"
            value={newVenueCity}
            onChange={(e) => setNewVenueCity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            name="country"
            type="text"
            value={newVenueCountry}
            onChange={(e) => setNewVenueCountry(e.target.value)}
            fullWidth
            margin="normal"
          />
          <GenericButton title="Submit" onClick={handleSubmit} />
        </Box>
      </Modal>
    </div>
  );
};

export default VenueTable;
