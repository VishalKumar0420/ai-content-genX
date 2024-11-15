import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const ProtectedRoute = () => {
  const { token, isAuthenticated } = useSelector((state) => state.user);


  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
