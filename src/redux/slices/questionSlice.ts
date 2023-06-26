import { apiSlice } from "./apiSlice"

const questionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query<Question[], undefined>({
            query: () => `questions`,
            providesTags: ['Question'],
        }),
        getQuestionById: builder.query<Question, number>({
            query: (id) => `questions/${id}`,
            providesTags: ['Question'],
        }),

        updateQuestion: builder.mutation<Question, { data: UpdateQuestion, id: number }>({
            query: ({ data, id }) => ({
                url: `questions/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Question'],
        }),
        deleteQuestion: builder.mutation<Question,number>({
            query: (id) => ({
                url: `questions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Question'],
        }),
        createQuestion: builder.mutation<Question,CreateQuestion>({
            query: (data) => ({
                url: `questions`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Question'],

        }),
    }),
})

export const { 
    useGetQuestionsQuery,
    useGetQuestionByIdQuery,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    useCreateQuestionMutation
    
} = questionSlice

