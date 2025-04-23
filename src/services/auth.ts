import { baseApi } from "./base-api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login API
    login: builder.mutation({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      //invalidatesTags: ['AUTH'], // Invalidate tags if necessary
    }),

    // Forgot Password API
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: data,
      }),
      //invalidatesTags: ['AUTH'], // Invalidate tags if necessary
    }),

    // Verify OTP API
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: 'auth/verify-otp',
        method: 'POST',
        body: data,
      }),
      //invalidatesTags: ['AUTH'], // Invalidate tags if necessary
    }),

    // Change Password API 
    changePassword: builder.mutation({
      query: (data) => ({
        url: 'auth/change-password',
        method: 'POST',
        body: data,
      }),
      //invalidatesTags: ['AUTH'], // Invalidate tags if necessary
    }),

    // Change Password API 
    resetPassword: builder.mutation({
      query: (data) => ({
      url: 'auth/reset-password',
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      }),
      //invalidatesTags: ['AUTH'], // Invalidate tags if necessary
    }),

    // Resend OTP API
    resendOtp: builder.mutation({
      query: (data) => ({
        url: 'auth/resend-otp',
        method: 'POST',
        body: data,
      }),
      //invalidatesTags: ['AUTH'], // Invalidate tags if necessary
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
} = authApi;