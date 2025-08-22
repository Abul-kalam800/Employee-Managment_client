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
import HrRouter from "../PrivetRouter/hrRouter/HrRouter";
import EmployeeRouter from "../PrivetRouter/employeeRouter/EmployeeRouter";
import TermsAndConditions from "../Componets/TermsAndConditions";
import AboutUs from "../Pages/Home/AboutUs";
import Overview from "../Dashboard/overview/Overview";
import ProfielPage from "../Dashboard/profielPage/ProfielPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "/contactus",
        element: (
          <PrivetRouter>
            <ContactUs></ContactUs>
          </PrivetRouter>
        ),
      },
      {
        path: "/aboutus",
        Component: AboutUs,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/tramsandcondition",
        Component: TermsAndConditions,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <Dashboard></Dashboard>
      </PrivetRouter>
    ),

    children: [
      {
        index: true,
        Component: DashboardBanner,
      },
      {
        path:"overview",
        Component:Overview
      },
      {
        path:'profilepage',
        Component:ProfielPage,
      },
      {
        path: "worksheet",
        // Component: WorkSheet,
        element: (
          <EmployeeRouter>
            <WorkSheet></WorkSheet>
          </EmployeeRouter>
        ),
      },
      {
        path: "employeeList",

        element: (
          <HrRouter>
            <EmployeeList></EmployeeList>
          </HrRouter>
        ),
      },
      {
        path: "paymenthistory",

        // Component: PaymentHistory,
        element: (
          <EmployeeRouter>
            <PaymentHistory></PaymentHistory>
          </EmployeeRouter>
        ),
      },
      {
        path: "employeedetails/:id",
        Component: EmployeeDetails,
      },
      {
        path: "hrprogress",
        element: (
          <HrRouter>
            <HrProgress></HrProgress>
          </HrRouter>
        ),
      },
      {
        path: "verifiedallemployee",

        element: (
          <AdminRouter>
            <VerifiedAllemployee></VerifiedAllemployee>
          </AdminRouter>
        ),
      },
      {
        path: "paymentpayroll",

        element: (
          <AdminRouter>
            <PaymentPayroll></PaymentPayroll>
          </AdminRouter>
        ),
      },
      {
        path: "adminmessage",
        element: (
          <AdminRouter>
            <AdminMessage></AdminMessage>
          </AdminRouter>
        ),
      },
    ],
  },
]);
