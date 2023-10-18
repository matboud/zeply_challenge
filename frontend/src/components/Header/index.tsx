"use client";
import React, { useState, FC } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Top5 from "../Top5";

interface HeaderProps {
  handleDrawer: () => void;
  handleSearchData: (arg: { type: string; hash: string }) => void;
}

const Header: FC<HeaderProps> = ({ handleDrawer, handleSearchData }) => {
  const [isTop5, setTop5] = useState(false);
  const [type, setType] = useState<string>("transaction");
  const [hash, setHash] = useState<string>("");

  const handleSubmit = () => {
    if (hash) {
      handleSearchData({ type, hash });
    }
  };

  return (
    <div className="flex flex-wrap items-center mt-20 max-w-[78rem] m-auto px-8">
      <div className="order-1 md:order-1 w-1/2 md:w-auto md:pr-2">
        <Image
          alt="logo"
          src="/logo.svg"
          width="50"
          height="50"
          className="mr-10"
        />
      </div>

      <div className="order-2 md:order-5 w-1/2 md:w-auto md:ml-auto flex justify-end relative">
        <div className="pr-4">
          <select
            id="country"
            name="country"
            className="h-full rounded-md border-0 bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-0 focus:ring-none sm:text-sm"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>BTC</option>
          </select>
        </div>
        <div className="flex relative cursor-pointer" onClick={handleDrawer}>
          <Image
            alt="notification bill"
            src="/notification.png"
            width="30"
            height="30"
          />
          <div className="bg-red-500 w-4 h-4 rounded-full flex justify-center items-center left-4 absolute text-xs">
            2
          </div>
        </div>
      </div>

      <div className="order-3 md:order-2 w-full md:w-auto md:p-2  mt-4 md:mt-0">
        <div className="relative">
          <div className="absolute my-2 ml-1 inset-y-0 left-0 flex items-center bg-none">
            <label htmlFor="country" className="sr-only">
              Country
            </label>
            <select
              id="searchType"
              name="searchType"
              defaultValue={"transaction"}
              onChange={(e) => setType(e.target.value)}
              className="h-full rounded-md border-0 bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-0 focus:ring-none sm:text-sm"
            >
              <option value="address">Adresse</option>
              <option value="transaction">Transaction</option>
            </select>
            <ChevronDownIcon
              className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            onFocus={() => setTop5(true)}
            onBlur={() => setTop5(false)}
            onChange={(e) => setHash(e.target.value)}
            type=""
            name="phone-number"
            id="phone-number"
            autoComplete="address"
            placeholder="Address"
            className="block w-full md:max-w-[26rem] rounded-md border-0 px-3.5 py-2 pl-36 text-gray-900 shadow-sm focus:ring-0 focus:ring-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          {isTop5 && <Top5 />}
        </div>
      </div>

      <div className="order-5 md:order-4 w-full md:w-auto md:p-2  mt-4 md:mt-0">
        <button
          type="submit"
          className="block w-full  rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;
