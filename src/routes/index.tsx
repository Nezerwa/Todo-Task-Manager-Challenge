import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { HRTasksPage } from "@/pages/HRTasksPage";
import { WindahCompPage } from "@/pages/WindahCompPage";
import { NoSpaceDevPage } from "@/pages/NoSpaceDevPage";
import { DribblePortfolioPage } from "@/pages/DribblePortfolioPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "hr-tasks",
        element: <HRTasksPage />,
      },
      {
        path: "windah",
        element: <WindahCompPage />,
      },
      {
        path: "nospace",
        element: <NoSpaceDevPage />,
      },
      {
        path: "dribble",
        element: <DribblePortfolioPage />,
      },
      {
        path: "404",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);
