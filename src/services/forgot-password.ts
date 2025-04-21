import { baseApi } from './base-api';

const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/forgot-password', 
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation, 
} = forgotPasswordApi;