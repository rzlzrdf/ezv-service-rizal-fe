"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface todoList {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const NewTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  return (
    <div className="bg-yellow-200 py-3 w-full shadow fixed bottom-0 left-0 px-5 flex justify-center">
      <div className="w-full md:max-w-[80%] 2xl:max-w-2xl flex items-center justify-between gap-3">
        <Input
          value={newTodo}
          className="w-full border-black placeholder:text-black"
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Type your new todo here.."
        />
        <Button className="bg-yellow-500 text-black hover:text-white cursor-pointer">
          Add Todo
        </Button>
      </div>
    </div>
  );
};

export default NewTodo;
