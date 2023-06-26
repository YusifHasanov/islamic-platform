import { apiSlice } from "./apiSlice"


const articleSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: () => `articles`,
            providesTags: ['Article'],
        }),
        getArticleById: builder.query({
            query: (id) => `articles/${id}`,
            providesTags: ['Article'],
        }),
        updateArticle: builder.mutation({
            query: ({ data, id }) => ({
                url: `articles/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        deleteArticle: builder.mutation({
            query: (id) => ({
                url: `articles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Article'],

        }),
        createArticle: builder.mutation({
            query: (data) => ({
                url: `articles`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Article'], 
        }),
    }),
})

export const {
    useGetArticlesQuery,
    useGetArticleByIdQuery, 
    useUpdateArticleMutation,
    useDeleteArticleMutation,
    useCreateArticleMutation
} = articleSlice;

