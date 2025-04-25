import { useNavigate } from "react-router-dom";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import "./DiaryItem.css";

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  console.log("diaryItem.jsx start");
  console.log(id);
  console.log(emotionId);
  console.log(createdDate);
  console.log(content);
  console.log("diaryItem.jsx end");
  const nav = useNavigate();

  const goDiaryPage = () => {
    nav(`/diary/${id}`);
  };

  const goEditPage = () => {
    nav(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDiaryPage}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div onClick={goDiaryPage} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={goEditPage} text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;