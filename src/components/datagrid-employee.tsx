"use client";
import React, { useEffect, useState } from "react";
import { getEmployees } from "@/libs/fetch";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import { IEmployee } from "@/models/employee";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmployeeForm from "./form-employee";
import axios from "axios";

function EmployeeDataGrid() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employee, setEmployee] = useState<IEmployee>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getEmployees().then((data) => setEmployees(data));
  }

  function handleAddClick() {
    setEmployee(undefined);
    setShowModal(true);
  }

  function handleEditClick(employee: IEmployee) {
    setEmployee(employee);
    setShowModal(true);
  }

  function handleDeleteClick(employee: IEmployee) {
    axios.delete(`/api/employee/${employee._id}`).then(loadData);
  }

  function handleSaved() {
    loadData();
    setShowModal(false);
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <div className="ml-auto">
          <IconButton size="large" onClick={handleAddClick}>
            <AddCircleIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-center">ชื่อ</TableCell>
              <TableCell className="text-center">นามสกุล</TableCell>
              <TableCell className="text-center">ตำแหน่ง</TableCell>
              <TableCell className="text-center">เบอร์โทร</TableCell>
              <TableCell className="text-center min-w-[100px]"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(employee)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(employee)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div>
          <EmployeeForm employee={employee} onSaved={handleSaved} />
        </div>
      </Modal>
    </>
  );
}

export default EmployeeDataGrid;
