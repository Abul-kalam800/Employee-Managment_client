import React from "react";
import logo from "../../src/assets/logo.png";
import { NavLink } from "react-router";
const Logo = () => {
  return (
    <div  className="flex items-center">
      <NavLink to='/'>
        <img src={logo} alt="logo" className=" w-16 lg:w-[150px]" />
      </NavLink>
    </div>
  );
};

export default Logo;
