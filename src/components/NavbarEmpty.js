import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom/dist";

// currently not used, but maybe later
export default function NavbarEmpty() {
	let navigate = useNavigate();
	const signout = () => {
		navigate("/signout");
	};
	const projectNav = () => {
		navigate("/project");
	};

	return <></>;
}
