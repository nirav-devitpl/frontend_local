import { baseApi } from './base-api';

const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    otp: builder.mutation({
      query: (data) => ({
        url: 'auth/verify-otp', 
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useOtpMutation, 
} = otpApi;