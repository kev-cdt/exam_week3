import { createSlice } from "@reduxjs/toolkit";

const savedTheme = JSON.parse(localStorage.getItem("currentTheme"));

const initialState = {
  theme: savedTheme || "light",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;