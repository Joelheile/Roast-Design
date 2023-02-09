import { collection, getDocs, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import "../styles.css";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";

export default function NewProject(props) {
	const [newProject, setNewProject] = useState("");
	const projectsCollectionRef = collection(db, "projects");
	const userID = useLocation(); // get userID passed from dashboard

	const createProject = async () => {
		await addDoc(projectsCollectionRef, {
			title: newProject,
			userID: userID.state,
		});
	};

	return (
		<div>
			<body>
				<div class="row">
					<div class="column">
						<div>
							<h2>{userID.state}</h2>
							<h1>New Roast</h1>
							<button class="button">Upload Files</button>
							<input
								placeholder="Title"
								onChange={(event) => {
									setNewProject(event.target.value);
								}}
							/>
						</div>
						<button onClick={createProject}>Create</button>
					</div>
					<div class="column">
						<h1>col2</h1>
					</div>
				</div>
			</body>
		</div>
	);
}
