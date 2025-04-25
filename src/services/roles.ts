import { baseApi } from './base-api';
 
const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `roles/?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['ROLES'],
    }),
    fetchPermissions: builder.query({
      query: () => {
        return {
          url: `roles/resources`,
          method: 'GET',
        };
      },
      providesTags: ['ROLES'],
    }),
    getRoleById: builder.query({
      query: (id) => ({
        url: `roles/permissions/${id}`,
        method: 'GET',
      }),
      providesTags: ['ROLES'],
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: 'roles/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ROLES'],
    }),
    updateRole: builder.mutation({
      query: (data) => ({
        url: `roles/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ROLES'],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ROLES'],
    }),
    copyRole: builder.mutation({
      query: (id) => ({
        url: `roles/copy/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['ROLES'],
    }),
  }),
});
 
export const {
  useGetRolesQuery,
  useFetchPermissionsQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useCopyRoleMutation,
} = rolesApi;