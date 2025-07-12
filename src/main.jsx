import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router";
import MainLayout from "./Layouts/MainLayout.jsx";
import { router } from "./router/router.jsx";
import Authprovider from "./Provider/Authprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router}></RouterProvider>
    </Authprovider>
  </StrictMode>
);
