"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";
import { DateInputField, InputField, SelectInput } from "./fields";
import dayjs, { Dayjs } from "dayjs";
import { IBonus } from "@/models/bonus";
import { IEmployee } from "@/models/employee";
import { api, getEmployees, getPayrolls } from "@/libs/fetch";
import { IPayroll } from "@/models/payroll";

interface IBonusFormData
  extends Omit<IBonus, "employee" | "startDate" | "endDate" | "payDate"> {
  employee: string;
  startDate: Dayjs;
  endDate: Dayjs;
  payDate: Dayjs;
}
type Props = { bonus?: IBonus; onSaved?: () => void };

function BonusForm({ bonus, onSaved }: Props) {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, watch, reset, setValue } =
    useForm<IBonusFormData>();
  const employee = watch("employee");
  const total = watch("total");

  useEffect(() => {
    getEmployees().then((data) => setEmployees(data));
  }, []);

  useEffect(() => {
    if (bonus) {
      reset({
        ...bonus,
        employee: bonus.employee._id,
        startDate: dayjs(bonus.startDate),
        endDate: dayjs(bonus.endDate),
        payDate: dayjs(bonus.payDate),
      });
    }
  }, [bonus, reset]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const includes = ["rate", "salary"];
      if (name && includes.includes(name)) {
        const total = Number(value.rate || 0) * Number(value.salary || 0);
        setValue("total", total);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const includes = ["employee", "startDate", "endDate"];
      if (name && includes.includes(name)) {
        const employee = value.employee;
        const startDate = value.startDate as Dayjs;
        const endDate = value.endDate as Dayjs;
        if (employee && startDate && endDate) {
          getPayrolls({
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
          }).then((payrolls) => {
            const salary = payrolls
              .filter((p: IPayroll) => p.employee._id === employee)
              .reduce((sum: number, p: IPayroll) => sum + p.salary, 0);
            setValue("salary", salary);
          });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  function onSubmit(data: IBonusFormData) {
    setSaving(true);
    let promise;
    if (bonus) promise = api.put(`/api/bonus/${bonus._id}`, data);
    else promise = api.post("/api/bonus", data);
    promise.then(({ data }) => {
      setSaving(false);
      onSaved && onSaved();
    });
  }

  return (
    <Container component={Paper} maxWidth="sm" className="py-4">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <SelectInput
            control={control}
            name="employee"
            label="พนักงาน"
            options={employees.map((emp) => ({
              label: `${emp.firstName} ${emp.lastName}`,
              value: emp._id,
            }))}
          />
        </Grid>
        <Grid xs={6}>
          <DateInputField
            control={control}
            name="startDate"
            label="เริ่มวันที่"
          />
        </Grid>
        <Grid xs={6}>
          <DateInputField control={control} name="endDate" label="ถึงวันที่" />
        </Grid>

        <Grid xs={6}>
          <InputField
            control={control}
            name="rate"
            label="อัตราโบนัส"
            type="number"
          />
        </Grid>
        <Grid xs={6}>
          <InputField
            control={control}
            name="salary"
            label="ค่าจ้างรวม"
            type="number"
            disabled
          />
        </Grid>
      </Grid>

      <div className="flex mt-4">
        <Typography variant="body1" component="div">
          ยอดสุทธิ {total}
        </Typography>

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

export default BonusForm;
