import { baseApi } from "./base-api";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: 'auth/register',
                method: 'POST',
                body: data
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: 'auth/send-verification-link',
                method: 'POST',
                body: data
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
