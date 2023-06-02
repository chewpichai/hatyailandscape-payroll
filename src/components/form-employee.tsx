"use client";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";
import {
  CheckboxInput,
  DateInputField,
  InputField,
  SelectInput,
} from "./fields";
import { IEmployee } from "@/models/employee";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

interface IEmployeeFormData extends Omit<IEmployee, "startDate"> {
  startDate: Dayjs;
}
type Props = { employee?: IEmployee; onSaved?: () => void };

function EmployeeForm({ employee, onSaved }: Props) {
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, watch, reset } = useForm<IEmployeeFormData>();
  const type = watch("type");

  useEffect(() => {
    if (employee) {
      reset({ ...employee, startDate: dayjs(employee.startDate) });
    }
  }, [employee, reset]);

  function onSubmit(data: IEmployeeFormData) {
    setSaving(true);
    let promise;
    if (employee) promise = axios.put(`/api/employee/${employee._id}`, data);
    else promise = axios.post("/api/employee", data);
    promise.then(({ data }) => {
      setSaving(false);
      onSaved && onSaved();
    });
  }

  return (
    <Container component={Paper} maxWidth="sm" className="py-4">
      <Grid container spacing={2}>
        <Grid xs={6} sm={3}>
          <SelectInput
            control={control}
            name="type"
            label="ประเภท"
            options={[
              { label: "รายวัน", value: "daily" },
              { label: "รายเดือน", value: "monthly" },
            ]}
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <InputField control={control} name="position" label="ตำแหน่ง" />
        </Grid>
        <Grid xs={6} sm={3}>
          <DateInputField
            control={control}
            name="startDate"
            label="วันที่เริ่มงาน"
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <CheckboxInput
            control={control}
            name="inSocialSecurity"
            label="ประกันสังคม"
          />
        </Grid>
        <Grid xs={6} sm={4}>
          <InputField control={control} name="title" label="คำนำหน้าชื่อ" />
        </Grid>
        <Grid xs={12} sx={{ display: { sm: "none" }, p: 0 }} />
        <Grid xs={6} sm={4}>
          <InputField control={control} name="firstName" label="ชื่อ" />
        </Grid>
        <Grid xs={6} sm={4}>
          <InputField control={control} name="lastName" label="นามสกุล" />
        </Grid>
        <Grid xs={6}>
          <InputField control={control} name="phoneNumber" label="เบอร์โทร" />
        </Grid>
        <Grid xs={6}>
          <InputField control={control} name="address" label="ที่อยู่" />
        </Grid>
        <Grid xs={6}>
          <InputField
            control={control}
            name="idCardNumber"
            label="หมายเลขบัตรประชาชน"
          />
        </Grid>
        <Grid xs={6}>
          <InputField
            control={control}
            name="passportNumber"
            label="หมายเลขพาสปอร์ต"
          />
        </Grid>
        <Grid xs={6}>
          <InputField
            control={control}
            name="bankAccount.bank"
            label="ธนาคาร"
          />
        </Grid>
        <Grid xs={6}>
          <InputField
            control={control}
            name="bankAccount.branch"
            label="สาขา"
          />
        </Grid>
        <Grid xs={6}>
          <InputField
            control={control}
            name="bankAccount.name"
            label="ชื่อบัญชี"
          />
        </Grid>
        <Grid xs={6}>
          <InputField
            control={control}
            name="bankAccount.number"
            label="เลขบัญชี"
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <InputField
            control={control}
            name="wage.monthly"
            label="ค่าจ้างรายเดือน"
            disabled={type === "daily"}
            type="number"
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <InputField
            control={control}
            name="wage.daily"
            label="ค่าจ้างรายวัน"
            disabled={type === "monthly"}
            type="number"
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <InputField
            control={control}
            name="wage.hourly"
            label="ค่าจ้างรายชั่วโมง"
            disabled={type === "monthly"}
            type="number"
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <InputField
            control={control}
            name="wage.overtime"
            label="ค่าล่วงเวลา"
            type="number"
          />
        </Grid>
      </Grid>

      <div className="flex mt-4">
        {saving ? (
          <CircularProgress className="ml-auto" />
        ) : (
          <Button
            className="ml-auto"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            บันทึก
          </Button>
        )}
      </div>
    </Container>
  );
}

export default EmployeeForm;
