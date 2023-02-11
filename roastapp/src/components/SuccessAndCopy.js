import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

export default function SuccessAndCopy(props) {
	const projectCheckID = useLocation(); // get userID from sign in / sign up
	let navigate = useNavigate();

	const copyText = `roast.design/project/${projectCheckID.state}`;

	return (
		<div>
			<h1>Success!</h1>
			<p>{projectCheckID.state}</p>
			<div className="copy">
				<h3>{copyText}</h3>
				<button
					onClick={() => {
						navigator.clipboard.writeText(copyText);
						alert("Copied");
					}}
				>
					Copy
				</button>
			</div>
		</div>
	);
}
