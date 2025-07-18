"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useGetTodosQuery } from "@/lib/service/jsonPlaceholderApi";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setPage, setRow } from "@/lib/features/todoSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export interface todoList {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const { page, row } = useSelector((state: RootState) => state.todoSlice);
  const dispatch = useDispatch();
  const { data, isLoading, error, isFetching } = useGetTodosQuery({
    _limit: row,
    _page: page,
  });

  const maxTodo = 200;
  const pager = maxTodo / row;

  if (isLoading)
    return (
      <div className="min-h-screen w-full flex justify-center items-center gap-3">
        <Loader className="animate-spin" />
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen w-full ">
        <h1 className="text-4xl font-bold">Error</h1>
      </div>
    );
  return (
    <>
      <div className="w-full bg-yellow-100 p-3 rounded-xl">
        {isFetching ? (
          <div className="min-h-[60svh] grid place-content-center">
            <Loader />
          </div>
        ) : data ? (
          data.map((item: todoList, key: React.Key) => (
            <div
              className="text-base px-3 pt-1 pb-2 border-b line-clamp-1 border-yellow-500 hover:bg-yellow-200 duration-300 flex gap-2 items-center"
              key={key}
            >
              <Checkbox checked={item.completed} onCheckedChange={(e)=>console.log(!!e)} />
              <p className={cn(item.completed && "line-through")}>
                {item.title}
              </p>
            </div>
          ))
        ) : (
          <>No Data</>
        )}
      </div>
      <div className="flex w-full items-center justify-between my-5">
        <div className="h-[50px] w-full md:w-1/2 flex items-center gap-1">
          <Select
            value={String(row)}
            onValueChange={(e) => dispatch(setRow(Number(e)))}
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm">Items/page</p>
        </div>
        <div className="h-[50px] w-full md:w-1/2 flex items-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <ChevronLeft />
              </PaginationItem>
              {Array.from({ length: pager }).map(
                (_page, index: number) =>
                  index < 4 && (
                    <PaginationItem key={index}>
                      {/* <PaginationLink href={`?page=${index + 1}`}>
                        {index + 1}
                      </PaginationLink> */}
                      <Button
                        size={"icon"}
                        onClick={() => dispatch(setPage(index + 1))}
                      >
                        {index + 1}
                      </Button>
                    </PaginationItem>
                  )
              )}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <ChevronRight />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default TodoList;
