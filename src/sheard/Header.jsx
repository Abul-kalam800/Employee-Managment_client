import React, { useState } from "react";

import { Link, NavLink } from "react-router";
import "../index.css";
import useAuth from "../Hook/useAuth";
import Logo from "../Componets/Logo";

const Header = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [logopen, setLogopen] = useState(false);
  const handleManu = () => {
    setOpen(!open);
  };
  const handlePhoto = () => {
    setLogopen(!logopen);
  };
  const hanldeLogout = () => {
    logOut()
      .then(() => {
        setLogopen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <header className="p-2 bg-primary-900 text-neutral-300 fixed top-0 left-0 w-full px-5 z-50">
      <div className="container flex justify-between h-12 mx-auto">
        <Logo></Logo>

        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/"
              className="flex items-center px-4 -mb-1 hover:text-[#6600CC]"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/dashboard"
              className="flex items-center px-4 -mb-1 hover:text-[#6600CC]"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contactus"
              className="flex items-center px-4 -mb-1 hover:text-[#6600CC]"
            >
              Contact us
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/aboutus"
              className="flex items-center px-4 -mb-1 hover:text-[#6600CC]"
            >
              About us
            </NavLink>
          </li>
        </ul>
        <div className="flex justify-center items-center ">
          {user ? (
            <>
              <img
                src={user?.photoURL}
                className="w-12 h-12 rounded-full cursor-pointer relative"
                onClick={handlePhoto}
              />

              {logopen ? (
                <button
                  onClick={hanldeLogout}
                  className="cursor-pointer btn bg-[#6600cc] px-4 py-2 text-white absolute top-16 right-10 duration-300 translate-x-2 transition -translate-y-1 ease-in-out"
                >
                  Log-out
                </button>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <div className="items-center flex-shrink-0 justify-center lg:flex gap-5">
                <Link
                  to="/login"
                  className="self-center px-8 py-3 rounded btn border-2 border-[#6600CC]  hover:bg-[#00CC33]"
                  fdprocessedid="5all7o"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="self-center px-8 py-3 font-semibold hidden lg:block rounded bg-[#6600CC] hover:bg-[#00CC33] cursor-pointer"
                  fdprocessedid="bz1a8i"
                >
                  Register
                </Link>
              </div>
            </>
          )}

          <button onClick={handleManu} className="p-4 lg:hidden relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        {open ? (
          <>
            <ul className="absolute top-16 right-0 bg-indigo-800 py-5 w-9/12 h-svh z-50 ">
              <li>
                <NavLink
                  to="/"
                  className="flex items-center px-4 mb-4"
                >
                Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center px-4 mb-4"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="flex">
                <NavLink
                  to="/contactus"
                  className="flex items-center px-4 mb-4 "
                >
                  Contact us
                </NavLink>
              </li>
              <li className="flex">
                <NavLink to="/aboutus" className="flex items-center px-4 ">
                  About us
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          " "
        )}
      </div>
    </header>
  );
};

export default Header;
