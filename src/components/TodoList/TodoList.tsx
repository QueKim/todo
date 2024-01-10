import TodoItem from "../TodoItem/TodoItem.tsx";
import useTodoList from "../../stores/todo.ts";

const TodoList = () => {
  const todoList = useTodoList(({ list }) => list);
  const sortedTodoList = [...todoList].sort((one, another) =>
    one.isDone && !another.isDone ? 1 : -1
  );

  const isTodoListEmpty = sortedTodoList.length < 1;

  if (isTodoListEmpty) {
    return (
      <>
        <h3>목록</h3>
        <p>등록된 할 일이 없어요ㅠㅠ</p>
      </>
    );
  }

  return (
    <>
      <h3>목록</h3>
      <ul>
        {sortedTodoList.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} />
        ))}
      </ul>
    </>
  )
};

export default TodoList;
