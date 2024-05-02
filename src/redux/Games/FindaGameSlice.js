import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const FindGamesByName = createAsyncThunk(
  'Games/FindGamesByName',
  async (body, thunkAPI) => {
    try {
      const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
      const headers = {
        'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
        'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
        'Content-Type': 'text/plain',
      };
      const response = await axios.post(url, body, { headers });
      const games = response.data;
      thunkAPI.dispatch(setSearchGames(games));

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

  export const FindGameByName = createAsyncThunk(
    'Games/FindGameByName',
    async (body, thunkAPI) => {
      try {
        const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
        const url2 = 'http://localhost:8080/https://api.igdb.com/v4/companies';
        const url3 = 'http://localhost:8080/https://api.igdb.com/v4/languages';
        const headers = {
          'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
          'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
          'Content-Type': 'text/plain',
        };
        const body3 = `fields name;where name ~ *"Chinese (Simplified)"* | name = "English" | name ~ *"Spanish (Spain)"*| name ~ *"French"*| name ~ *"Italian"*| name ~ *"Japanese"*
        | name ~ *"Korean"*| name ~ *"Portuguese (Portugal)"*| name ~ *"German"*; limit 20;`;
        const response3 = await axios.post(url3, body3, { headers });
        const languages = response3.data;
        console.log('idiomas:', languages);
        const response = await axios.post(url, body, { headers });
        const agame = response.data;
        const finalgame = await Promise.all(agame.map(async (game) => {
          const body2 = `fields name,published.name,developed.name,logo.image_id; where published = (${game.id}) | developed = (${game.id}); limit 5;`;
          const response2 = await axios.post(url2, body2, { headers }); 
          const companies = response2.data;
          const gamelanguages = [];
          languages.forEach(language => {
            game.language_supports.forEach(languageSupport => {
              if (languageSupport.language === language.id) {
                gamelanguages.push(language.name);
              }
            });
          });
          const uniqueGameLanguages = gamelanguages.filter((name, index) => {
            return gamelanguages.indexOf(name) === index;
          });
          return {
            ...game,
            gamelanguages:uniqueGameLanguages,
            companies,
          };
        }));
        thunkAPI.dispatch(setSearchAGame(finalgame));
      } catch (error) {
        
      }
    }
  )

export const setSearchGames = createAction('gameSlice/setSearchGames');
export const setSearchAGame = createAction('gameSlice/setSearchAGame');

const FindaGameSlice = createSlice({
  name: 'searchgames',
  initialState: {
    searchGames: [],
    searchaGame: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FindGamesByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FindGamesByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(FindGamesByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(FindGameByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FindGameByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(FindGameByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(setSearchGames, (state, action) => {
        state.searchGames = action.payload;
      })
      .addCase(setSearchAGame, (state, action) => {
        state.searchaGame = action.payload;
      })
  },
});

export default FindaGameSlice.reducer;