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
  HiHome,
  HiInformationCircle,
  HiLogin,
  HiOutlineReceiptRefund,
  HiPencil,
  HiPlay,
  HiSearch,
  HiShoppingBag,
  HiUser,
  HiUsers,
} from "react-icons/hi";
import { Outlet } from "react-router";
import Logo from "../Componets/Logo";
import useAuth from "../Hook/useAuth";
import PaymentHistory from "../Dashboard/payment/PaymentHistory";

const Dashboard = ({ childern }) => {
  const [isOpen, setIsOpen] = useState(true);
  const {user}=useAuth();

  const handleClose = () => setIsOpen(false);

  return (
    <>
     
     <div className="max-w-7xl mx-auto">
     <div className="flex justify-between items-center">
       <Logo></Logo>
        <Button onClick={() => setIsOpen(!isOpen)} className="btn bg-[#3366cc]">Manu</Button>
     </div>
    
       <Outlet></Outlet>
     </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader title="MENU" titleIcon={() => <></>} />
        <DrawerItems>
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <div className="flex h-full justify-between gap-20">
              <div className="flex h-full flex-col justify-between py-2">
              
                <SidebarItems>
                  <SidebarItemGroup>
                    <SidebarItem href="/" icon={HiHome}>
                      Home
                    </SidebarItem>
                    <SidebarItem
                      href={`/dashboard/work-sheet`}
                      icon={HiUser}
                    >
                     Employee-Work-sheet
                    </SidebarItem>
                    <SidebarItem href="/dashboard/employeeList" icon={HiUsers}>
                      Employee-List{" "}
                    </SidebarItem>
                   <SidebarItem href="/dashboard/paymenthistory" icon={HiOutlineReceiptRefund}>
                      Payment-History
                   </SidebarItem>
                   <SidebarItem href="/dashboard/hrprogress" icon={HiOutlineReceiptRefund}>
                     HR-Progress
                   </SidebarItem>
                   <SidebarItem href="/dashboard/verifiedallemployee" icon={HiOutlineReceiptRefund}>
                    Verified-All-emplouee
                   </SidebarItem>
                 </SidebarItemGroup>
                </SidebarItems>
              </div>

              <div className="flex p-2">
                <Outlet></Outlet>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default Dashboard;
