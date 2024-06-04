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
import { IVenue } from "../../common/common.interfaces";
import GenericButton from "../GenericButton/GenericButton";
import { getAllVenues } from "../../api/venue.api";

const VenueTable: React.FC<{}> = ({}) => {
  const [venues, setVenues] = useState<IVenue[]>();

  useEffect(() => {
    fetchData();
  }, []);

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
          <GenericButton title="Add venue" onClick={() => {}} />
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
    </div>
  );
};

export default VenueTable;
