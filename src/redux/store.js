import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './Games/GameSlice';

const store = configureStore({
  reducer: {
    games: gameReducer,
  },
});

export default store;