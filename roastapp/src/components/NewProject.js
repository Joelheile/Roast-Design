import { collection, getDocs, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import "../styles.css";
import { db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function NewProject(props) {
	let navigate = useNavigate();
	const [newProject, setNewProject] = useState("");
	const [imageUrls, setImageUrls] = useState([]);
	const [previewFile, setPreviewFile] = useState();

	const projectsCollectionRef = collection(db, "projects");
	const userID = useLocation(); // get userID passed from dashboard
	const projectCheckID = v4();

	const [imageUpload, setImageUpload] = useState(null);

	const createProject = async () => {
		if (imageUpload == null) return; // when nothing selected then nothing
		const imageRef = ref(
			storage,
			`images/${userID.state}/${projectCheckID}/${imageUpload.name + v4()}`
		);
		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			});
		});

		await addDoc(projectsCollectionRef, {
			title: newProject,
			userID: userID.state,
			projectCheckID: projectCheckID,
			imageURL: imageRef.fullPath,
		});
		console.log("Title" + newProject);

		navigate("/success", { state: projectCheckID });
	};

	return (
		<div>
			<body>
				<div class="row">
					<div class="column">
						<h1>New Roast</h1>
						<input
							type="file"
							onChange={(event) => {
								setImageUpload(event.target.files[0]);
								setPreviewFile(URL.createObjectURL(event.target.files[0]));
							}}
						/>
						<input
							placeholder="Title"
							onChange={(event) => {
								setNewProject(event.target.value);
							}}
						/>

						<button onClick={createProject}>Create</button>
					</div>
					<div class="column">
						<h1>Preview</h1>
						<img src={previewFile} className="previewImage" />
						<p>{projectCheckID}</p>
					</div>
				</div>
			</body>
		</div>
	);
}

/*

Image Preview is missing

{imageUpload && (
							<img src={URL.createObjectURL(setImageUpload)} height="100px" />
						)}

                        */
