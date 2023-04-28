import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  userID: "",
  note: "",
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const { id, userID, note } = action.payload;
      return (state = {
        id,
        userID,
        note,
      });
    },
  },
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
