import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import Sidebar from "../../components/dashboard/Sidebar";

const DashboardLayout = () => {

  return (
    <div className="">
      {/* Sidebar */}
      <div className={`flex h-screen overflow-hidden`}>
        <Sidebar/>

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
          <Header />
          <main className="">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
