"use client";
import React, { useEffect, useState } from "react";
import { api, getBonuses } from "@/libs/fetch";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IBonus } from "@/models/bonus";
import moment from "moment-timezone";
import BonusForm from "./form-bonus";
import { DateInputField } from "./fields";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import PayConfirmDialog from "./dialog-pay-confirm";

type FormData = {
  endDate: Dayjs;
};

function BonusDataGrid() {
  const [bonuses, setBonuses] = useState<IBonus[]>([]);
  const [bonus, setBonus] = useState<IBonus>();
  const [showModal, setShowModal] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { endDate: dayjs() },
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const year = dayjs().year();
    const params = {
      startDate: dayjs(`01-01-${year}`).toDate(),
      endDate: dayjs(`12-31-${year}`).toDate(),
    };
    getBonuses(params).then((data) => setBonuses(data));
  }, []);

  function handleAddClick() {
    setBonus(undefined);
    setShowModal(true);
  }

  function handleEditClick(bonus: IBonus) {
    setBonus(bonus);
    setShowModal(true);
  }

  function handleDeleteClick(bonus: IBonus) {
    api.delete(`/api/bonus/${bonus._id}`).then(() => handleSubmit(onSubmit)());
  }

  function handleSaved() {
    handleSubmit(onSubmit)();
    setShowModal(false);
    setShowDialog(false);
  }

  function onSubmit(data: FormData) {
    const year = data.endDate.year();
    const params = {
      startDate: dayjs(`01-01-${year}`).toDate(),
      endDate: dayjs(`12-31-${year}`).toDate(),
    };
    getBonuses(params).then((data) => setBonuses(data));
  }

  function handlePayClick(bonus: IBonus) {
    setBonus(bonus);
    setShowDialog(true);
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <div className="w-[100px]">
          <DateInputField
            control={control}
            label="ปีโบนัส"
            name="endDate"
            format="YYYY"
          />
        </div>
        <div className="ml-2">
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            ค้นหา
          </Button>
        </div>
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
              <TableCell className="text-center min-w-[120px]">
                พนักงาน
              </TableCell>
              <TableCell className="text-center min-w-[80px]">
                เริ่มวันที่
              </TableCell>
              <TableCell className="text-center min-w-[80px]">
                ถึงวันที่
              </TableCell>
              <TableCell className="text-center">อัตรา</TableCell>
              <TableCell className="text-center min-w-[80px]">
                ยอดจ่าย
              </TableCell>
              <TableCell className="text-center">สถานะ</TableCell>
              <TableCell className="text-center min-w-[150px]">
                วันที่จ่าย
              </TableCell>
              <TableCell className="text-center min-w-[100px]"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bonuses.map((bonus) => (
              <TableRow key={bonus._id}>
                <TableCell>{`${bonus.employee.firstName} ${bonus.employee.lastName}`}</TableCell>
                <TableCell className="text-center">
                  {moment(bonus.startDate).format("DD/MM/YY")}
                </TableCell>
                <TableCell className="text-center">
                  {moment(bonus.endDate).format("DD/MM/YY")}
                </TableCell>
                <TableCell className="text-center">{bonus.rate}</TableCell>
                <TableCell className="text-right">{bonus.total}</TableCell>
                <TableCell className="text-center">{bonus.status}</TableCell>
                <TableCell className="text-center">
                  {bonus.payDate ? (
                    moment(bonus.payDate).format("DD/MM/YY")
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handlePayClick(bonus)}
                    >
                      แจ้งจ่ายเงิน
                    </Button>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(bonus)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(bonus)}
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
          <BonusForm bonus={bonus} onSaved={handleSaved} />
        </div>
      </Modal>

      <PayConfirmDialog
        bonus={bonus}
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSaved={handleSaved}
      />
    </>
  );
}

export default BonusDataGrid;
