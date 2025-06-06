import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currency: 'usd',
  isHydrated: false,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    currencySwitch: (state, action) => {
      state.currency = action.payload;
      state.isHydrated = true;
    },
  },
});

// Action creators are generated for each case reducer function
// export const  themeSlice.reducer;

// Action creators are generated for each case reducer function
export const { currencySwitch } = currencySlice.actions;
export default currencySlice.reducer;
