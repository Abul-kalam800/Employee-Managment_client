import React from "react";
import logo from "../../src/assets/logo.png";
import { NavLink } from "react-router";
const Logo = () => {
  return (
    <div  className="flex items-center p-2">
      <NavLink to='/'>
        <img src={logo} alt="logo" className=" w-26 lg:w-[150px]" />
      </NavLink>
    </div>
  );
};

export default Logo;
