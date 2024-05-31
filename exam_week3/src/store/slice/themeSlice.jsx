import { createSlice } from "@reduxjs/toolkit";

const getThemeFromLocalStorage = () => {
  try {
    const savedTheme = localStorage.getItem("currentTheme");

    if (savedTheme === null) {
      return "light";
    }

    return JSON.parse(savedTheme);
  } catch (error) {
    console.error('Error retrieving Theme from localStorage:', error);

    return "light";
  }
};

const initialState = {
  theme: getThemeFromLocalStorage(),

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