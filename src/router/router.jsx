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
        path:'/contactus',
        Component:ContactUs
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
        Component:VerifiedAllemployee
      },
      {
        path:'paymentpayroll',
        Component:PaymentPayroll
      },
      {
        path:'adminmessage',
        Component:AdminMessage
      }
    ],
  },
]);
