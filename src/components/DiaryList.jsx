import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({data}) => {

  
  const nav = useNavigate();
  
  const [sortType, setSortType] = useState("latest");
  
  const onChangSortType = (e) => {
    setSortType(e.target.value);
  }
  
  const getSortedDate = () => {
    return data.toSorted((a,b) => {
      if(sortType === "oldest") {
        return a.createdDate - b.createdDate;
      } else {
        return b.createdDate - a.createdDate;
      }
    });
  };
  
  const sortedData = getSortedDate();

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const start = (currentPage -1) * perPage;
  const end = start + perPage;
  const pagedList = sortedData.slice(start, end);

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button onClick={()=>nav("/new")} text={"새 일기 쓰기"} type={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          // <DiaryItem data = {diary} />
          <DiaryItem key={item.id} {...item} />
        ))}
        {/* {sortedData.map((item)=> <DiaryItem key={item.id} {...item}/>)} */}
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DiaryList;