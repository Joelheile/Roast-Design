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
	const [webUrl, setWebUrl] = useState("");
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
			title: webUrl,
			userID: userID.state,
			projectCheckID: projectCheckID,
			imageURL: imageRef.fullPath,
		});

		navigate("/success", { state: projectCheckID });
	};
	// webview

	return (
		<div className="flex grid h-screen grid-cols-2 items-center justify-center">
			<div class="m-auto flex w-1/2 flex-col justify-center ">
				<h1 className="mb-5 text-2xl font-semibold text-primary">New Roast</h1>
				<input
					className="mb-5  rounded-full border border-primaryLight bg-primaryLight py-2 px-4 text-primaryMid placeholder-primaryMid  !outline-none focus:border-primaryLight "
					placeholder="Insert Link"
					onChange={(event) => {
						setWebUrl(event.target.value);
						console.log(webUrl.length);
					}}
				/>

				<input
					className="h-15 mb-12 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-primaryLight file:py-2  file:px-4 file:text-sm file:text-primaryMid hover:file:border-primaryMid"
					type="file"
					// button deactivate if another chosen
					onChange={(event) => {
						if (webUrl.length == 0) {
							setImageUpload(event.target.files[0]);
							setPreviewFile(URL.createObjectURL(event.target.files[0]));
						} else {
							alert("You've already entered a website");
						}
					}}
				/>

				<button
					className="w-full rounded-2xl bg-primary py-2 px-4  text-white hover:bg-primaryMid"
					onClick={createProject}
				>
					Create
				</button>
			</div>
			<div className="flex w-1/2 flex-col">
				<h1 className="mb-5 text-2xl  font-semibold text-primary">Preview</h1>
				<img src={previewFile} className="h-screen max-h-[60vh]" />
				<br></br>
				<iframe
					src={webUrl}
					width={1000}
					height={500}
					sandbox="allow-scripts allow-modal"
					loading="eager"
				></iframe>
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
