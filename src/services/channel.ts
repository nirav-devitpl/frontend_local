import { baseApi } from './base-api';
 
const channelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `channels/?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['CHANNEL'],
    }),
    getChannelById: builder.query({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'GET',
      }),
      providesTags: ['CHANNEL'],
    }),
    createChannel: builder.mutation({
      query: (data) => ({
        url: 'channels/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CHANNEL'],
    }),
    updateChannel: builder.mutation({
      query: (data) => ({
        url: `channels/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CHANNEL'],
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CHANNEL'],
    }),
    deactivateChannel: builder.mutation({
      query: (id) => ({
        url: `channels/deactivate/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['CHANNEL'],
    }),
    activateChannel: builder.mutation({
      query: (id) => ({
        url: `channels/activate/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['CHANNEL'],
    }),
  }),
});
 
export const {
  useGetChannelsQuery,
  useGetChannelByIdQuery,
  useCreateChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
  useDeactivateChannelMutation,
  useActivateChannelMutation,
} = channelApi;