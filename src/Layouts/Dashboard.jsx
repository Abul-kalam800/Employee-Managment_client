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
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { Outlet } from "react-router";

const Dashboard = ({childern}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-10 items-center justify-center bg-blue-500">
        <Button onClick={() => setIsOpen(!isOpen)}>Show navigation</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="MENU" titleIcon={() => <></>} />
        <DrawerItems>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full justify-between gap-20">
              <div  className="flex h-full flex-col justify-between py-2">
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <SidebarItems>
                  <SidebarItemGroup>
                    <SidebarItem href="/" icon={HiChartPie}>
                      Dashboard
                    </SidebarItem>
                    <SidebarItem
                      href="/dashboard/work-sheet"
                      icon={HiShoppingBag}
                    >
                      Work-sheet
                    </SidebarItem>
                    <SidebarItem href="/dashboard/employeeList" icon={HiUsers}>
                      Employee-List  </SidebarItem>
                    <SidebarItem href="/authentication/sign-in" icon={HiLogin}>
                      Sign in
                    </SidebarItem>
                    <SidebarItem href="/authentication/sign-up" icon={HiPencil}>
                      Sign up
                    </SidebarItem>
                  </SidebarItemGroup>
                  <SidebarItemGroup>
                    <SidebarItem
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={HiClipboard}
                    >
                      Docs
                    </SidebarItem>
                    <SidebarItem
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                    >
                      Components
                    </SidebarItem>
                    <SidebarItem
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={HiInformationCircle}
                    >
                      Help
                    </SidebarItem>
                  </SidebarItemGroup>
                </SidebarItems>
              </div>

              <div className="flex-1 p-2 overflow-auto">
              
                 <Outlet>
                    <childern></childern>
                 </Outlet>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default Dashboard;
