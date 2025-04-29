import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../util/idGenerator';

const diarySlice = createSlice({
  name: 'diary',
  initialState: [],
  reducers: {
    initDiary: (state, action) => {
      return action.payload;
    },
    createDiary: (state, action) => {
      const { createdDate, emotionId, content } = action.payload;
      state.unshift({
        id: generateId(),
        createdDate,
        emotionId,
        content,
      });
    },
    updateDiary: (state, action) => {
      console.log("수정할 ID:", action.payload);
      const { id, createdDate, emotionId, content } = action.payload;
      const target = state.find((d) => String(d.id) === String(id));
      if (target) {
        target.createdDate = createdDate;
        target.emotionId = emotionId;
        target.content = content;
      }
    },
    deleteDiary: (state, action) => {
      console.log("삭제할 ID:", action.payload);
      return state.filter((d) =>String(d.id) !== String(action.payload) );
    },
  },
});

export const { initDiary, createDiary, updateDiary, deleteDiary } = diarySlice.actions;
export default diarySlice.reducer;
