import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}${process.env.NEXT_PUBLIC_BASE_PATH}`,
  headers: { "X-Server-Secret": process.env.JWT_SECRET },
});

export async function getEmployees() {
  const { data } = await api.get("/api/employee");
  return data;
}

export async function getPayrolls(params?: { startDate: Date; endDate: Date }) {
  const { data } = await api.get("/api/payroll", { params });
  return data;
}

export async function getUsers() {
  const { data } = await api.get("/api/user");
  return data;
}

export async function getBonuses(params?: { startDate: Date; endDate: Date }) {
  const { data } = await api.get("/api/bonus", { params });
  return data;
}
