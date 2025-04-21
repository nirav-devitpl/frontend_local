import { baseApi } from './base-api';

const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resendOtp: builder.mutation({
      query: (data) => ({
        url: 'auth/resend-otp', 
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useResendOtpMutation, 
} = otpApi;