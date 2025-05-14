import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import Button from "./components/Button";
import Header from "./components/Header";
import { Provider, useDispatch } from "react-redux";
// import { store } from "./store/store";
import { initDiary } from "./store/diarySlice"

import { getEmotionImage } from "./util/get-emotion-image";
import { fetchDiaryList } from "./api/diary";
import SignaturePad from "./components/SignaturePad";

 
function reducer(state, action) {

  let nextState;

  switch(action.type){
    case "INIT":
      return action.data;
    case 'CREATE': { 
      nextState = [action.data ,...state] 
      break;
    }
    case "UPDATE":
      {nextState = state.map((item) =>
        String(item.id) === String(action.data.id)
          ? action.data
          : item
      );
      break
    }
    case 'DELETE':{
        nextState = state.filter((item) => item.id !== action.id);
        break;
      }
    default:
      return state;
  }

  // localStorage.setItem("diary",JSON.stringify(nextState));
  return nextState;
}

function App() {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchDiaryList();
        dispatch(initDiary(res.data.diaryList));
      } catch (err) {
        console.error("데이터 로딩 실패", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  if (isLoading) return <div>로딩중입니다...</div>;

  return (
    <>
      <div style={{ padding: 20 }}>
        <button onClick={() => setShowModal(true)}>서명창 열기</button>

        {showModal && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle}>
              <SignaturePad />
              <button
                onClick={() => setShowModal(false)}
                style={{ marginTop: 10 }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;

// 간단한 모달 스타일
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};