"use client";
import React, { useEffect, useState } from "react";

import PuffLoader from "react-spinners/PuffLoader";
import { setAiData } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import { Check, Copy } from "lucide-react";

const History = () => {
  let isLoading = false;
  let error = false;
  const { token, aiResponses } = useSelector((state) => state.user);
  const [copyStatus, setCopyStatus] = useState({});
  const [filter, setFilter] = useState("");
  const [sortDirection, setSortDirecttion] = useState("desc");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(aiResponses);
  }, []);

  const handleCopy = async (aiResponses, index) => {
    try {
      await navigator.clipboard.writeText(aiResponses);
      setCopyStatus((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [index]: false }));
      }, 800);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const filterHandler = (e) => {
    const query = e.target.value;
    setFilter(query);
    const filtered = aiResponses.filter((item) =>
      item?.templateSlugName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a?.createdAt);
      const dateB = new Date(b?.createdAt);

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
  };
  const toggleSortDirection = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirecttion(newDirection);
    setFilteredData((prevData) => sortData(prevData));
  };

  return (
    <div className=" bg-white dark:border-strokedark dark:bg-boxdark-2 dark:text-white h-[100%] min-h-screen">
      <div className="flex flex-col gap-4 ml-5 p-5 ">
        <div className="flex flex-col justify-between gap-5 sm:gap-0 sm:flex-row">
          <div>
            <h2 className="font-bold text-xl">History</h2>
            <p className="text-sm font-medium">
              Search your previous AI Contents
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Filter by Template Name"
              className="p-2 border rounded text-black w-full sm:w-auto"
              value={filter}
              onChange={filterHandler}
            />
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <PuffLoader />
            </div>
          ) : error ? (
            <div>Error fetching AI data: {error.message}</div>
          ) : (
            <table className="w-full table-auto">
              <thead className="bg-slate-200 text-black">
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Template Name
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    AI Resp
                  </th>
                  <th
                    className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 cursor-pointer"
                    onClick={toggleSortDirection}
                  >
                    Date {sortDirection === "asc" ? "↑" : "↓"}
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Words
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Copy
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {item?.templateSlugName}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {(item?.aiResponse).substring(0, 51)}...
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {(item?.aiResponse).split(" ").length}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-black dark:text-white">
                      {copyStatus[index] ? (
                        <Check />
                      ) : (
                        <Copy
                          onClick={() => handleCopy(item?.aiResponse, index)}
                          className="cursor-pointer"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
