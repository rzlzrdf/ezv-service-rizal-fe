// import Counter from "./components/Counter";

import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoLists";

export default function Home() {
  return (
    <div className="w-full min-h-screen grid justify-center pt-10 pb-32 bg-amber-50 relative">
      <div className="2xl:max-w-2xl">
        <TodoList />
        <NewTodo />
      </div>
    </div>
  );
}
