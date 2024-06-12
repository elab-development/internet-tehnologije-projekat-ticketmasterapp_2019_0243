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
import { IUser } from "../../common/common.interfaces";
import GenericButton from "../GenericButton/GenericButton";
import { createOrUpdateUser, getAllUsers } from "../../api/user.api";

const EmployeeTable: React.FC<{}> = ({}) => {
  const [employees, setEmployees] = useState<IUser[]>();
  const [modalOpen, toggleModalOpen] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newUserMail, setNewUserMail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  useEffect(() => {
    if (!modalOpen) {
      fetchData();
    }
  }, [modalOpen]);

  const handleSubmit = async () => {
    if (!newUsername || !newUserMail || !newUserPassword) {
      // TODO: Toast here
      return;
    }

    const data: any = {
      name: newUsername,
      email: newUserMail,
      password: newUserPassword,
    };

    await createOrUpdateUser(data);
    // TODO: toast
    toggleModalOpen(false);
    resetEventForm();
  };

  const resetEventForm = () => {
    setNewUsername("");
    setNewUserMail("");
    setNewUserPassword("");
  };

  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      setEmployees(response);
    } catch (error: any) {}
  };

  return (
    <div>
      <div className="admin-actions">
        <h2>Actions</h2>
        <div>
          <GenericButton
            title="Add employee"
            onClick={() => toggleModalOpen(true)}
          />
        </div>
      </div>
      {employees && employees.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="admin-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    {employee.firstName + " " + employee.surname}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {employee.role.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No employees to display</p>
      )}
      <Modal open={modalOpen} onClose={() => toggleModalOpen(false)}>
        <Box className="modal-box">
          <h2>Add Employee</h2>
          <TextField
            label="Name"
            name="title"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="place"
            value={newUserMail}
            onChange={(e) => setNewUserMail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="country"
            type="password"
            autoComplete="none"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <GenericButton title="Submit" onClick={handleSubmit} />
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeeTable;
