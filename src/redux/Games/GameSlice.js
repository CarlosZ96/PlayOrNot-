import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReleases = createAsyncThunk(
  'Games/getReleases',
  async (_, { rejectWithValue }) => {
    try {
      const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
      const body = `fields name,first_release_date,release_dates.date,platforms.name,release_dates.human,cover.image_id; 
      where first_release_date >= 1709269200 & first_release_date <= 1711861200 & platforms = (167,6,130,169) & total_rating_count >= 5 & category=0; 
      sort first_release_date desc;
      limit 5;`;
      const headers = {
        'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
        'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
        'Content-Type': 'text/plain',
      };
      const response = await axios.post(url, body, { headers });
      const gameReleasesData = response.data;
      const releases = [];
      const uniqueGameIds = new Set();
      gameReleasesData.forEach(gameD => {
        const gameId = gameD.id;
        if (!uniqueGameIds.has(gameId)) {
            const millisecondsDate = gameD.first_release_date;
            const name = gameD.name;
            const platforms = gameD.platforms;
            const cover = gameD.cover.image_id;
            const release_datesa = gameD.release_dates;
            let date = null;
            release_datesa.forEach(dates => {
                if (millisecondsDate == dates.date) {
                    date = dates.human;
                }
            });
            releases.push({
                gameId,
                name,
                millisecondsDate,
                date,
                platforms,
                cover
            });
            uniqueGameIds.add(gameId);
        }
    });
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
    setReleases: (state, action) => {
      state.releases = action.payload;
    }
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

export const { setReleases } = GameSlice.actions;
export default GameSlice.reducer;
