import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './Games/GameSlice';
import gamefReducer from './Games/FindaGameSlice';

const store = configureStore({
  reducer: {
    games: gameReducer,
    findgames: gamefReducer,
  },
});

export default store;