import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReleases = createAsyncThunk(
  'Games/getReleases',
  async (_, { rejectWithValue }) => {
    try {
      const releases = [];
      const currentDate = new Date('2024-03-10');
      for (let id = 100000; id <= 864300; id++) {
        try {
          const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=f40cb22a32854188aa4cbf6538242b50`);
          const agame = response.data;
          const idg = agame.id;
          const release_date = agame.released;
          const gameReleaseDate = new Date(agame.released); 
          if (gameReleaseDate < currentDate && gameReleaseDate.getFullYear() === 2024) {
            releases.push({
              idg,
              release_date,
            }); 
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            continue;
          }
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

export default GameSlice.reducer;
