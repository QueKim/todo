import style from "../TodoItem/style.module.css";
import Todo from "../../types/todo.ts";
import useTodoList from "../../stores/todo.ts";
import {useShallow} from "zustand/react/shallow";
import {useId} from "react";

const TodoContent = (props: Pick<Todo, 'id'>) => {
  const { id } = props;
  const checkboxId = useId();
  const { todo, toggleIsDone, toggleIsEditing, remove } = useTodoList(
    useShallow(({ list, toggleIsDone, toggleIsEditing, remove }) => {
      const todo = list.find((todo) => todo.id === id);

      if (!todo) throw new Error('list에 id가 없습니다.');

      return { todo, toggleIsDone, toggleIsEditing, remove };
    })
  );

  const removeTodo = () => {
    if (window.confirm('정말로 삭제할까요?')) remove(todo);
  };

  return (
    <>
      <label htmlFor={checkboxId} className={style.hidden}>{`완료${todo.isDone ? ' 취소 ' : ''}하기`}</label>
      <input id={checkboxId} type="checkbox" checked={todo.isDone} onChange={() => toggleIsDone(todo)}/>
      <p className={style.inline}>{todo.isDone ? <del>{todo.content}</del> : todo.content}</p>
      <button type="button" onClick={() => toggleIsEditing(todo)}>수정</button>
      <button type="button" onClick={removeTodo}>삭제</button>
    </>
  );
};

export default TodoContent;
