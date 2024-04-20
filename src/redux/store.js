import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './Games/GameSlice';
import gamefReducer from './Games/SearchGameSlice';

const store = configureStore({
  reducer: {
    games: gameReducer,
    searchgames: gamefReducer,
  },
});

export default store;