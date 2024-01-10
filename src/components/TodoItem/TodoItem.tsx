import  Todo from '../../types/todo.ts';
import {memo} from "react";

import TodoContent from "../TodoContent/TodoContent.tsx";
import TodoEditor from "../TodoEditor/TodoEditor.tsx";
import useTodoList from "../../stores/todo.ts";

const TodoItem = memo((props: Pick<Todo, 'id'>) => {
  const { id } = props;
  const isEditing = useTodoList(({ list }) => {
    const todo = list.find((todo) => todo.id === id);

    if (!todo) throw new Error('list에 id가 없습니다.');

    return todo.isEditing;
  });

  return (
    <li>
      {isEditing ? <TodoEditor id={id} /> : <TodoContent id={id} />}
    </li>
  );
});

export default TodoItem;