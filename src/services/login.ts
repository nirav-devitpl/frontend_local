import { baseApi } from './base-api';

const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'auth/login', // Adjust the endpoint URL as per your backend API
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation, // Export the login mutation hook
} = loginApi;