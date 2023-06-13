import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}${process.env.NEXT_PUBLIC_BASE_PATH}`,
  headers: { "X-Server-Secret": process.env.JWT_SECRET },
});

export async function getEmployees() {
  try {
    const { data } = await api.get("/api/employee");
    return data;
  } catch (err) {
    return [];
  }
}

export async function getPayrolls(params?: { startDate: Date; endDate: Date }) {
  try {
    const { data } = await api.get("/api/payroll", { params });
    return data;
  } catch (err) {
    return [];
  }
}

export async function getUsers() {
  try {
    const { data } = await api.get("/api/user");
    return data;
  } catch (err) {
    return [];
  }
}

export async function getBonuses(params?: { startDate: Date; endDate: Date }) {
  try {
    const { data } = await api.get("/api/bonus", { params });
    return data;
  } catch (err) {
    return [];
  }
}
