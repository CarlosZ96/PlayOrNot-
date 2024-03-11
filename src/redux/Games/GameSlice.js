import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReleases = createAsyncThunk(
  'Games/getReleases',
  async (_, { rejectWithValue }) => {
    try {
      const releases = [];
      const Rkall = []; 
      for (let id = 1; id <= 864000; id++) {
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=f40cb22a32854188aa4cbf6538242b50`);
        const agame = response.data;       
        if (agame.metacritic >= 80) {
          releases.push(response.data);
        }
      }
      console.log(releases);
      return releases;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const GameSlice = createSlice({
  name: 'games',
  initialState: {
    releases: [],
    apiGames: [],
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
