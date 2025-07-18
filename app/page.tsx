// import Counter from "./components/Counter";

import { Suspense } from "react";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoLists";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full min-h-screen grid justify-center pt-10 pb-32 bg-amber-50 relative">
        <div className="2xl:max-w-2xl">
          <TodoList />
          <NewTodo />
        </div>
      </div>
    </Suspense>
  );
}
