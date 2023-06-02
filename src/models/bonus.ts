import mongoose from "mongoose";
import { IEmployee } from "./employee";

export interface IBonus {
  _id: string;
  employee: IEmployee;
  startDate: Date;
  endDate: Date;
  rate: number;
  salary: number;
  total: number;
  status: string;
  payDate: Date;
}

export const BonusSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  startDate: Date,
  endDate: Date,
  rate: { type: Number, default: 0 },
  salary: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  status: { type: String, default: "wait" },
  payDate: Date,
});
