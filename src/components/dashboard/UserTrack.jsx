import React, { useMemo } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MAX_CREDITS = 10000;

const UserTrack = ({setIsShowSidebar}) => {
  const { totalWordUsage } = useSelector((state) => state.user);
  const navigation = useNavigate();

 

  const percentage = useMemo(() => {
    let usages = totalWordUsage ?? 0;
    return Math.min(Math.floor((usages * 100) / MAX_CREDITS), 100);
  }, [totalWordUsage]);

  return (
    <div className="m-5">
      <div className="bg-[#7E5FF9] text-white rounded-lg p-3">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {Math.min(totalWordUsage || 0, MAX_CREDITS)} / {MAX_CREDITS} Credits
          Used
        </h2>
      </div>

      <button
        className="w-full my-3 text-[#7E5FF9] bg-[#f7f7f7] py-2 rounded-lg"
        onClick={() => {navigation("/dashboard/billing"); setIsShowSidebar(false)}}
      >
        Upgrade
      </button>
    </div>
  );
};

export default UserTrack;
