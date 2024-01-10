import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type Todo from "../types/todo.ts";

interface TodoListStore {
  list: Todo[];
  add: (content: Todo['content']) => void;
  edit: (target: Todo, newContent: Todo['content']) => void;
  remove: (target: Todo) => void;
  toggleIsDone: (target: Todo) => void;
  toggleIsEditing: (target: Todo) => void;
}

const makeTodo = (content: Todo['content']) => ({
  content,
  id: crypto.randomUUID(),
  isDone: false,
  isEditing: false,
});

const useTodoList = create<TodoListStore>()(immer((set, get) => ({
  list: [],

  add: (content: Todo['content']) => {
    set(({ list }) => {
      list.push(makeTodo(content));
    });
  },

  remove: (target: Todo) => {
    set(({ list }) => ({ list: list.filter((todo) => todo.id !== target.id) }));
  },

  toggleIsDone: (target: Todo) => {
    const targetIndex = get().list.findIndex((todo) => todo.id === target.id);

    if (targetIndex === -1) throw new Error('list에서 id를 찾을 수 없습니다.');

    set(({ list }) => {
      list[targetIndex].isDone = !list[targetIndex].isDone;
    });
  },

  toggleIsEditing: (target: Todo) => {
    const targetIndex = get().list.findIndex((todo) => todo.id === target.id);

    if (targetIndex === -1) throw new Error('list에서 id를 찾을 수 없습니다.');

    set(({ list }) => {
      list[targetIndex].isEditing = !list[targetIndex].isEditing;
    });
  },

  edit: (target: Todo, newContent: Todo['content']) => {
    const targetIndex = get().list.findIndex((todo) => todo.id === target.id);

    if (newContent.trim().length === 0) throw new Error('todo의 content는 공백일 수 없습니다.');
    if (targetIndex === -1) throw new Error('list에서 id를 찾을 수 없습니다.');

    set(({ list }) => {
      list[targetIndex].content = newContent.trim();
    });
  },
})));

export default useTodoList;
