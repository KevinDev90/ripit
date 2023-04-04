import { createSlice } from "@reduxjs/toolkit";
import { COLORS } from "@utilities/contans";

const initialState = [
  {
    id: 1,
    title: "tema 1",
    color: COLORS.PURPLE,
    words: [
      { id: 1, word: "men", pass: false },
      { id: 2, word: "women", pass: false },
    ],
  },
  {
    id: 2,
    title: "tema 2",
    color: COLORS.BLUE,
    words: [
      { id: 1, word: "rattled", pass: false },
      { id: 2, word: "flee", pass: false },
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
    editWord: (state, action) => {
      const item = action.payload;

      const editState = state.map((element) => {
        if (element.id === item.id) {
          const newItems = element.words.map((word) => {
            if (word.id === item.word) {
              return {
                ...word,
                ["pass"]: true,
              };
            }
            return word;
          });
          return {
            ...element,
            words: newItems,
          };
        }
        return element;
      });

      return editState;
    },
  },
});

export const { addPaquet, deletePaquet, editPaquet, editWord } =
  paquetSlice.actions;
export default paquetSlice.reducer;
