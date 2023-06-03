import {
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { DateInputField } from "./fields";
import { useForm } from "react-hook-form";
import { Dayjs } from "dayjs";
import { IPayroll } from "@/models/payroll";
import { useState } from "react";
import { IBonus } from "@/models/bonus";
import { api } from "@/libs/fetch";

type FormData = {
  payDate: Dayjs;
};

type Props = {
  payroll?: IPayroll;
  bonus?: IBonus;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export default function PayConfirmDialog({
  payroll,
  bonus,
  open,
  onClose,
  onSaved,
}: Props) {
  const { control, handleSubmit } = useForm<FormData>();
  const [saving, setSaving] = useState(false);

  function onSubmit(data: FormData) {
    setSaving(true);
    const body = { ...data, status: "paid" };
    const promise = payroll
      ? api.put(`/api/payroll/${payroll?._id}`, body)
      : api.put(`/api/bonus/${bonus?._id}`, body);
    promise.then(() => {
      setSaving(false);
      onSaved();
    });
  }

  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogContent>
        <DateInputField control={control} name="payDate" label="วันที่จ่าย" />
      </DialogContent>
      <DialogActions>
        {saving ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <Button onClick={onClose}>ยกเลิก</Button>
            <Button onClick={handleSubmit(onSubmit)}>บันทึก</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
