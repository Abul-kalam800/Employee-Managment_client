import React from "react";
import Banner from "../Home/Banner.jsx";
import Services from "./Services.jsx";
import Testimonial from "./Testimonial.jsx";
import Brand from "./Brand.jsx";
import Blog from "./Blog.jsx";


const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <Testimonial></Testimonial>
      <Brand></Brand>
      <Blog></Blog>
    </div>
  );
};

export default HomePage;
