import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReleases = createAsyncThunk(
  'Games/getReleases',
  async (_, { rejectWithValue }) => {
    try {
      const url = 'http://localhost:8080/https://api.igdb.com/v4/release_dates/';
      const body = `fields game,date,human; where game.platforms = {169,130,167,6} & date > 1704133725000 & date < 1710872925000; sort date desc;limit 20;`;
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
        const gameId = gameD.game;
        if (!uniqueGameIds.has(gameId)) {
          const millisecondsDate = gameD.date;
          const date = gameD.human;
          releases.push({
            gameId,
            millisecondsDate,
            date
          });
          uniqueGameIds.add(gameId);
        }
      });

      const url2 = 'http://localhost:8080/https://api.igdb.com/v4/games/';
      const url3 = 'http://localhost:8080/https://api.igdb.com/v4/covers';
      const ReleasesFinal = [];
      for (const gameD of releases) {
        try {
          const body2 = `fields total_rating,name,artworks,cover,game_modes,platforms,screenshots,similar_games,summary; where id=${gameD.gameId};`;
          const body3 = `fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game=${gameD.gameId}; limit 6;`;
          const response2 = await axios.post(url2, body2, { headers });
          const response3 = await axios.post(url3, body3, { headers });
          const gameReleasesData2 = response2.data;
          console.log(gameReleasesData2);
          const screenshotsr = response3.data;
          gameReleasesData2.forEach(gameD2 => {
            const id = gameD.gameId;
            const date = gameD.date;
            const millisecondsDate = gameD.millisecondsDate;
            const name = gameD2.name;
            const artworks = gameD2.artworks[0];
            const cover = gameD2.cover;
            const game_modes = gameD2.game_modes;
            const platformsIDs = gameD2.platforms;
            const rating = gameD2.total_rating;
            const screenshots = gameD2.screenshots;
            const similar_gamesIDs = gameD2.similar_games;
            const description = gameD2.summary;
            const url = screenshotsr[0].url;
            ReleasesFinal.push({
              id,
              date,
              millisecondsDate,
              name,
              artworks,
              cover,
              game_modes,
              platformsIDs,
              rating,
              screenshots,
              similar_gamesIDs,
              description,
              url
            });
          });
        } catch (error) {

        }
      }
      console.log('Despues de cargar datos:', ReleasesFinal);
      return ReleasesFinal;
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
