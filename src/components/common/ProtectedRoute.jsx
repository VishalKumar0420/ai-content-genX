import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiResponseData, fetchUserData } from "../../apis/apiServices";
import { restoreUserData, setAiData } from "../../slices/userSlice";
import { PuffLoader } from "react-spinners";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const userData = await fetchUserData(token);
        
          if (userData) {
            dispatch(restoreUserData({ token, userInfo: userData?.data }));
          }

          const { aiResponses, totalWords } = await fetchAiResponseData(token);
          dispatch(setAiData({ aiResponses, totalWords }));
        } catch (err) {
          setError("Error fetching data: " + err.message);
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <PuffLoader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
