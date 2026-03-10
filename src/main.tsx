import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import FilterPage from "./page/FilterPage";
import { filterLoader } from "./util/filterLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/filter" replace />,
  },
  {
    path: "/filter",
    element: <FilterPage />,
    loader: filterLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
