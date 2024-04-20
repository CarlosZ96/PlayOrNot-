import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const SearchGameByName = createAsyncThunk(
  'Games/SearchGameByName',
  async (gameName, thunkAPI) => {
    try {
      const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
      const headers = {
        'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
        'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
        'Content-Type': 'text/plain',
      };
      const body = `fields name,genres.name,cover.image_id,total_rating,total_rating_count,
      release_dates.human,artworks.image_id; 
      where name ~ *"${gameName}"* & category=0; sort total_rating_count desc; limit 1;`;
      const response = await axios.post(url, body, { headers });
      return response.data;
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
        state.games = action.payload;
      })
      .addCase(SearchGameByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default gameSlice.reducer;
