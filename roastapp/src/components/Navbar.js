import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom/dist";

export default function Navbar() {
	let navigate = useNavigate();
	const signout = () => {
		navigate("/signout");
	};
	const projectNav = () => {
		navigate("/project");
	};

	return (
		<div className="mb-5 rounded border-2 border-solid border-gray-200 bg-white px-2 py-2.5 sm:px-4">
			<nav className="container mx-auto flex flex-wrap items-center justify-between">
				<Link to="/project" className="text-xl font-bold">
					Roast.design
				</Link>
				<button
					className="rounded bg-primary py-2 px-4 font-bold text-white hover:bg-primaryLight"
					onClick={projectNav}
				>
					All projects
				</button>
				<button
					className=" display: block rounded py-2 px-4 font-bold text-black"
					onClick={signout}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6 hover:text-primaryLight"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
						/>
					</svg>
				</button>
			</nav>
		</div>
	);
}
