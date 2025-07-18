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
} from "@/components/ui/pagination";
import { useGetTodosQuery } from "@/lib/service/jsonPlaceholderApi";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setPage, setRow } from "@/lib/features/todoSlice";
import { Button } from "@/components/ui/button";
import TodoItem from "./TodoItem";

export interface todoList {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [startPage, setStartPage] = useState<number>(1);
  const { page, row } = useSelector((state: RootState) => state.todoSlice);
  const dispatch = useDispatch();
  const { data, isLoading, error, isFetching } = useGetTodosQuery({
    _limit: row,
    _page: page,
  });

  const maxTodo = 200;
  const items = row || 10; // Default to 10 if row is not set
  const totalPages = Math.ceil(maxTodo / items);
  const windowSize = 4;

  const handleNextWindow = () => {
    const nextStart = startPage + windowSize;
    if (nextStart <= totalPages) {
      setStartPage(nextStart);
    }
  };

  const handlePrevWindow = () => {
    const prevStart = startPage - windowSize;
    if (prevStart >= 1) {
      setStartPage(prevStart);
    }
  };

  const visiblePages = Array.from(
    { length: Math.min(windowSize, totalPages - startPage + 1) },
    (_, i) => startPage + i
  );

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
            <TodoItem item={item} key={key} />
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
              <PaginationItem onClick={handlePrevWindow}>
                <ChevronLeft />
              </PaginationItem>
              {visiblePages.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <Button
                    size="icon"
                    variant="outline"
                    className={`cursor-pointer bg-transparent hover:bg-yellow-200 ${
                      pageNum === page
                        ? "bg-yellow-400 text-black font-bold border-yellow-500"
                        : ""
                    }`}
                    onClick={() => dispatch(setPage(pageNum))}
                  >
                    {pageNum}
                  </Button>
                </PaginationItem>
              ))}
              {startPage + windowSize <= totalPages && (
                <PaginationItem>
                  <PaginationEllipsis
                    onClick={handleNextWindow}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
              <PaginationItem onClick={handleNextWindow}>
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
