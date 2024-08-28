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
import {
  createOrUpdateUser,
  getAllUsers,
  removeEmployee,
} from "../../api/user.api";
import * as XLSX from "xlsx";

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
      roleId: 1,
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

  const uploadCSV = () => {
    const input = document.getElementById("upload") as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const users = processExcelData(jsonData);
      console.log(users);

      try {
        for (const user of users) {
          await createOrUpdateUser(user);
        }

        await fetchData();
      } catch (error) {}
    };

    reader.readAsArrayBuffer(file);
  };

  function processExcelData(jsonData: any) {
    const [header, ...rows] = jsonData;

    const nameIndex = header.indexOf("name");
    const emailIndex = header.indexOf("email");
    const passwordIndex = header.indexOf("password");

    const users = rows.map((row: any) => ({
      name: row[nameIndex],
      email: row[emailIndex],
      password: row[passwordIndex],
      roleId: 1,
    }));

    return users;
  }

  const deleteUser = async (id: string) => {
    try {
      await removeEmployee(id);

      await fetchData();
    } catch (error) {}
  };

  return (
    <div>
      <div className="admin-actions">
        <h2>Actions</h2>
        <div style={{ display: " flex", gap: "12px", height: "fit-content" }}>
          <input type="file" id="upload" accept=".xlsx, .xls" />
          <GenericButton title="Upload CSV" onClick={() => uploadCSV()} />
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
                <TableRow
                  key={employee.id}
                  onClick={() => deleteUser(String(employee.id))}
                >
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
