import React from "react";
import logo from '../../src/assets/logo.png'
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
 <footer className="px-4 divide-y dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex flex-col justify-between py-6 mx-auto space-y-8 lg:flex-row lg:space-y-0">
		<div className="lg:w-1/3">
			<a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
				<div className="flex items-center justify-center">
				 <img src={logo} alt="" className="w-[200px]" />
				</div>
				
			</a>
		</div>
		<div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
		
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-900 font-bold">Company</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">Privacy</a>
					</li>
					<li>
						<Link to='/tramsandcondition'>Trams & condition</Link>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<h3 className="uppercase font-bold">Quick Link</h3>
				<ul className="space-y-1">
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<a href="#">Services</a>
					</li>
					<li>
						<a href="#">How to work</a>
					</li>
					<li>
						<a href="#">Review</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<div className="uppercase  font-bold ">Social media</div>
				<div className="flex justify-start space-x-3">
					<a rel="noopener noreferrer" href="https://www.facebook.com/bd.abulkalam800" title="Facebook" className="flex items-center p-1 hover:bg-primary-900 hover:text-cyan-100 duration-300">
						<FaFacebook size={35}/>
					</a>
					<a rel="noopener noreferrer" href="#" title="github" className="flex items-center p-1 hover:bg-primary-900 hover:text-cyan-100 duration-300">
						<FaGithub size={35} />
					</a>
					<a rel="noopener noreferrer" href="#" title="Linkdin" className="flex items-center p-1 hover:bg-primary-900 hover:text-cyan-100 duration-300">
					<FaLinkedinIn size={35} />	
					</a>
				</div>
			</div>
		</div>
	</div>
	<div className="py-6 text-sm text-center dark:text-gray-600">© 2025 Esolution company. All rights reserved.</div>
</footer>
  );
};

export default Footer;
