import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Top5 = {
  id: number;
  query_type: string;
  query_value: string;
  score: number;
  created_at: string;
  updated_at: string;
};

export const top5Api = createApi({
  reducerPath: "top5Api",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "api/most-searched/",
  }),
  endpoints: (builder) => ({
    getTop5Transaction: builder.query<Top5[], null>({
      query: () => "transaction",
    }),
    getTop5Adresses: builder.query<Top5[], null>({
      query: () => "address",
    }),
  }),
});

export const { useGetTop5AdressesQuery, useGetTop5TransactionQuery } = top5Api;
