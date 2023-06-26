import { apiSlice } from "./apiSlice";



const bookSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => `books`,
            providesTags: ['Book'],
        }),
        getBookById: builder.query({
            query: (id) => `books/${id}`,
            providesTags: ['Book'],
        }),

        updateBook: builder.mutation({
            query: ({ data, id }) => ({
                url: `books/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Book'],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Book'],
        }),
        createBook: builder.mutation({
            query: (data) => ({
                url: `books`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Book'],

        }),
    }),
})

export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useCreateBookMutation
} = bookSlice;