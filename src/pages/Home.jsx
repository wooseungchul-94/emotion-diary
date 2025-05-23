import { useState, useContext } from "react";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTilte from "../hooks/usePageTitle";
import TestHello from "../components/TestHello";
import { useSelector } from "react-redux";

const getMonthlyData = (pivotDate, data) =>{

  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
  
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1, 0, 23, 59, 59).getTime();
  return data?.diaryList?.filter((item) =>
          beginTime <= item.createdDate && item.createdDate <= endTime)
}

const Home = () => {

  // const data = useContext(DiaryStateContext);
  const data = useSelector((state) => state.diary);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;


  const monthlyData = getMonthlyData(pivotDate, data);
  usePageTilte("감정 일기장");

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() +1));
  };
  
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() -1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <TestHello />
        <DiaryList data = {monthlyData} />
    </div>
  );
};

export default Home;