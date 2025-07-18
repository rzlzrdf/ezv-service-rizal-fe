import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonPlaceholderApi = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getTodos:builder.query<any[], { _page: number; _limit: number }>({
       query: ({ _page, _limit }) => `todos?_page=${_page}&_limit=${_limit}`,
    }),
    createTodo: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation } = jsonPlaceholderApi;
