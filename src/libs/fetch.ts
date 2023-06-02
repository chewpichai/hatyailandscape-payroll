import axios from "axios";

export async function getEmployees() {
  const { data } = await axios.get("/api/employee");
  return data;
}

export async function getPayrolls(params?: { startDate: Date; endDate: Date }) {
  const { data } = await axios.get("/api/payroll", { params });
  return data;
}

export async function getUsers() {
  const { data } = await axios.get("/api/user");
  return data;
}

export async function getBonuses(params?: { startDate: Date; endDate: Date }) {
  const { data } = await axios.get("/api/bonus", { params });
  return data;
}
