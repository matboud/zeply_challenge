"use client";
import React, { FC } from "react";
import {
  useGetTop5AdressesQuery,
  useGetTop5TransactionQuery,
} from "@/redux/services/top5Api";

interface DataItem {
  query_value: string;
}

const Top5: FC = () => {
  const {
    isLoading: isLoadingAddresses,
    data: dataAddresses,
    isFetching: isFetchingAddresses,
  } = useGetTop5AdressesQuery(null);

  const {
    isLoading: isLoadingTransactions,
    data: dataTransactions,
    isFetching: isFetchingTransactions,
  } = useGetTop5TransactionQuery(null);

  const combinedData: DataItem[] = (dataTransactions || [])
    .concat(dataAddresses || [])
    .slice(0, 5);

  return (
    <div className="absolute px-6 pb-4 text-sm  top-full left-0 backdrop-blur-lg w-full bg-gray-900/60 rounded-md z-10 text-gray-200">
      <div className="w-full text-gray-400 border-b-gray-400 border-b-[1px] mb-5 pb-2 pt-3">
        Top 5 Searched Addresses: {isLoadingTransactions && "Loading"}
      </div>
      {isLoadingTransactions ||
      isLoadingAddresses ||
      isFetchingTransactions ||
      isFetchingAddresses ? (
        <div />
      ) : (
        <ul>
          {combinedData?.map((item, index) => (
            <li key={index} className="px-2 py-3  break-words">
              {item.query_value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Top5;
