"use client";
import React, { useEffect, useState } from "react";
import { api, getPayrolls } from "@/libs/fetch";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IPayroll } from "@/models/payroll";
import moment from "moment-timezone";
import { DateInputField } from "./fields";
import { useForm } from "react-hook-form";
import PayrollForm from "./form-payroll";
import "moment/locale/th";
import { getDateRange } from "@/libs/utils";
import dayjs, { Dayjs } from "dayjs";
import PayConfirmDialog from "./dialog-pay-confirm";

moment.locale("th");

type PayrollSearchFormData = {
  startDate: Dayjs;
  endDate: Dayjs;
};

function PayrollDataGrid() {
  const [payrolls, setPayrolls] = useState<IPayroll[]>([]);
  const [payroll, setPayroll] = useState<IPayroll>();
  const [showModal, setShowModal] = useState(false);
  const [startDate, endDate] = getDateRange();
  const { control, setValue, handleSubmit } = useForm<PayrollSearchFormData>({
    defaultValues: { startDate: dayjs(startDate), endDate: dayjs(endDate) },
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const [startDate, endDate] = getDateRange();
    const params = { startDate, endDate };
    getPayrolls(params).then((data) => setPayrolls(data));
  }, []);

  function onSubmit(data: PayrollSearchFormData) {
    const params = {
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
    };
    getPayrolls(params).then((data) => setPayrolls(data));
  }

  function handleAddClick() {
    setPayroll(undefined);
    setShowModal(true);
  }

  function handleEditClick(payroll: IPayroll) {
    setPayroll(payroll);
    setShowModal(true);
  }

  function handleDeleteClick(payroll: IPayroll) {
    api
      .delete(`/api/payroll/${payroll._id}`)
      .then(() => handleSubmit(onSubmit)());
  }

  function handleSaved() {
    setShowModal(false);
    setShowDialog(false);
    handleSubmit(onSubmit)();
  }

  function handlePayClick(payroll: IPayroll) {
    setPayroll(payroll);
    setShowDialog(true);
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <div className="w-40">
          <DateInputField
            control={control}
            name="startDate"
            label="เริ่มวันที่"
          />
        </div>
        <div className="w-40 mx-2">
          <DateInputField control={control} name="endDate" label="ถึงวันที่" />
        </div>
        <div>
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
                ช่วงวันที่
              </TableCell>
              <TableCell className="text-center min-w-[80px]">
                ยอดจ่าย
              </TableCell>
              <TableCell className="text-center min-w-[120px]">
                บัญชีธนาคาร
              </TableCell>
              <TableCell className="text-center">สถานะ</TableCell>
              <TableCell className="text-center min-w-[140px]">
                วันที่จ่าย
              </TableCell>
              <TableCell className="text-center min-w-[96px]"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrolls.map((payroll) => (
              <TableRow key={payroll._id}>
                <TableCell>{`${payroll.employee.firstName} ${payroll.employee.lastName}`}</TableCell>
                <TableCell className="text-center">
                  {`${moment(payroll.startDate).format("DD")}-${moment(
                    payroll.endDate
                  ).format("DD")}`}
                  <br />
                  {moment(payroll.endDate).format("MMM YY")}
                </TableCell>
                <TableCell className="text-right">{payroll.total}</TableCell>
                <TableCell className="text-center">
                  {payroll.employee.bankAccount?.bank}
                  <br />
                  {payroll.employee.bankAccount?.number}
                </TableCell>
                <TableCell className="text-center">{payroll.status}</TableCell>
                <TableCell className="text-center">
                  {payroll.payDate ? (
                    moment(payroll.payDate).format("DD/MM/YY")
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handlePayClick(payroll)}
                    >
                      แจ้งจ่ายเงิน
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {payroll.status !== "paid" && (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(payroll)}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(payroll)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div>
          <PayrollForm payroll={payroll} onSaved={handleSaved} />
        </div>
      </Modal>

      <PayConfirmDialog
        payroll={payroll}
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSaved={handleSaved}
      />
    </>
  );
}

export default PayrollDataGrid;
