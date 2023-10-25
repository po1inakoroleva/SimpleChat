import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchInitialData from './thunk';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, messagesAdapter.addMany);
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
