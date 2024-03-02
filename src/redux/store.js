import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './Games/GameSlice';

const rootReducer = {
  Games: gameReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;