import React, { useEffect } from "react";
import { useState } from "react";

import { NavLink, Outlet } from "react-router";
import Logo from "../Componets/Logo";

import { GrMenu } from "react-icons/gr";
import Footer from "../sheard/Footer";
import useUserRole from "../Hook/useUserRole";
import useAuth from "../Hook/useAuth";
import { IoMdClose } from "react-icons/io";
import {
  HiHome,
  HiClipboardList,
  HiCurrencyDollar,
  HiUsers,
  HiTrendingUp,
  HiCheckCircle,
  HiCash,
  HiChatAlt2,
} from "react-icons/hi";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logOut } = useAuth();
  const handleClose = () => setIsOpen(false);
  const [logOpen, setLogOpen] = useState(false);
  const { role, isLoading ,loading } = useUserRole();

  const hanldeLogout = () => {
    setLogOpen(!logOpen);
  };
  // logOut
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-2">
        <Logo></Logo>
        <div className="flex justify-center gap-5 items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn  p-3 cursor-pointer  "
          >
            <GrMenu size={20} />
          </button>
          <div>
            {user && (
              <img
                className="w-10 h-10 rounded-full relative cursor-pointer "
                src={user.photoURL}
                onClick={hanldeLogout}
              />
            )}
          </div>
          {logOpen ? (
            <button
              onClick={handleLogOut}
              className="cursor-pointer btn bg-[#6600cc] px-4 py-2 text-white absolute top-18 md:top-26 right-10 duration-300 translate-3.5 transition -translate-y-2 ease-in-out"
            >
              Log-out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* nav finished  */}
      <div className="max-w-7xl mx-auto  relative">
        <div className="h-full px-2 my-5">
          <Outlet></Outlet>
        </div>

        {/* drower start  */}
        <div
          className={`bg-black w-full md:w-3/12 absolute top-0 p-5 ${
            isOpen
              ? "bg-gray-900 -left-900 transform translate-1 duration-500"
              : "bg-gray-800 left-0 transform translate-1 duration-500 "
          }`}
        >
          <div className="flex h-full flex-col  w-full md:max-w-xs relative">
            <span
              onClick={() => setIsOpen(!isOpen)}
              className="text-white absolute top-5 right-5 cursor-pointer bg-blue-500 rounded-full p-1"
            >
              <IoMdClose size={25} />
            </span>
            <ul className="mt-20 ml-5 flex flex-col space-y-6">
              <NavLink to="/dashboard">
                <li className="text-lg text-white flex items-center gap-2">
                  <HiHome /> Home
                </li>
              </NavLink>
              <NavLink to="/dashboard/overview">
                <li className="text-lg text-white flex items-center gap-2">
                  <HiHome /> OverView
                </li>
              </NavLink>
              <NavLink to="/dashboard/profilepage">
                <li className="text-lg text-white flex items-center gap-2">
                  <HiHome /> Profile
                </li>
              </NavLink>

              {!loading && role === "Employee" && (
                <>
                  <NavLink to="/dashboard/worksheet">
                    <li className="text-lg text-white flex items-center gap-2">
                      <HiClipboardList /> Employee-Work-Sheet
                    </li>
                  </NavLink>

                  <NavLink to="/dashboard/paymenthistory">
                    <li className="text-lg text-white flex items-center gap-2">
                      <HiCurrencyDollar /> Payment-History
                    </li>
                  </NavLink>
                </>
              )}

              {!loading && role === "Hr" && (
                <>
                  <NavLink to="/dashboard/employeeList">
                    <li className="text-lg text-white flex items-center gap-2">
                      <HiUsers /> Employee-List
                    </li>
                  </NavLink>

                  <NavLink to="/dashboard/hrprogress">
                    <li className="text-lg text-white flex items-center gap-2">
                      <HiTrendingUp /> HR-Progress
                    </li>
                  </NavLink>
                </>
              )}

              {!loading && role === "admin" && (
                <>
                  <NavLink to="/dashboard/verifiedallemployee">
                    <li className="text-lg text-white flex items-center gap-2">
                      <HiCheckCircle /> Verified-All-Employee
                    </li>
                  </NavLink>

                  <NavLink to="/dashboard/paymentpayroll">
                    <li className="text-lg text-white flex items-center gap-2">
                      <HiCash /> Payment-Payroll
                    </li>
                  </NavLink>

                  <NavLink to="/dashboard/adminmessage">
                    <li className="text-lg text-white flex items-center gap-2">
                      <HiChatAlt2 /> Admin - Message
                    </li>
                  </NavLink>
                </>
              )}
            </ul>
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
