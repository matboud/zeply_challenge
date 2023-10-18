"use client";
import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "./services/searchApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { top5Api } from "./services/top5Api";

export const store = configureStore({
  reducer: {
    [searchApi.reducerPath]: searchApi.reducer,
    [top5Api.reducerPath]: top5Api.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([searchApi.middleware, top5Api.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
