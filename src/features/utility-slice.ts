import { CHANNEL_TABS } from '@/constants/channel-tab';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UitilityState {
  us: {
    channelTab : string;
  };
}

// Define the initial state using that type
const initialState: UitilityState = {
  us: {
    channelTab : CHANNEL_TABS.ACTIVE,
  },
};

export const utilitySlice = createSlice({
  name: 'utility',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUtilityState: (state, action: PayloadAction<Partial<UitilityState>>) => {
      state.us = { ...state.us, ...action.payload };
    },
  },
});

export const { setUtilityState } = utilitySlice.actions;

export default utilitySlice.reducer;
