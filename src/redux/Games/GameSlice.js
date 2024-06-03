import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReleases = createAsyncThunk(
  'Games/getReleases',
  async (_, { rejectWithValue }) => {
    try {
      const today = new Date();
      const halfMonthAgo = new Date(today.getFullYear(), today.getMonth(), 1);
      halfMonthAgo.setDate(halfMonthAgo.getDate() - 26);
      const startDateInSeconds = Math.floor(halfMonthAgo.getTime() / 1000);
      const endDateInSeconds = Math.floor(today.getTime() / 1000);        
      console.log('Dia 1:', startDateInSeconds, ' y segundo dia:', endDateInSeconds); 
      const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
      const body = `fields name,total_rating,first_release_date,release_dates.date,platforms.name,release_dates.human,cover.image_id; 
      where first_release_date >= ${startDateInSeconds} & first_release_date <= ${endDateInSeconds} & platforms = (167,6,130,169) & total_rating_count >= 5; 
      sort total_rating desc;
      limit 5;`;

      const headers = {
        'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
        'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
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
          const consoles = [];
          platforms.forEach(platform => {
            let consolename = null;
            if (platform.id === 3 || platform.id === 6 || platform.id === 14) {
              consolename = 'PC';
            } else if (platform.id === 49 || platform.id === 12 || platform.id === 169) {
              consolename = 'XBOX';
            } else if (platform.id === 46 || platform.id === 48 || platform.id === 167) {
              consolename = 'PLAYSTATIONS';
            }if (platform.id === 130) {
              consolename = 'SWICTH';
            }
            if (consolename) { 
              consoles.push({ consolename });
            }
          });
          releases.push({
            gameId,
            name,
            millisecondsDate,
            date,
            platforms,
            cover,
            consoles
          });
          uniqueGameIds.add(gameId);
        }
      });
      releases.forEach(platformfi => {
        platformfi.consoles = platformfi.consoles.filter((obj, index, self) =>
          index === self.findIndex((t) => (
            t.consolename === obj.consolename
          ))
        );
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
