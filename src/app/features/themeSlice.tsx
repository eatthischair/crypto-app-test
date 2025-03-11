import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nightMode: true,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeSwitch: (state) => {
      state.nightMode = !state.nightMode;
    },
  },
});

// Action creators are generated for each case reducer function
export const { themeSwitch } = themeSlice.actions;

export default themeSlice.reducer;
