import { apiSlice } from "./apiSlice"

const authorSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAuthors: builder.query({
            query: () => `authors`,
            providesTags: ['Author'],
        }),
        getAuthorById: builder.query({
            query: (id) => `authors/${id}`,
            providesTags: ['Author'],
        }),

        updateAuthor: builder.mutation({
            query: ({ data, id }) => ({
                url: `authors/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Author'],
        }),
        deleteAuthor: builder.mutation({
            query: (id) => ({
                url: `authors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Author'],
        }),
        createAuthor: builder.mutation({
            query: (data) => ({
                url: `authors`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Author'],

        }),
    }),
})

export const { 
} = authorSlice

