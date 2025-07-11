import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router";
import MainLayout from "./Layouts/MainLayout.jsx";
import { router } from "./router/router.jsx";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <MainLayout></MainLayout>
    </StrictMode>
  </RouterProvider>
);
