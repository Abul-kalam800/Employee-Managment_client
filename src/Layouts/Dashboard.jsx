"use client";

import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import {
  HiHome,
  HiUser,
  HiUsers,
  HiOutlineClipboardList,
  HiChartBar,
  HiBadgeCheck,
  HiCurrencyDollar,
  HiMailOpen,
} from "react-icons/hi";
import { Outlet } from "react-router";
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
      <div className="max-w-7xl mx-auto">
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
        <div className="my-10 ">
          <Outlet></Outlet>
        </div>
      </div>

      {/* drower start  */}
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="MENU" titleIcon={() => <></>} />
        <DrawerItems>
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <div className="flex h-full justify-between gap-10">
              <div className="flex h-full flex-col justify-between py-2">
                <SidebarItems>
                  <SidebarItemGroup>
                    <SidebarItem href="/dashboard" icon={HiHome}>
                      Home
                    </SidebarItem>

                    <SidebarItem
                      href={`/dashboard/work-sheet`}
                      icon={HiOutlineClipboardList}
                    >
                      Employee-Work-Sheet
                    </SidebarItem>
                    <SidebarItem
                      href="/dashboard/paymenthistory"
                      icon={HiCurrencyDollar}
                    >
                      Payment-History
                    </SidebarItem>

                    {/* {role== "Hr" && ( */}
                      <>
                        <SidebarItem
                          href="/dashboard/employeeList"
                          icon={HiUsers}
                        >
                          Employee-List
                        </SidebarItem>

                        <SidebarItem
                          href="/dashboard/hrprogress"
                          icon={HiChartBar}
                        >
                          HR-Progress
                        </SidebarItem>
                      </>
                    {/* )} */}
                    {/* for only admin  */}
                    {/* {role == "admin" && ( */}
                      <>
                        <SidebarItem
                          href="/dashboard/verifiedallemployee"
                          icon={HiBadgeCheck}
                        >
                          Verified-All-Employee
                        </SidebarItem>

                        <SidebarItem
                          href="/dashboard/paymentpayroll"
                          icon={HiCurrencyDollar}
                        >
                          Payment-Payroll
                        </SidebarItem>

                        <SidebarItem
                          href="/dashboard/adminmessage"
                          icon={HiMailOpen}
                        >
                          Admin-Messages
                        </SidebarItem>
                      </>
                    {/* )} */}
                  </SidebarItemGroup>
                </SidebarItems>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Dashboard;
