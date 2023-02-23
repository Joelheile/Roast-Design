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
	const newProjectNav = () => {
		navigate("/project/new");
	};

	return (
		<div className="mb-5  bg-primary px-2 py-2.5 ">
			<nav className="container mx-auto flex flex-wrap items-center justify-between">
				<Link
					to="/project"
					className="font-dongle text-5xl font-bold text-white"
				>
					Roast.design
				</Link>
				<div>
					<button
						className="rounded bg-primary py-2 px-4 font-medium text-white hover:bg-primaryHover"
						onClick={projectNav}
					>
						projects
					</button>
					<button
						className="rounded bg-primary py-2 px-4 font-medium text-white hover:bg-primaryHover"
						onClick={newProjectNav}
					>
						new roast
					</button>
				</div>
				<button
					className=" display: block rounded font-bold text-black"
					onClick={signout}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6 text-white hover:text-primaryMid"
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
