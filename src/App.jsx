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
  return <RouterProvider router={router} />;
}

export default App;
