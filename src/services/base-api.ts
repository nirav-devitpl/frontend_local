import { getToken } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AUTH_API_BASE_URL}`,
    prepareHeaders: (header) => {
      header.append("Authorization", `Bearer ${getToken()}`);
      header.append("Accept-Language", `${localStorage.getItem("i18nextLng")}`);
    },
  }),
  tagTypes: ['CHANNEL'],
  endpoints: () => ({}),
});

export const keyClockBaseApi = createApi({
  reducerPath: "keyClockAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AUTH_API_BASE_URL}`,
    prepareHeaders: (header) => {
      header.append("Authorization", `Bearer ${getToken()}`);
      header.append("Accept-Language", `${localStorage.getItem("i18nextLng")}`);
    },
  }),
  tagTypes: ['AUTH'],
  endpoints: () => ({}),
});

// Alpinebits baseApi instance
export const alpinebitsApi = createApi({
  reducerPath: "alpinebitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_ALPINEBITS_API_BASE_URL}`,
    prepareHeaders: (header) => {
      const username = import.meta.env.VITE_ALPINEBITS_USERNAME;
      const password = import.meta.env.VITE_ALPINEBITS_PASSWORD;
      const basicAuth = btoa(`${username}:${password}`);
      header.append("Authorization", `Basic ${basicAuth}`);
      header.append("Accept-Language", `${localStorage.getItem("i18nextLng")}`);
    },
  }),
  tagTypes: ['ALPINEBITS'],
  endpoints: () => ({}),
});