/*
Update docs:
https://youtu.be/jCY6DH8F4oc?t=1920
*/

import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const CommentProject = (props) => {
	const location = useLocation(); // get userID from sign in / sign up
	console.log(location);
	let navigate = useNavigate();

	const { id } = useParams();

	return (
		<div>
			<h1>Project {id}</h1>
			<p>{location.state.projectCheckID}</p>
		</div>
	);
};
export default CommentProject;
