import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReleases = createAsyncThunk(
  'Games/getReleases',
  async (_, { rejectWithValue }) => {
    try {
      const url = 'http://localhost:8080/https://api.igdb.com/v4/release_dates/';
      const body = `fields game,date,human; where game.platforms = {169,130,167} & date < 1710378000; sort date desc;limit 11;`;
      const headers = {
        'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
        'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
        'Content-Type': 'text/plain',
      };
      const response = await axios.post(url, body, { headers });
      const gameReleasesData = await response.json();
      const releases = [];
      gameReleasesData.forEach(gameD => {
      const gameId = gameD.game;
      const millisecondsDate = gameD.date;
      const date = gameD.human;
      releases.push(
        {
          gameId,
          millisecondsDate,
          date
        },
      );
      });
      console.log(releases);
      const url2 = 'http://localhost:8080/https://api.igdb.com/v4/games/';
      const body2 = 'fields id,name,artworks,cover,game_modes,platforms,rating,screenshots,similar_games,summary,videos; where id=230369;';
      const response2 = await axios.post(url2, body2, { headers });
      console.log(response2);
      return gameReleasesData;
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
