import React from "react";
import banner from "../../assets/banner1.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800 rounded-2xl ">
      <div className="container  md:h-[550px] flex flex-col justify-center p-6 gap-10 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between mt-20 ">
        <div className="flex flex-col justify-center  text-center rounded-sm lg:max-w-lg  lg:text-left">
          <h1 className=" font-bold  text-3xl md:text-6xl text-center lg:text-left ">
            Empowering Teams, Simplifying
            <span className="dark:text-violet-600 "> Management</span>
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Our service is Professonals Managment for employee
            <br className="hidden md:inline lg:hidden" /> Develop carrier and
            specifiq field where they need.
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link
              to="/aboutus"
              className="px-8 py-3 text-lg  rounded btn bg-[#00CC33]  hover:bg-[#6600CC]"
            >
              About us
            </Link>
            <Link
              to="/contactus"
              className="px-8 py-3 text-lg  rounded btn border-2 border-[#6600CC]  hover:bg-[#00CC33]"
            >
              Contact us
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-3 lg:mt-0 h-52 sm:h-70 lg:h-76 xl:h-112">
          <img
            src={banner}
            alt=""
            className="object-contain h-62 sm:h-70 lg:h-76 xl:h-92 "
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
