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
import { IUser } from "../../common/common.interfaces";
import GenericButton from "../GenericButton/GenericButton";
import { getAllUsers } from "../../api/user.api";

const EmployeeTable: React.FC<{}> = ({}) => {
  const [employees, setEmployees] = useState<IUser[]>();

  useEffect(() => {
    fetchData();
  }, []);

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
          <GenericButton title="Add employee" onClick={() => {}} />
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
                  <TableCell>{employee.role.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No employees to display</p>
      )}
    </div>
  );
};

export default EmployeeTable;
