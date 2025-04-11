import { baseApi } from "./base-api";

const customerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => ({
                url: '/customer/get-all',
                method: 'POST'
            }),
            providesTags: ['CUSTOMER'],
        }),
        getCustomerTree: builder.query({
            query: () => ({
                url: '/customer/tree',
                method: 'GET'
            }),
            providesTags: ['CUSTOMER'],
        }), 
        getCustomerById: builder.query({
            query: (id) => ({
                url: `customer/${id}`,
                method: 'GET'
            }),
            providesTags: ['CUSTOMER'],
        }),
        createCustomer: builder.mutation({
            query: (data) => ({
                url: 'customer',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['CUSTOMER'],
        }),
        updateCustomer: builder.mutation({
            query: (data) => ({
                url: `customer/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['CUSTOMER'],
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `customer/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CUSTOMER'],
        }),
    }),
});

export const { useGetCustomersQuery, useGetCustomerByIdQuery, useCreateCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation, useGetCustomerTreeQuery } = customerApi;
