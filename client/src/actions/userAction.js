import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";
import axios from "axios";

export const loginUser = (data) => {
  const req = axios.post("/api/users/login", data).then((res) => res.data);
  return {
    type: LOGIN_USER,
    payload: req,
  };
};
export const registerUser = (data) => {
  const req = axios.post("/api/users/register", data).then((res) => res.data);
  return {
    type: REGISTER_USER,
    payload: req,
  };
};
export const authUser = () => {
  const req = axios.get("/api/users/auth").then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: req,
  };
};
