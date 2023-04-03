import { createSlice } from "@reduxjs/toolkit";
import { COLORS } from "@utilities/contans";

const initialState = [
  {
    id: 1,
    title: "tema 1",
    color: COLORS.PURPLE,
    words: [
      { id: 1, word: "men" },
      { id: 2, word: "women" },
    ],
  },
  {
    id: 2,
    title: "tema 2",
    color: COLORS.BLUE,
    words: [
      { id: 1, word: "rattled" },
      { id: 2, word: "flee" },
    ],
  },
];

export const paquetSlice = createSlice({
  name: "paquet",
  initialState,
  reducers: {
    addPaquet: (state, action) => {
      state.push(action.payload);
    },
    deletePaquet: (state, action) => {
      const index = state.findIndex((element) => element.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    },
    editPaquet: (state, action) => {
      const item = action.payload;
      const editState = state.map((element) => {
        if (element.id === item.id)
          return {
            id: item.id,
            title: item.title,
            color: item.color,
            words: item.words,
          };
        else return element;
      });
      return editState;
    },
  },
});

export const { addPaquet, deletePaquet, editPaquet } = paquetSlice.actions;
export default paquetSlice.reducer;
