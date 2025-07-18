"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { todoList } from "./TodoLists";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEditTodoMutation } from "@/lib/service/jsonPlaceholderApi";
import Link from "next/link";

type Props = {
  item: todoList;
};

const TodoItem = ({ item }: Props) => {
  const [checked, setChecked] = useState<boolean>(item.completed);
  const [editTodo] =
    useEditTodoMutation();

  const handleCheckTodo = async (checked: boolean) => {
    try {
      await editTodo({
        title: item.title,
        completed: checked,
        userId: item.userId,
      } as todoList).unwrap();
      toast("Todo changed successfully!");
      setChecked(checked); // Toggle checked state
    } catch (error) {
      toast.error("Something went wrong while changing todo");
    }
  };
  return (
    <div className="w-full text-base px-3 pt-1 pb-2 border-b line-clamp-1 border-yellow-500 hover:bg-yellow-200 duration-300 flex justify-between items-center gap-4">
      <div className="flex items-center gap-1">
        <Checkbox
          checked={checked}
          onCheckedChange={(e) => handleCheckTodo(!!e)}
        />
        <Link href={`/${item.id}`} className={cn(checked && "line-through")}>{item.title}</Link>
      </div>
      <Button variant={"ghost"} size={"icon"} className="hover:bg-yellow-300">
        <Edit className="cursor-pointer" size={"14"} />
      </Button>
    </div>
  );
};

export default TodoItem;
