import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import History from "./pages/dashboard/History";
import ProtectedRoute from "./components/common/ProtectedRoute";
import HomeDashboard from "./pages/dashboard/Home";
import Billing from "./pages/dashboard/Billing";
import Content from "./pages/dashboard/Content";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAiResponseData, fetchUserData } from "./apis/apiServices";
import { restoreUserData, setAiData } from "./slices/userSlice";
import { PuffLoader } from "react-spinners";

// Define your routes
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute />, // Protects the dashboard and nested routes
      children: [
        {
          element: <DashboardLayout />,
          children: [
            { index: true, element: <HomeDashboard /> },
            { path: "history", element: <History /> },
            { path: "billing", element: <Billing /> },
            { path: "content/:slugName", element: <Content /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.user);
  console.log(token);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const userData = await fetchUserData(token);
          console.log(userData);

          if (userData) {
            dispatch(restoreUserData({ token, userInfo: userData?.data }));
          }

          const { aiResponses, totalWords } = await fetchAiResponseData(token);
          dispatch(setAiData({ aiResponses, totalWords }));
        } catch (err) {
          setError("Error fetching data: " + err);
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
  return <RouterProvider router={router} />;
}

export default App;
