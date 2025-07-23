import React from "react";
import { useState } from "react";

import { NavLink, Outlet } from "react-router";
import Logo from "../Componets/Logo";

import { GrMenu } from "react-icons/gr";
import Footer from "../sheard/Footer";
import useUserRole from "../Hook/useUserRole";
import useAuth from "../Hook/useAuth";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logOut } = useAuth();
  const handleClose = () => setIsOpen(false);
  const [logOpen, setLogOpen] = useState(false);
  const { role } = useUserRole();
  console.log(role);
  const hanldeLogout = () => {
    setLogOpen(!logOpen);
  };
  // logOut
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logout successfull");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-2">
        <Logo></Logo>
        <div className="flex gap-5 items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn bg-blue-300 p-3 cursor-pointer "
          >
            <GrMenu size={20} />{" "}
          </button>
          {user && (
            <img
              className="w-10 h-10 rounded-full relative cursor-pointer "
              src={user.photoURL}
              onClick={hanldeLogout}
            />
          )}
          {logOpen ? (
            <button
              onClick={handleLogOut}
              className="cursor-pointer btn bg-[#6600cc] px-4 py-2 text-white absolute top-30 right-30 duration-300 translate-3.5 transition -translate-y-2 ease-in-out"
            >
              Log-out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* nav finished  */}
      <div className="max-w-7xl mx-auto flex justify-between flex-row-reverse min-h-screen relative ">
        <div className="my-10 flex justify-center items-center w-full bg-blue-300 mx-auto">
          <Outlet></Outlet>
        </div>

        {/* drower start  */}
        <div className={`bg-black w-8/12 md:w-3/12 absolute top-1  h-full ${isOpen?"bg-gray-900 -left-900":'bg-gray-800 left-0 transform translate-1 duration-500 '}`}>
          <div className="flex h-full flex-col justify-between  text-center">
            <NavLink className="text-lg font-bold text-white" to="/dashboard">
           
              Home
            </NavLink>

            <NavLink
              className="text-xl font-bold text-white"
              to="/dashboard/work-sheet"
            >
              Employee-Work-Sheet
            </NavLink>
            <NavLink
              className="text-xl font-bold text-white"
              to="/dashboard/paymenthistory"
            >
              Payment-History
            </NavLink>

            {role === "Hr" && (
              <>
                <NavLink
                  className="text-xl font-bold text-white"
                  to="/dashboard/employeeList"
                >
                  Employee-List
                </NavLink>

                <NavLink
                  className="text-xl font-bold text-white"
                  to="/dashboard/hrprogress"
                >
                  HR-Progress
                </NavLink>
              </>
            )}
            {/* for only admin  */}
            {role === "admin" && (
              <>
                <NavLink
                  className="text-xl font-bold text-white"
                  to="verifiedallemployee"
                >
                  Verified-All-Employee
                </NavLink>
                <NavLink
                  className="text-xl font-bold text-white"
                  to="/dashboard/paymentpayroll"
                >
                  Payment-Payroll
                </NavLink>

                <NavLink
                  className="text-xl font-bold text-white"
                  to="/dashboard/adminmessage"
                >
                  Admin - message
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      {/* footer  */}
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Dashboard;
