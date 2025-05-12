import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  test: 'usd',
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    testSwitch: (state, action) => {
      state.test = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const  themeSlice.reducer;

// Action creators are generated for each case reducer function
export const { testSwitch } = testSlice.actions;
export default testSlice.reducer;
