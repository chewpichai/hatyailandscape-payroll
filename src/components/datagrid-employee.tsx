"use client";
import React, { useState } from "react";
import { api, getEmployees } from "@/libs/fetch";
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
} from "@mui/material";
import { IEmployee } from "@/models/employee";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import FolderIcon from "@mui/icons-material/Folder";
import EmployeeForm from "./form-employee";
import UploadDialog from "./dialog-upload";
import ViewFileDialog from "./dialog-viewfile";
import { useQuery } from "@tanstack/react-query";

function EmployeeDataGrid(props: { employees: IEmployee[] }) {
  const [employee, setEmployee] = useState<IEmployee>();
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showViewFileDialog, setShowViewFileDialog] = useState(false);
  const { data: employees, refetch } = useQuery<IEmployee[]>({
    queryKey: ["employees"],
    queryFn: getEmployees,
    initialData: props.employees,
    enabled: false,
  });

  function loadData() {
    refetch();
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
    if (confirm(`ต้องการลบ ${employee.firstName}`))
      api.delete(`/api/employee/${employee._id}`).then(loadData);
  }

  function handleSaved() {
    loadData();
    setShowModal(false);
    setShowDialog(false);
  }

  function handleUploadClick(employee: IEmployee) {
    setEmployee(employee);
    setShowDialog(true);
  }

  function handleViewFileClick(employee: IEmployee) {
    setEmployee(employee);
    setShowViewFileDialog(true);
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
                <TableCell className="text-right">
                  <IconButton
                    size="small"
                    onClick={() => handleUploadClick(employee)}
                  >
                    <DriveFolderUploadIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleViewFileClick(employee)}
                    disabled={!employee.media?.length}
                  >
                    <FolderIcon fontSize="inherit" />
                  </IconButton>
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

      <UploadDialog
        employee={employee}
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSaved={handleSaved}
      />

      <ViewFileDialog
        files={employee?.media}
        open={showViewFileDialog}
        onClose={() => setShowViewFileDialog(false)}
      />
    </>
  );
}

export default EmployeeDataGrid;
