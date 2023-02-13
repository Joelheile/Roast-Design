import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom/dist";

export default function Navbar() {
	let navigate = useNavigate();
	const signout = () => {
        navigate('/signout');
    }
	const projectNav = () => {
        navigate('/project');
    }

	return (
		<div className="bg-white border-solid border-2 border-gray-200 px-2 sm:px-4 py-2.5 rounded mb-5" >
		<nav className="container flex flex-wrap items-center justify-between mx-auto">
			<Link to="/project" className="text-xl font-bold">
				Roast.design
			</Link>
			<button className="bg-primary hover:bg-primaryLight text-white font-bold py-2 px-4 rounded" onClick={projectNav}>
				All projects
			</button>
			<button className=" text-black font-bold py-2 px-4 rounded display: block" onClick={signout}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-primaryLight">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>		
			</button>
		</nav>

		</div>
		
	);
}

function CustomLink({ to, children, ...props }) {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<li className={isActive ? "active" : ""}>
			<Link to={to} {...props}>
				{children}
			</Link>
		</li>
	);
}
