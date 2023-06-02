"use client";
import React, { useEffect, useState } from "react";
import { getUsers } from "@/libs/fetch";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { IUser } from "@/models/user";
import UserForm from "./form-user";

function UserDataGrid() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getUsers().then((data) => setUsers(data));
  }

  function handleAddClick() {
    setUser(undefined);
    setShowModal(true);
  }

  function handleEditClick(user: IUser) {
    setUser(user);
    setShowModal(true);
  }

  function handleDeleteClick(user: IUser) {
    axios.delete(`/api/user/${user._id}`).then(loadData);
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
              <TableCell className="text-center">ชื่อผู้ใช้</TableCell>
              <TableCell className="text-center">ประเภท</TableCell>
              <TableCell className="text-center min-w-[100px]"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(user)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(user)}
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
          <UserForm user={user} onSaved={handleSaved} />
        </div>
      </Modal>
    </>
  );
}

export default UserDataGrid;
