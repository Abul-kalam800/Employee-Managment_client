import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/Home/HomePage";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Dashboard from "../Layouts/Dashboard";
import WorkSheet from "../Dashboard/WorkSheet";
import EmployeeList from "../Dashboard/EmployeeList";
import PrivetRouter from "../PrivetRouter/PrivetRouter";
import PaymentHistory from "../Dashboard/payment/PaymentHistory";
import EmployeeDetails from "../Dashboard/employeeDetails/EmployeeDetails";
import HrProgress from "../Dashboard/HR-progress/HrProgress";
import VerifiedAllemployee from "../Dashboard/admin/VerifiedAllemployee";
import PaymentPayroll from "../Dashboard/payroll/PaymentPayroll";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AdminMessage from "../Dashboard/contactusmessage/AdminMessage";
import DashboardBanner from "../Dashboard/DashboardBanner";
import Forbidden from "../Pages/forbiddenPage/Forbidden";
import AdminRouter from "../PrivetRouter/adminRouter/AdminRouter";
import ErrorPage from "../Pages/Error404page/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path:'/forbidden',
        Component:Forbidden,
      },
      {
        path:'/contactus',
        Component:ErrorPage
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
    element:<PrivetRouter><Dashboard></Dashboard></PrivetRouter>,
    errorElement:ErrorPage,
    errorElement:Forbidden,
    children: [
      {
        index:true,
        Component:DashboardBanner
      },
      {
        path: "work-sheet",
        Component:WorkSheet
      },
      {
        path: "employeeList",
        Component: EmployeeList,
      },
      {
        path:'paymenthistory',
        Component:PaymentHistory
      },
      {
        path:'employeedetails/:id',
        Component:EmployeeDetails
      },
      {path:'hrprogress',
        Component:HrProgress
      },
      {
        path:'verifiedallemployee',
        // Component:VerifiedAllemployee
        element:<AdminRouter><VerifiedAllemployee></VerifiedAllemployee></AdminRouter>
      },
      {
        path:'paymentpayroll',
        // Component:PaymentPayroll
        element:<AdminRouter><PaymentPayroll></PaymentPayroll></AdminRouter>
      },
      {
        path:'adminmessage',
       element:<AdminRouter><AdminMessage></AdminMessage></AdminRouter>
      }
    ],
  },
]);
