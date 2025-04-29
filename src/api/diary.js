import axios from "axios";

export const fetchDiaryList = async ()  => {
    const res = await axios.get("http://localhost:8080/api/diary/getList");
    return res.data;
};