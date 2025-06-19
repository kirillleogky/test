import axios from "axios";
import { type TEmployee, type TEmployeePayload, type TStatus } from "./types";

const API_BASE = "http://localhost:8000";
const api = axios.create({ baseURL: API_BASE });

const getUsersUrl = (reloadIndex: number = 0) => {
  return `${API_BASE}/users?reload=${reloadIndex}`;
};

const updateEmployeeStatus = (id: number, status: TStatus) => {
  return api.post<TEmployee[]>(`/users/${id}`, { status });
};

const addEmployee = (data: TEmployeePayload) => {
  return api.post<TEmployee>(`/users`, data);
};

export { getUsersUrl, updateEmployeeStatus, addEmployee };
