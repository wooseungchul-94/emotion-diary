import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useDiary = (id) => {
  // const data = useContext(DiaryStateContext);
  const data = useSelector((state) => state.diary);
  console.log("useDiary.jsx ======START=====");
  console.log(data);
  console.log("useDiary.jsx ====== E N D======");
  const [curDiaryItem, setCurDiaryItem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  
  useEffect(() => {
    
    console.log("useEffect ==== 1 ====");
    console.log(data);
    if (!data || data.length === 0 ) return;
    
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    
    setCurDiaryItem(currentDiaryItem);
    setIsLoading(false);
    
  }, [id, data]);
  
  useEffect(() => {
    console.log("useEffect ==== 2 ====");
    console.log(data);
    if (!isLoading && !curDiaryItem){
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
  }, [isLoading, curDiaryItem])

  return { curDiaryItem, isLoading };
};

export default useDiary;