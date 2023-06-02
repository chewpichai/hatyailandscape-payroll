import mongoose from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  type: string;
}

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  type: String,
});
