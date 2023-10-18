"use client";
import React from "react";
import { useGetSearchDataQuery } from "@/redux/services/searchApi";

interface CardProps {
  type: string | null;
  hash: string | null;
}

const Card: React.FC<CardProps> = ({ type, hash }) => {
  let isLoading: boolean = false;
  let data: any = null;
  let isFetching: boolean = false;
  let error: any = null;

  if (type && hash) {
    ({ isLoading, data, isFetching, error } = useGetSearchDataQuery({
      type,
      hash,
    }));
  }

  let displayedData: [string, any][] = [];

  if (!isLoading && data) {
    displayedData = Object.entries(data);
  }
  return (
    <div className="rounded-2xl bg-gray-200/10 p-10 relative">
      {error && !isLoading ? (
        "Seems like we were unable to retriee correct data, please try another hash"
      ) : (
        <>
          <h3 className="text-base font-semibold leading-7 text-gray-200 break-words whitespace-normal">
            {data?.transactionHash}
          </h3>

          {isLoading || isFetching ? (
            <div>Loading </div>
          ) : (
            <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-400">
              {displayedData.length > 0 ? (
                displayedData?.map((data, index) => {
                  if (index === 0) return null;
                  const [key, value] = data;
                  return (
                    <div key={index}>
                      <dt className="sr-only">{key.toString()}</dt>
                      <dd className="flex">
                        <div className="font-semibold text-indigo-600">
                          {key.toString()} :
                        </div>
                        <div>&nbsp; {value}</div>
                      </dd>
                    </div>
                  );
                })
              ) : (
                <div>
                  No data yet 🥺,{" "}
                  {hash
                    ? "please enter another Hash"
                    : "would you like to try a hash"}{" "}
                </div>
              )}
            </dl>
          )}

          {type == "address" && (
            <button
              type="submit"
              className="block mt-8 w-full rounded-md bg-indigo-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Subscribe
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
