import mongoose from "mongoose";

export interface IEmployee {
  _id: string;
  type: string;
  position: string;
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  idCardNumber: string;
  passportNumber: string;
  bankAccount: {
    bank: string;
    branch: string;
    name: string;
    number: string;
  };
  wage: { monthly: number; daily: number; hourly: number; overtime: number };
  inSocialSecurity: boolean;
  startDate: Date;
}

export const EmployeeSchema = new mongoose.Schema({
  type: String,
  position: String,
  title: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  idCardNumber: String,
  passportNumber: String,
  bankAccount: {
    bank: String,
    branch: String,
    name: String,
    number: String,
  },
  wage: {
    monthly: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
    hourly: { type: Number, default: 0 },
    overtime: { type: Number, default: 0 },
  },
  inSocialSecurity: { type: Boolean, default: false },
  startDate: Date,
});

EmployeeSchema.pre("findOneAndDelete", function (next) {
  const { _id: employee } = this.getQuery();
  mongoose.models.Payroll.deleteMany({ employee }).exec();
  next();
});
