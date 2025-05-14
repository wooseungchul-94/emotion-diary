import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import usePageTilte from "../hooks/usePageTitle";
import { useDispatch } from "react-redux";
import { createDiary } from "../store/diarySlice";

const New = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();

  usePageTilte("새 일기 쓰기");

  const onSubmit = (input) => {
    // onCreate(
    //   input.createdDate.getTime(),
    //   input.emotionId,
    //   input.content
    // );
    dispatch(createDiary({
        createdDate: input.createdDate.getTime(),
        emotionId: input.emotionId,
        content: input.content
    }))

    nav("/", { replace: true });
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