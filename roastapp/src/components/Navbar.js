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
			<button className="hover:shadow-md text-black font-bold py-2 px-4 rounded" onClick={signout}>
				SignOut
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
