import { collection, getDocs, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import "../styles.css";
import { db } from "../firebase";

export default function NewProject() {
	const [newProject, setNewProject] = useState("");
	const projectsCollectionRef = collection(db, "projects");

	const createProject = async () => {
		await addDoc(projectsCollectionRef, {
			title: newProject,
			userID: "",
		});
	};

	return (
		<div>
			<body>
				<div class="row">
					<div class="column">
						<div>
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
