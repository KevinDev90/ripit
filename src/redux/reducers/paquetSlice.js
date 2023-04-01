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
      const index = state.indexOf(action.payload);
      if (index > -1) {
        const newState = state.splice(index, 1);
        state = newState;
      }
    },
  },
});

export const { addPaquet, deletePaquet } = paquetSlice.actions;
export default paquetSlice.reducer;
