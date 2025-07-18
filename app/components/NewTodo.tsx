"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTodoMutation } from "@/lib/service/jsonPlaceholderApi";
import React, { useState } from "react";
import { toast } from "sonner";

interface todoList {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const NewTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const [createTodo, { isLoading: isCreating, error: createError }] =
    useCreateTodoMutation();

  const handleAddTodo = async () => {
    try {
      // await createTodo({
      //   title: newTodo,
      //   completed: false,
      //   userId: 1,
      // } as todoList).unwrap();
      toast("Todo added successfully!");
      setNewTodo("");
    } catch (error) {
      toast.error("Something went wrong while adding todo");
    }
  };

  return (
    <div className="bg-yellow-200 py-3 w-full shadow fixed bottom-0 left-0 px-5 flex justify-center">
      <div className="w-full md:max-w-[80%] 2xl:max-w-2xl flex items-center justify-between gap-3">
        <Input
          value={newTodo}
          className="w-full border-black placeholder:text-black"
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Type your new todo here.."
        />
        <Button
          type="button"
          onClick={handleAddTodo}
          disabled={isCreating || !newTodo}
          className="bg-yellow-500 text-black hover:text-white cursor-pointer"
        >
          {isCreating ? "Adding..." : "Add Todo"}
          Add Todo
        </Button>
      </div>
      {createError && (
        <p className="text-red-500 text-sm">Error: "Failed to add todo"</p>
      )}
    </div>
  );
};

export default NewTodo;
