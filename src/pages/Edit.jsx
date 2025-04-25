                                                                                                   import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import UseDiary from "../hooks/useDiary";
import usePageTilte from "../hooks/usePageTitle";
import { useDispatch } from "react-redux";
import { deleteDiary, updateDiary } from "../store/diarySlice";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  // const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const dispatch = useDispatch();
  

  const {curDiaryItem, isLoding } = UseDiary(params.id);
  usePageTilte(`${params.id}번 일기 수정`);

  
  const onClickDelete = () => {
    if (
      window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")
    ) {
      // 일기 삭제 로직
      // onDelete(params.id);
      // nav("/", { replace: true });
      dispatch(deleteDiary(params.id));
      nav("/", { replace: true });
      
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      // onUpdate(
      //   params.id,
      //   input.createdDate.getTime(),
      //   input.emotionId,
      //   input.content
      // );
      dispatch(
        updateDiary({
        id: params.id,
        createdDate: input.createdDate.getTime(),
        emotionId: input.emotionId,
        content: input.content 
        })
      );

      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />
        }
        rightChild={
          <Button
            onClick={onClickDelete}
            text={"삭제하기"}
            type={"NEGATIVE"}
          />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;