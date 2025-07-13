import React, { useState } from "react";
import logo from "../../src/assets/logo.png";
import { Link, NavLink } from "react-router";
import "../index.css";
import useAuth from "../Hook/useAuth";

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
      console.log("log-out successfully");
      setLogopen(false)
    })
    .catch(error=>{
      console.log(error.message)
    });
  };

  return (
    <header className="p-2 bg-gray-200 text-gray-800 shadow-2xl">
      <div className="container flex justify-between h-12 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          href="#"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src={logo} alt="logo" className=" w-26 lg:w-[150px]" />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink to="/dashboard" className="flex items-center px-4 -mb-1">
              Dashboard
            </NavLink>
          </li>
          <li className="flex">
            <NavLink to="/" className="flex items-center px-4 -mb-1">
              Contact us
            </NavLink>
          </li>
        </ul>
        <div className="">
        {user ? (<>
       
            <img src={user.photoURL}  className="w-12 h-12 rounded-full cursor-pointer relative" onClick={handlePhoto}/>
      
        {
          logopen? 
          <button onClick={hanldeLogout} className="cursor-pointer btn bg-[#6600cc] px-4 py-2 text-white absolute top-16 right-10 duration-300 translate-x-2 transition -translate-y-1 ease-in-out">Log-out</button>:''
        }
          </>
        ) : (
          <>
            <div className="items-center flex-shrink-0 hidden lg:flex gap-5">
              <Link
                to="/login"
                className="self-center px-8 py-3 rounded btn  hover:bg-[#00CC33]"
                fdprocessedid="5all7o"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="self-center px-8 py-3 font-semibold rounded bg-[#6600CC] hover:bg-[#00CC33] cursor-pointer"
                fdprocessedid="bz1a8i"
              >
                Register
              </Link>
            </div>
          </>
        )}
        </div>

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
        {open ? (
          <>
            <ul className="absolute top-20 right-0 ">
              <li>
                <NavLink to="/dashboard" className="flex items-center px-4 mb-4">
                  Dashboard
                </NavLink>
              </li>
              <li className="flex">
                <NavLink to="/" className="flex items-center px-4 ">
                  Contact us
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
