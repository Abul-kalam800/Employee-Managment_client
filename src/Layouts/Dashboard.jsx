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

const Dashboard = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b-2">
          <Logo></Logo>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn bg-blue-300 p-3 cursor-pointer "
          >
            <GrMenu size={25} />{" "}
          </button>
        </div>
        <div className="my-10 ">
          <Outlet></Outlet>
        </div>
      </div>
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

                    <SidebarItem href="/dashboard/employeeList" icon={HiUsers}>
                      Employee-List
                    </SidebarItem>

                    <SidebarItem
                      href="/dashboard/paymenthistory"
                      icon={HiCurrencyDollar}
                    >
                      Payment-History
                    </SidebarItem>

                    <SidebarItem href="/dashboard/hrprogress" icon={HiChartBar}>
                      HR-Progress
                    </SidebarItem>

                    {/* for only admin  */}
                    {!roleLoading && role === "admin" && (
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
                    )}
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
