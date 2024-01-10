import './App.css';
import TodoList from "./components/TodoList/TodoList.tsx";
import TodoInput from "./components/TodoInput/TodoInput.tsx";

function App() {

  return (
    <main>
      <TodoInput />
      <TodoList />
    </main>
  );
}

export default App;
