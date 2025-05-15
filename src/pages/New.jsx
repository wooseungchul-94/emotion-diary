import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import usePageTilte from "../hooks/usePageTitle";
import { useDispatch } from "react-redux";
import { createDiary } from "../store/diarySlice";
import { createDiaryApi } from "../api/diary";

const New = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();

  usePageTilte("새 일기 쓰기");

const onSubmit = async (input) => {
  try {
    const response = await createDiaryApi({
      createDate: input.createdDate.getTime(),
      emotionId: input.emotionId,
      content: input.content
    });

    dispatch(createDiary(response)); 

    nav("/", { replace: true });
  } catch (err) {
    alert("일기 저장 실패");
    console.error(err);
  }
};

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;