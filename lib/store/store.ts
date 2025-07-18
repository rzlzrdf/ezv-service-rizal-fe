import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todoSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jsonPlaceholderApi } from "../service/jsonPlaceholderApi";

export const store = () => {
  return configureStore({
    reducer: {
      [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer,
      todoSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(jsonPlaceholderApi.middleware),
  });
};

setupListeners(store)

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
