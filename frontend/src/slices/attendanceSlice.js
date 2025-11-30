import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const checkin = createAsyncThunk('attendance/checkin', async () => {
  const res = await API.post('/attendance/checkin');
  return res.data;
});

export const checkout = createAsyncThunk('attendance/checkout', async () => {
  const res = await API.post('/attendance/checkout');
  return res.data;
});

export const myHistory = createAsyncThunk('attendance/myHistory', async () => {
  const res = await API.get('/attendance/my-history');
  return res.data;
});

const slice = createSlice({
  name: 'attendance',
  initialState: {
    today: null,
    history: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkin.fulfilled, (state, action) => {
        state.today = action.payload;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.today = action.payload;
      })
      .addCase(myHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  }
});

export default slice.reducer;
