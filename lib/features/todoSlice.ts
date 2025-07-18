import { todoList } from "@/app/components/TodoLists";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TodoState {
  todo: todoList;
  page: number;
  row: number;
}

export const initialState: TodoState = {
  todo: {
    completed: false,
    id: 0,
    title: "",
    userId: 0,
  },
  page: 1,
  row: 10,
};

export const todoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    postTodo: (state, action: PayloadAction<todoList>) => {
      switch (action.type) {
        case "add":
          state.todo = action.payload;
          break;
        case "edit":
          state.todo = action.payload;
          break;

        default:
          break;
      }
    },
    checklistTodo: (state) => {
      state.page -= 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRow: (state, action: PayloadAction<number>) => {
      state.row = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { postTodo, checklistTodo, setPage, setRow } = todoSlice.actions;

export default todoSlice.reducer;
