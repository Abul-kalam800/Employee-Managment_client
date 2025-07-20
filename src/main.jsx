import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router";
import MainLayout from "./Layouts/MainLayout.jsx";
import { router } from "./router/router.jsx";
import Authprovider from "./Provider/Authprovider.jsx";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "./Dashboard/WorkSheet.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </Authprovider>
  </StrictMode>
);
