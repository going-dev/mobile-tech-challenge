import type { AxiosInstance } from "axios";
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const api: AxiosInstance = axios.create({
  baseURL: "https://mobile-tech-challenge-api.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
