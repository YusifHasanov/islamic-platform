import { apiSlice } from "./apiSlice"

const videoSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => `videos`,
            providesTags: ['Video'],
        }),
        getVideoById: builder.query({
            query: (id) => `videos/${id}`,
            providesTags: ['Video'],
        }),
        getVideosByPlaylistId: builder.query({
            query: (id) => `videos?playlistId=${id}`,
            providesTags: ['Video'],
        }),
        updateVideo: builder.mutation({
            query: (data) => ({
                url: `videos/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Video'],
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Video'],
        }),
        createVideo: builder.mutation({
            query: (data) => ({
                url: `videos`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Video'],

        }),
    }),
})

export const {
    useGetVideosQuery,
    useGetVideoByIdQuery,
    useGetVideosByPlaylistIdQuery,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
    useCreateVideoMutation,


} = videoSlice

