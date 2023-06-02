import mongoose from "mongoose";
import { IEmployee } from "./employee";

export interface IPayroll {
  _id: string;
  employee: IEmployee;
  startDate: Date;
  endDate: Date;
  wage: { monthly: number; daily: number; hourly: number; overtime: number };
  salary: number;
  numDays: number;
  numHours: number;
  numOvertime: number;
  mealCost: number;
  diligentMoney: number;
  advanceWithdraw: number;
  returnWithholdingTax: number;
  socialSecurityRate: number;
  socialSecurity: number;
  total: number;
  status: string;
  payDate: Date;
}

export const PayrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  startDate: Date,
  endDate: Date,
  wage: {
    monthly: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
    hourly: { type: Number, default: 0 },
    overtime: { type: Number, default: 0 },
  },
  salary: { type: Number, default: 0 },
  numDays: { type: Number, default: 0 },
  numHours: { type: Number, default: 0 },
  numOvertime: { type: Number, default: 0 },
  mealCost: { type: Number, default: 0 },
  diligentMoney: { type: Number, default: 0 },
  advanceWithdraw: { type: Number, default: 0 },
  returnWithholdingTax: { type: Number, default: 0 },
  socialSecurityRate: { type: Number, default: 0 },
  socialSecurity: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  status: { type: String, default: "wait" },
  payDate: Date,
});
