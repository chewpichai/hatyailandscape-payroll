"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { DateInputField, InputField, SelectInput } from "./fields";
import { useForm } from "react-hook-form";
import { api, getEmployees } from "@/libs/fetch";
import { IEmployee } from "@/models/employee";
import { IPayroll } from "@/models/payroll";
import dayjs, { Dayjs } from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  employee: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  salary: yup.number().required(),
});

interface IPayrollFormData
  extends Omit<IPayroll, "employee" | "startDate" | "endDate"> {
  employee: string;
  startDate: Dayjs;
  endDate: Dayjs;
}

type Props = { payroll?: IPayroll; onSaved?: () => void };

function PayrollForm({ payroll, onSaved }: Props) {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employee, setEmployee] = useState<IEmployee>();
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, watch, setValue, reset } =
    useForm<IPayrollFormData>({ resolver: yupResolver(schema) });
  const employeeId = watch("employee");
  const total = watch("total");

  useEffect(() => {
    getEmployees().then((data) => setEmployees(data));
  }, []);

  useEffect(() => {
    if (payroll)
      reset({
        ...payroll,
        employee: payroll.employee._id,
        startDate: dayjs(payroll.startDate),
        endDate: dayjs(payroll.endDate),
      });
  }, [payroll, reset, employees]);

  useEffect(() => {
    if (employeeId) {
      const tmp = employees.find((emp) => emp._id === employeeId);
      setEmployee(tmp);
      if (tmp) setValue("wage", tmp.wage);
    }
  }, [employeeId, setValue, employees, setEmployee]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const includes = [
        "numDays",
        "numHours",
        "wage.daily",
        "wage.hourly",
        "socialSecurityRate",
      ];
      if (name && includes.includes(name) && value.wage) {
        const monthly = Number(value.wage.monthly || 0);
        const daily =
          Number(value.wage.daily || 0) * Number(value.numDays || 0);
        const hourly =
          Number(value.wage.hourly || 0) * Number(value.numHours || 0);
        const salary = monthly + daily + hourly;
        const socialSecurityRate = Number(value.socialSecurityRate);
        const socialSecurity = Math.ceil(salary * socialSecurityRate);
        const returnWithholdingTax = Math.ceil((salary * 3) / 97);
        setValue("salary", salary);
        if (employee?.inSocialSecurity)
          setValue("socialSecurity", socialSecurity);
        else setValue("returnWithholdingTax", returnWithholdingTax);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, employee]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const includes = [
        "salary",
        "socialSecurity",
        "wage.overtime",
        "numOvertime",
        "mealCost",
        "advanceWithdraw",
        "returnWithholdingTax",
        "diligentMoney",
      ];
      if (name && includes.includes(name) && value.wage) {
        const total =
          Number(value.salary || 0) -
          Number(value.socialSecurity || 0) +
          Number(value.wage.overtime || 0) * Number(value.numOvertime || 0) +
          Number(value.mealCost || 0) +
          Number(value.advanceWithdraw || 0) +
          Number(value.returnWithholdingTax || 0) +
          Number(value.diligentMoney || 0);
        setValue("total", total);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  function onSubmit(data: IPayrollFormData) {
    setSaving(true);
    let promise;
    if (payroll) promise = api.put(`/api/payroll/${payroll._id}`, data);
    else promise = api.post("/api/payroll", data);
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

        <Grid xs={12}>
          <Divider className="my-2" />
        </Grid>

        <Grid xs={4}>
          <InputField
            control={control}
            name="numDays"
            label="จำนวนวัน"
            disabled={employee?.type !== "daily"}
            type="number"
          />
        </Grid>
        <Grid xs={4}>
          <InputField
            control={control}
            name="numHours"
            label="จำนวนชั่วโมง"
            disabled={employee?.type !== "daily"}
            type="number"
          />
        </Grid>
        <Grid xs={4}>
          <InputField
            control={control}
            name="salary"
            label="ค่าจ้างรวม"
            type="number"
          />
        </Grid>

        <Grid xs={4}>
          <InputField
            control={control}
            name="wage.daily"
            label="ค่าจ้างรายวัน"
            disabled={employee?.type !== "daily"}
            type="number"
          />
        </Grid>
        <Grid xs={4}>
          <InputField
            control={control}
            name="wage.hourly"
            label="ค่าจ้างรายชั่วโมง"
            disabled={employee?.type !== "daily"}
            type="number"
          />
        </Grid>

        <Grid xs={12}>
          <Divider className="my-2" />
        </Grid>

        <Grid xs={4}>
          <SelectInput
            control={control}
            name="socialSecurityRate"
            label="ประกันสังคม"
            options={[
              { label: "ไม่คำนวณ", value: 0 },
              { label: "0.5%", value: 0.005 },
              { label: "1%", value: 0.01 },
              { label: "2%", value: 0.02 },
              { label: "2.5%", value: 0.025 },
              { label: "3%", value: 0.03 },
              { label: "5%", value: 0.05 },
            ]}
            disabled={!employee?.inSocialSecurity}
          />
        </Grid>
        <Grid xs={4}>
          <InputField
            control={control}
            name="socialSecurity"
            label="เงินประกันสังคม"
            disabled={!employee?.inSocialSecurity}
            type="number"
          />
        </Grid>
        <Grid xs={4}>
          <InputField
            control={control}
            name="returnWithholdingTax"
            label="เงินภาษีบวกกลับ"
            disabled={employee?.inSocialSecurity}
            type="number"
          />
        </Grid>

        <Grid xs={12}>
          <Divider className="my-2" />
        </Grid>

        <Grid xs={4}>
          <InputField
            control={control}
            name="numOvertime"
            label="จำนวน OT"
            type="number"
          />
        </Grid>
        <Grid xs={4}>
          <InputField
            control={control}
            name="diligentMoney"
            label="เบี้ยขยัน"
            type="number"
          />
        </Grid>
        <Grid xs={4}>
          <InputField
            control={control}
            name="mealCost"
            label="ค่าอาหาร"
            type="number"
          />
        </Grid>

        <Grid xs={4}>
          <InputField
            control={control}
            name="wage.overtime"
            label="ค่าล่วงเวลา"
            type="number"
          />
        </Grid>
        <Grid xs={4}>
          <InputField
            control={control}
            name="advanceWithdraw"
            label="เงินเบิกล่วงหน้า"
            type="number"
          />
        </Grid>
      </Grid>

      <div className="flex items-center mt-4">
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

export default PayrollForm;
