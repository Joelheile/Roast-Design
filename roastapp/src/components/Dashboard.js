import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

export default function Dashboard(props) {
	const [projects, setProjects] = useState([]);
	const projectsCollectionRef = collection(db, "projects");
	useEffect(() => {
		// called when page renders

		const getProjects = async () => {
			const data = await getDocs(projectsCollectionRef);
			setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // we only want name and id
		};
		getProjects();
	}, []);
	/*
	const deleteProject = async (id) => {
		const projectDoc = doc(db, "projects", id);
		await deleteDoc(projectDoc);
	};
	*/

	const userID = useLocation(); // get userID from sign in / sign up
	let navigate = useNavigate();

	return (
		<div>
			<h1>Dashbaord</h1>
			<button onClick={() => navigate("/new", { state: userID.state })}>
				Ready for new roast?
			</button>
			<h2>{userID.state}</h2>
			{projects.map((projects) => {
				return (
					<div>
						<h1>{projects.title}</h1>
					</div>
				);
			})}
		</div>
	);
}
