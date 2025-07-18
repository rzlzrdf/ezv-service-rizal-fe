import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonPlaceholderApi = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<any[], { _page: number; _limit: number }>({
      query: ({ _page, _limit }) => `todos?_page=${_page}&_limit=${_limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todos" as const, id })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
    }),

    createTodo: builder.mutation({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: newTodo,
      }),
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          jsonPlaceholderApi.util.updateQueryData(
            "getTodos",
            { _page: 1, _limit: 10 }, 
            (draft) => {
              draft.unshift({
                ...newTodo,
                id: Math.random(),
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // rollback on error
        }
      },

      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    editTodo: builder.mutation({
      query: (currTodo) => ({
        url: "todos",
        method: "PUT",
        body: currTodo,
      }),
      async onQueryStarted(currTodo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          jsonPlaceholderApi.util.updateQueryData(
            "getTodos",
            { _page: 1, _limit: 10 }, 
            (draft) => {
              draft.unshift({
                ...currTodo,
                id: Math.random(),
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // rollback on error
        }
      },

      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useEditTodoMutation } = jsonPlaceholderApi;
