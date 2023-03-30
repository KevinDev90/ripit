// USING REDUX THUNK
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPhotos = createAsyncThunk("photos/getPhotos", async () => {
  const response = await fetch("jsonplaceholder");
  const data = await response.json();
  return data;
});

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    isLoading: false,
    photo: [],
  },
  extraReducers: {
    [getPhotos.pending]: (state) => {
      state.isLoading = true;
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.photos = action.payload;
      state.isLoading = false;
    },
    [getPhotos.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default gallerySlice.reducer;
