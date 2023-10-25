import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchInitalData from './thunk';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitalData.fulfilled, (state, { payload }) => {
      channelsAdapter.setAll(state, payload.channels);
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

const selectors = channelsAdapter.getSelectors((state) => state.channels);
const customSelectors = {
  selectAllChannels: selectors.selectAll,
  selectCurrentChannel: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectById(state, currentChannelId);
  },
};

export { customSelectors as selectors };
export default channelsSlice.reducer;
