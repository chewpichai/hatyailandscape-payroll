import mongoose from "mongoose";
import { EmployeeSchema, IEmployee } from "./employee";
import { IPayroll, PayrollSchema } from "./payroll";
import { IUser, UserSchema } from "./user";
import { IBonus, BonusSchema } from "./bonus";
import dbConnect from "@/libs/db";

dbConnect();

export const Employee =
  mongoose.models.Employee ||
  mongoose.model<IEmployee>("Employee", EmployeeSchema);

export const Payroll =
  mongoose.models.Payroll || mongoose.model<IPayroll>("Payroll", PayrollSchema);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export const Bonus =
  mongoose.models.Bonus || mongoose.model<IBonus>("Bonus", BonusSchema);
