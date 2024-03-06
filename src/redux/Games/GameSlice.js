/* eslint-disable prefer-destructuring */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
  'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm'
};

const requestBody = {
  fields: '*',
  where: 'id = 1281242'
};

export const getReleases = createAsyncThunk(
  'Games/getReleases',
  async (_, { rejectWithValue }) => {
    try { 
      const response = await axios.post('https://api.igdb.com/v4/games', requestBody, { headers });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const GameSlice = createSlice({
  name: 'games',
  initialState: {
    releases: [],
    status: 'idle',
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReleases.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReleases.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.releases = action.payload;
      })
      .addCase(getReleases.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { response } = GameSlice.actions;
export default GameSlice.reducer;
