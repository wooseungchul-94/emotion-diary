                                                                                                   import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import UseDiary from "../hooks/useDiary";
import usePageTilte from "../hooks/usePageTitle";
import { useDispatch } from "react-redux";
import { deleteDiary, updateDiary } from "../store/diarySlice";
import { updateDiaryApi, deleteDiaryApi } from "../api/diary";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  
  
  const {curDiaryItem, isLoding } = UseDiary(params.id);
  usePageTilte(`${params.id}번 일기 수정`);
  
  
  
  // const onClickDelete2 = () => {
    //   if (
      //     window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")
      //   ) {
        //     // 일기 삭제 로직
        //     dispatch(deleteDiary(params.id));
        //     nav("/", { replace: true });
        
        //   }
        // };

  const onClickDelete = async () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      try {
        const response = await deleteDiaryApi({
          id: params.id,
        });
    
        dispatch(deleteDiary(response)); 
    
        nav("/", { replace: true });
      } catch (err) {
        alert("일기 삭제 실패");
        console.error(err);
      }
    }
  };

  const onSubmit = async (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      try {
        const response = await updateDiaryApi({
          id: params.id,
          createDate: input.createdDate.getTime(),
          emotionId: input.emotionId,
          content: input.content
        });
    
        dispatch(updateDiary(response)); 
    
        nav("/", { replace: true });
      } catch (err) {
        alert("일기 수정 실패");
        console.error(err);
      }
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