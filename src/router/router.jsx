import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/Home/HomePage";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Dashboard from "../Layouts/Dashboard";
import WorkSheet from "../Dashboard/WorkSheet";
import EmployeeList from "../Dashboard/EmployeeList";
import PrivetRouter from "../PrivetRouter/PrivetRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        path: "work-sheet",
        // element: (
        //   <PrivetRouter>
        //     <WorkSheet></WorkSheet>
        //   </PrivetRouter>
        // ),
        Component:WorkSheet
      },
      {
        path: "employeeList",
        Component: EmployeeList,
      },
    ],
  },
]);
