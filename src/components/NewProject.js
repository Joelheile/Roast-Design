import { collection, getDocs, addDoc } from "firebase/firestore";
import React, { useState } from "react";
//import "../styles.css";
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
		<div className="flex grid grid-cols-2 items-center justify-center h-screen">
			
				
					<div class="flex flex-col w-1/2 m-auto justify-center ">
						<h1 className="text-2xl mb-5 text-primary font-bold">New Roast</h1>
						<input className="shrink border border-gray-300  hover:bg-hover text-black text-m py-2 px-4 rounded-2xl p-10 mb-5"
							placeholder="Title"
							onChange={(event) => {
								setNewProject(event.target.value);
							}}
						/>
						
						<input
						className="mb-12 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primaryLight file:bg-primary hover:file:bg-primaryLighter"
							type="file"
							onChange={(event) => {
								setImageUpload(event.target.files[0]);
								setPreviewFile(URL.createObjectURL(event.target.files[0]));
							}}
						/>
						

						<button 
						className="w-1/4 bg-primary hover:bg-primaryLight text-white font-bold py-2 px-4 rounded-2xl"
						onClick={createProject}>Create</button>
					</div>
					<div classN="flex flex-col w-1/2">
						<h1 className="text-2xl mb-5 text-primary font-bold">Preview</h1>
						<img src={previewFile} className="previewImage" />
						
					</div>
				
			
		</div>
	);
}

/*
<p>{projectCheckID}</p>
Image Preview is missing

{imageUpload && (
							<img src={URL.createObjectURL(setImageUpload)} height="100px" />
						)}

                        */
