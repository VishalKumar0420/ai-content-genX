import { AlignJustify, MoonStar, Sun } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useColorMode from "../../hooks/useColorMode";
import Sidebar from "../dashboard/Sidebar";
import { MenuList } from "../../constant/data";
import UserTrack from "../dashboard/UserTrack";
import { useSelector } from "react-redux";
import UserProfile from "../dashboard/UserProfile";

const Header = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isShowSideBar, setIsShowSidebar] = useState(false);
  const navigate = useNavigate();
  const [colorMode, setColorMode] = useColorMode();
  const sidebarRef = useRef(null); // To reference the sidebar for click detection

  // Handle click outside sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsShowSidebar(false);
      }
    };

    // Add event listener when sidebar is open
    if (isShowSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowSideBar]);

  return (
    <div className="sticky top-0 z-50 flex w-full bg-white shadow-2 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none py-3">
      <div
        className={`flex justify-between items-center mx-10 py-1 w-full ${
          pathname !== "/" && "lg:justify-end"
        }`}
      >
        {pathname !== "/" ? (
          <div
            className="lg:hidden block"
            onClick={() => setIsShowSidebar(!isShowSideBar)}
          >
            <AlignJustify className="dark:text-white"/>
          </div>
        ) : (
          <Link href={"/"}>
            <img src={"/assets/logo.png"} alt="logo" width={120} height={100} />
          </Link>
        )}

        <div className="flex items-center gap-2 cursor-pointer">
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="border rounded-lg text-white bg-[#7E5FF9] py-2 px-6"
            >
              Get Started
            </button>
          )}
          <div>
            {colorMode === "dark" ? (
              <MoonStar
                className="text-bodydark"
                onClick={() => {
                  if (typeof setColorMode === "function") {
                    setColorMode(colorMode === "light" ? "dark" : "light");
                  }
                }}
              />
            ) : (
              <Sun
                onClick={() => {
                  if (typeof setColorMode === "function") {
                    setColorMode(colorMode === "light" ? "dark" : "light");
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Sidebar and Overlay */}
      {/* {isShowSideBar && ( */}
        <>
          {/* Overlay */}
          {isShowSideBar && <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsShowSidebar(false)} 
          ></div>}

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 z-50 h-screen w-64 bg-black transition-transform transform duration-300 ease-in-out dark:bg-boxdark ${
              isShowSideBar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <aside className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                  <NavLink to="/">
                    <img src={"/assets/logo.png"} alt="Logo" />
                  </NavLink>
                  <button
                    onClick={() => setIsShowSidebar(!isShowSideBar)}
                    className="block lg:hidden text-bodydark"
                  >
                    <svg
                      className="fill-current"
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                      <div>
                        <ul className="mb-6 flex flex-col gap-1.5">
                          {MenuList?.map((menu, index) => (
                            <Link to={`${menu.path}`} key={menu.path}  onClick={() => setIsShowSidebar(false)}>
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
                          ))}
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <UserTrack setIsShowSidebar={setIsShowSidebar}/>
              </div>
            </aside>
          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default Header;
