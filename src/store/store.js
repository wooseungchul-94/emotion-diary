// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import diaryReducer from './diarySlice';
import { initId } from '../util/idGenerator';


const storedData = JSON.parse(localStorage.getItem("diary") || "[]"  );

let maxId = 0;

storedData.forEach((item) => {
  if (Number(item.id) > maxId) {
    maxId = Number(item.id);
  }
});

initId(maxId +1);

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
  },
  preloadedState: {
    diary : storedData,
  },
});