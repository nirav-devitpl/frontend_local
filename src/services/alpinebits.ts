import { alpinebitsApi } from './base-api';

const extendedAlpinebitsApi = alpinebitsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlpinebits: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `channels/?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['ALPINEBITS'],
    }),
  }),
});

export const {
  useGetAlpinebitsQuery,
} = extendedAlpinebitsApi;

export { alpinebitsApi };
