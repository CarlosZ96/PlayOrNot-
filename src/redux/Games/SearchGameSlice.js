import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const SearchGameByName = createAsyncThunk(
  'Games/SearchGameByName',
  async (body, thunkAPI) => {
    try {
      const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
      const url2 = 'http://localhost:8080/https://api.igdb.com/v4/companies';
      const url3 = 'http://localhost:8080/https://api.igdb.com/v4/languages';
      const headers = {
        'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
        'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
        'Content-Type': 'text/plain',
      };
      const response = await axios.post(url, body, { headers });
      const agame = response.data;
      const body3 = `fields name;where name ~ *"Chinese (Simplified)"* | name = "English" | name ~ *"Spanish (Spain)"*| name ~ *"French"*| name ~ *"Italian"*| name ~ *"Japanese"*
      | name ~ *"Korean"*| name ~ *"Portuguese (Portugal)"*| name ~ *"German"*; limit 20;`;
      const response3 = await axios.post(url3, body3, { headers });
      const languages = response3.data;
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
      return finalgame;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const gameSlice = createSlice({
  name: 'searchgames',
  initialState: {
    searchgames: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchGameByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SearchGameByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchgames = action.payload;
      })
      .addCase(SearchGameByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default gameSlice.reducer;
