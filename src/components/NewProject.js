import {
	collection,
	getDocs,
	addDoc,
	serverTimestamp,
	setDoc,
	doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
//import "../styles.css";
import { db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";

export default function NewProject(props) {
	let navigate = useNavigate();
	const [webUrl, setWebUrl] = useState("");
	const [title, setTitle] = useState("");
	const [imageUrls, setImageUrls] = useState([]);
	const [previewFile, setPreviewFile] = useState();

	const userID = useLocation(); // get userID passed from dashboard
	const projectCheckID = v4();

	const [showWebsite, setShowWebsite] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [showErrorAlertURLandImage, setShowErrorAlertURLandImage] =
		useState(false);
	const [showErrorAlertTitle, setShowErrorAlertTitle] = useState(false);

	const [projectImages, setProjectImages] = useState(
		JSON.parse(localStorage.getItem(`projectImages-${projectCheckID}`)) || []
		// TODO: Upload local storage to Firebase
	);

	const [imageUpload, setImageUpload] = useState(null);
	const localImageURL = "";

	// create project

	const createProject = async () => {
		if (title === "") {
			setShowErrorAlertTitle(true);
			return;
		}
		if (imageUpload == null && webUrl === "") {
			console.log("failure");
			setShowErrorAlertURLandImage(true);
			return;
		} // when nothing selected then nothing

		// function to get preview Image on right side
		const imageRef = ref(
			storage,
			`images/${userID.state}/${projectCheckID}/${imageUpload?.name + v4()}`
		);
		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			});
		});

		// set doc with custom id
		await setDoc(doc(db, "projects", projectCheckID), {
			userID: userID.state,
			title: title,
			projectCheckID: projectCheckID,
			imageURL: imageRef?.fullPath,
			websiteURL: webUrl,
			localImageURL: `${previewFile}`,
			timestamp: serverTimestamp(),
		});
		// navigate("/success", { state: projectCheckID });
		setShowAlert(true);
	};

	const copyText = `roast.design/project/${projectCheckID}`;

	return (
		<div className="flex grid h-screen grid-cols-2 items-center justify-center">
			<div className="m-auto flex w-1/2 flex-col justify-center ">
				<input
					className="mb-10 w-40 border-b-2 border-primaryLight py-2 px-4 text-2xl text-primary  placeholder-primaryMid !outline-none transition-all duration-300 ease-in-out focus:w-64  focus:border-primaryMid"
					placeholder="project title"
					onChange={(event) => {
						setTitle(event.target.value);
						console.log(title);
					}}
				/>
				<input
					className="mb-5  rounded-full border border-primaryLight bg-primaryLight py-2 px-4 text-primary placeholder-primaryMid  !outline-none focus:border-primaryLight "
					placeholder="Insert Link"
					onChange={(event) => {
						setWebUrl(event.target.value);
						setImageUpload(null);
						console.log(webUrl.length);
						setShowWebsite(true);
						setShowImage(false);
					}}
				/>

				<input
					className="h-15 mb-12 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-primaryLight file:py-2  file:px-4 file:text-sm file:text-primaryMid hover:file:border-primaryMid hover:file:text-primary"
					type="file"
					// button deactivate if another chosen
					onChange={(event) => {
						if (webUrl.length == 0) {
							setImageUpload(event.target.files[0]);
							setShowImage(true);
							setShowWebsite(false);
							setPreviewFile(URL.createObjectURL(event.target.files[0]));
						} else {
							alert("You've already entered a website");
						}
					}}
				/>

				<button
					className="w-full rounded-2xl bg-primary py-2 px-4  text-white hover:bg-primaryHover"
					onClick={createProject}
				>
					Create
				</button>
			</div>
			{/* Right Side */}
			<div className="flex w-1/2 flex-col">
				<h1 className="mb-5 text-2xl  font-semibold text-primary">Preview</h1>
				<div className="border-4 border-primaryLight">
					{showWebsite && (
						<iframe
							id="print"
							src={webUrl}
							width={750}
							height={500}
							sandbox="allow-scripts allow-modal"
							loading="eager"
						></iframe>
					)}
					{showImage && <img src={previewFile} className="max-h-[60vh]" />}
				</div>
			</div>
			<div className="center fixed bottom-0 flex w-96 flex-col self-center justify-self-center ">
				{showAlert && (
					<Alert status="success">
						<AlertIcon />
						<AlertTitle>Great!</AlertTitle>
						<AlertDescription>The project was created</AlertDescription>
						<button
							className="ml-5 rounded-xl border border-primary bg-primary p-1 font-medium text-white hover:bg-primaryHover hover:shadow-2xl"
							onClick={() => {
								navigator.clipboard.writeText(copyText);

								navigate("/project", { state: userID.state });
							}}
						>
							Get Link
						</button>
					</Alert>
				)}
				{showErrorAlertTitle && (
					<Alert status="error">
						<AlertIcon />
						<AlertTitle>Oh!</AlertTitle>
						<AlertDescription>You have to enter a title</AlertDescription>
					</Alert>
				)}
				{showErrorAlertURLandImage && (
					<Alert status="error">
						<AlertIcon />
						<AlertTitle>Oh!</AlertTitle>
						<AlertDescription>
							You have to enter an url or an image
						</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	);
}
