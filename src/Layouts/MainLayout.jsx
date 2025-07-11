import React from "react";
import { Outlet } from "react-router";
import Navbar from "../sheard/Header";
import Footer from "../sheard/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
