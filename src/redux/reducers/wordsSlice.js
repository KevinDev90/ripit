import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    addWords: (state, action) => {
      state.push(action.payload);
    },
    cleanWords: (state) => {
      state = [];
    },
  },
});

export const { addWords, cleanWords } = wordsSlice.actions;
export default wordsSlice.reducer;
