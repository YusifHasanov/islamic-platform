import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'


export const apiSlice = createApi({
    tagTypes: ['Video', 'Playlist','Category','Question','Author','Article','Book'],
    reducerPath: 'api',
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
      },
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
    endpoints: (builder) => ({}),
})


