import { baseApi } from "./base-api";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: '/category',
                method: 'GET'
            }),
            providesTags: ['CATEGORY'],
        }),
        getCategoryTree: builder.query({
            query: () => ({
                url: '/category/tree',
                method: 'GET'
            }),
            providesTags: ['CATEGORY'],
        }), 
        getCategoryById: builder.query({
            query: (id) => ({
                url: `category/${id}`,
                method: 'GET'
            }),
            providesTags: ['CATEGORY'],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: 'category',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['CATEGORY'],
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                url: `category/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['CATEGORY'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CATEGORY'],
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetCategoryTreeQuery } = categoryApi;
