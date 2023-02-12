import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { Component } from "react";

export default function Navbar() {
	return (
		<nav className="nav">
			<Link to="/project" className="Roast.design">
				Roast.design
			</Link>
			<ul>
				<CustomLink to="/signout">SignOut</CustomLink>
			</ul>
		</nav>
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
