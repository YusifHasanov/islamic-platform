import { combineReducers } from "@reduxjs/toolkit";
import playlistReducer from "../slices/playlistSlice";




export const rootReducer = combineReducers({
    playlist: playlistReducer,
})


 