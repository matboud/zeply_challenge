import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Search = {
  transactionHash: string;
  receivedTime: string;
  status: string;
  size: number;
  numberOfConfirmation: number;
  totalBtcInput: any;
  totalBtcOutput: any;
  totalFees: any;
};

export const searchApi = createApi({
  reducerPath: "searchApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "api/",
  }),
  endpoints: (builder) => ({
    getSearchData: builder.query<Search, { type: any; hash: any }>({
      query: ({ type, hash }) => type && hash && `${type + "/" + hash}`,
    }),
  }),
});

export const { useGetSearchDataQuery } = searchApi;
