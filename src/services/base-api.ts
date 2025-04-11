import { getToken } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    prepareHeaders: (header) => {
      header.append("Authorization", `Bearer ${getToken()}`);
    },
  }),
  tagTypes: ['CATEGORY','CUSTOMER','CHANNEL'],
  endpoints: () => ({}),
});
