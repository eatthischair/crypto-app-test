import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exchangeRates: {},
  isHydrated: false,
};

export const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    exchangeRatesSwitch: (state, action) => {
      state.exchangeRates = action.payload;
      state.isHydrated = true;
    },
  },
});

// Action creators are generated for each case reducer function
// export const  themeSlice.reducer;

// Action creators are generated for each case reducer function
export const { exchangeRatesSwitch } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
