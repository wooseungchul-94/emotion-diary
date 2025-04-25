import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";
import usePageTilte from "../hooks/usePageTitle";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  const { curDiaryItem, isLoading } = useDiary(params.id);


  console.log("💡 curDiaryItem 값:", curDiaryItem);
  console.log(curDiaryItem);
  console.log("🧩 emotionId:", curDiaryItem?.emotionId);
  console.log("🧩 content:", curDiaryItem?.content);


  usePageTilte(`${params.id}번 일기`);

  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />
        }
        rightChild={
          <Button
            onClick={() => nav(`/edit/${params.id}`)}
            text={"수정하기"}
          />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;