import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

const userId = JSON.parse(localStorage.getItem('userId'));

export default createAsyncThunk('data/fetchInitialData', async () => {
  const response = await axios.get(routes.data(), {
    headers: {
      Authorization: `Bearer ${userId.token}`,
    },
  });
  return response.data;
});
