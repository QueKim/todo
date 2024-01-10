import {ChangeEventHandler, useId, useState} from "react";
import useTodoList from "../../stores/todo.ts";
import {TODO_CONTENT_INITIAL, TODO_CONTENT_MAX_LENGTH} from "../../constants/todo.ts";

const TodoInput = () => {
  const [value, setValue] = useState(TODO_CONTENT_INITIAL);
  const inputId = useId();
  const add = useTodoList(({ add }) => add);

  const setContent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value.slice(0, TODO_CONTENT_MAX_LENGTH));
  };

  const addTodo = () => {
    if (value.trim().length === 0) return;
    add(value.trim());
    setValue(TODO_CONTENT_INITIAL);
  };

  return (
    <>
      <label htmlFor={inputId}>할 일 입력</label>
      <input id={inputId} type="text" value={value} onChange={setContent}/>
      <button type="button" onClick={addTodo}>추가</button>
    </>
  );
}

export default TodoInput;