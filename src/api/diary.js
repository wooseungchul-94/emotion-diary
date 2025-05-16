import axios from "axios";

export const fetchDiaryList = async ()  => {
    const res = await axios.get("http://localhost:8080/api/diary/getList");
    return res.data;
};

export const createDiaryApi = async (diaryData) => {
  const response = await axios.post("http://localhost:8080/api/diary/insertDiary", diaryData);
  return response.data;
};

export const updateDiaryApi = async (diaryData) => {
  const response = await axios.post("http://localhost:8080/api/diary/updateDiary", diaryData);
  return response.data;
};

export const deleteDiaryApi = async (diaryData) => {
  const response = await axios.post("http://localhost:8080/api/diary/deleteDiary", diaryData);
  return response.data;
}