import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";

export default function Dashboard() {
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

	return (
		<div>
			<h1>Dashbaord</h1>
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
