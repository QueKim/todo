import Todo from "../../types/todo.ts";
import useTodoList from "../../stores/todo.ts";
import {useShallow} from "zustand/react/shallow";
import {ChangeEventHandler, MouseEventHandler, useState} from "react";
import {TODO_CONTENT_MAX_LENGTH} from "../../constants/todo.ts";

const TodoEditor = (props: Pick<Todo, 'id'>) => {
  const { id } = props;

  const { todo, toggleIsEditing, edit } = useTodoList(
    useShallow(({ list, toggleIsEditing, edit }) => {
      const todo = list.find((todo) => todo.id === id);

      if (!todo) throw new Error('list에 id가 없습니다.');

      return { todo, toggleIsEditing, edit };
    })
  );

  const [value, setValue] = useState(todo.content);

  const setEditingValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value.slice(0, TODO_CONTENT_MAX_LENGTH));
  };

  const editTodo: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (value.trim().length === 0) return;

    edit(todo, value);
    toggleIsEditing(todo);
  };

  const cancelEdit: MouseEventHandler<HTMLButtonElement> = () => {
    toggleIsEditing(todo);
  };

  return (
    <>
      <input type="text" value={value} onChange={setEditingValue}/>
      <button type="button" onClick={editTodo}>완료</button>
      <button type="button" onClick={cancelEdit}>취소</button>
    </>
  );
};

export default TodoEditor;
