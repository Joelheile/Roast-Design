import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { db } from "../firebase";
import { storage } from "../firebase";
import "../styles.css";
import CommentProject from "./CommentProject";

export default function Project(props) {
	const [projects, setProjects] = useState([]);
	const projectsCollectionRef = collection(db, "projects");

	const userID = useLocation(); // get userID from sign in / sign up
	let navigate = useNavigate();
	console.log(userID.state);

	useEffect(() => {
		// called when page renders

		const getProjects = async () => {
			const data = await getDocs(projectsCollectionRef);
			setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // we only want name and id
		};
		getProjects();
	}, []);

	return (
		<div>
			<h1>Project</h1>
			<button onClick={() => navigate("/project/new", { state: userID.state })}>
				Ready for new roast?
			</button>
			<button
				onClick={() => navigate("/project/edit", { state: userID.state })}
			>
				Edit
			</button>
			<h2>{userID.state}</h2>
			{projects.map((projects) => {
				return (
					<div className="projectContainer" key={projects.projectCheckID}>
						<Link
							to={{
								pathname: `/project/${projects.projectCheckID}`,
							}}
							state={{
								projectCheckID: projects.projectCheckID,
								title: projects.title,
								imageURL: projects.imageURL,
								userID: userID.state,
							}}
						>
							<div className="card">
								<h1>{projects.title}</h1>
								<p>{projects.projectCheckID}</p>
							</div>
						</Link>
					</div>
				);
			})}
			<Routes>
				<Route path="/project/:id" element={<CommentProject />} />
			</Routes>
		</div>
	);
}
