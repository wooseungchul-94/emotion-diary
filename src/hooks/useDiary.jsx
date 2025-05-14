import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useDiary = (id) => {
  const data = useSelector((state) => state.diary.diaryList);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  
  useEffect(() => {
    
    if (!data || data.length === 0 ) return;
    
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    
    setCurDiaryItem(currentDiaryItem);
    setIsLoading(false);
    
  }, [id, data]);
  
  useEffect(() => {
    if (!isLoading && !curDiaryItem){
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
  }, [isLoading, curDiaryItem])

  return { curDiaryItem, isLoading };
};

export default useDiary;