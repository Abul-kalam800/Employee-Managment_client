import React from "react";
import Banner from "../Home/Banner.jsx";
import Services from "./Services.jsx";
import Testimonial from "./Testimonial.jsx";
import Brand from "./Brand.jsx";
import Blog from "./Blog.jsx";
import PricingPlans from "./PricingPlans.jsx";
import AboutUs from "./AboutUs.jsx";
import HowItWorks from "./HowItWorks.jsx";


const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <Testimonial></Testimonial>
      <Brand></Brand>
      <Blog></Blog>
      <PricingPlans></PricingPlans>
      <AboutUs></AboutUs>
    </div>
  );
};

export default HomePage;
