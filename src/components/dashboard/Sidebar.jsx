import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MenuList } from "../../constant/data";
import UserTrack from "./UserTrack";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { userInfo } = useSelector((state) => state.user);

  return (
    <aside
      className={` lg:flex w-75 z-50 hidden  h-screen  flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static`}
    >
      <div className="flex justify-between flex-col h-screen">
        <div>
          <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
            <NavLink to="/">
              <img src={"/assets/logo.png"} alt="Logo" />
            </NavLink>
          </div>
          {/* <!-- SIDEBAR HEADER --> */}

          <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            {/* <!-- Sidebar Menu --> */}
            <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
              {/* <!-- Menu Group --> */}
              <div>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {MenuList?.map((menu, index) => {
                    return (
                      <Link to={`${menu.path}`} key={menu.path}>
                        <div
                          className={`flex gap-2 mb-2 p-3 text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 rounded-lg cursor-pointer ${
                            pathname === menu.path &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                          key={index}
                        >
                          <menu.icon className="w-6 h-6" />
                          <h2 className="text-lg">{menu.name}</h2>
                        </div>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </nav>
            {/* <!-- Sidebar Menu --> */}
          </div>
        </div>
        {!userInfo?.active && (
          <div className="w-full">
            <UserTrack />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
