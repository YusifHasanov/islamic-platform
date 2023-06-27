import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import { RootState } from "../store/store"

const playlistSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlaylists: builder.query<Playlist[], undefined>({
            query: () => `playlists`, 
            providesTags: ['Playlist'],
           
        }),
        getPlaylistById: builder.query({
            query: (id) => `playlists/${id}`,
            providesTags: ['Playlist'],
        }),
        updatePlaylist: builder.mutation({
            query: (data) => ({
                url: `playlists/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylist: builder.mutation({
            query: (id) => ({
                url: `playlists/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Playlist'],
        }),
        createPlaylist: builder.mutation({
            query: (data) => ({
                url: `playlists`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Playlist'],

        }),
    }),
})


const playlistState = createSlice({
    name: 'playlist',
    initialState: {},
    reducers: {
        setPlaylist: (state, action) => {
            state = action.payload
        } 
    },
})

export const {
    useGetPlaylistsQuery,
    useGetPlaylistByIdQuery,
    useUpdatePlaylistMutation,
    useDeletePlaylistMutation,
    useCreatePlaylistMutation,
} = playlistSlice

export const { setPlaylist } = playlistState.actions
export const playlistSelector = (state :any) => state.playlist

export default playlistState.reducer