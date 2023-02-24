/*
Update docs:
https://youtu.be/jCY6DH8F4oc?t=1920
*/
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	collection,
	deleteDoc,
	getDocs,
	doc,
	addDoc,
	updateDoc,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Draggable from "react-draggable";
import firebase from "firebase/app";
import "firebase/storage";
import { v4 } from "uuid";
import "../styles/speechbubble.css";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@chakra-ui/react";

const CommentProject = (props) => {
	const location = useLocation(); // get userID from sign in / sign up
	const data = location.state;

	let navigate = useNavigate();
	const { id } = useParams();
	const [content, setContent] = useState([]);

	const [url, setURL] = useState();
	useEffect(() => {
		// one time loading
		const func = async () => {
			const reference = ref(storage, data.imageURL);
			await getDownloadURL(reference).then((x) => {
				// x is just parameter
				setURL(x);
			});
		};
		func();
	}, []);

	// position

	const [position, setPosition] = useState({});
	const trackPos = (data, id) => {
		setPosition({ x: data.x, y: data.y });
		console.log(position);
	};

	// image dimensions
	const [imageDimensions, setImageDimensions] = useState({});
	const imageUrl = url;
	const loadImage = (setImageDimensions, imageUrl) => {
		const img = new Image();
		img.src = imageUrl;

		img.onload = () => {
			setImageDimensions({
				height: img.height,
				width: img.width,
			});
		};
		img.onerror = (err) => {
			console.log("img error");
			console.error(err);
		};
	};
	useEffect(() => {
		loadImage(setImageDimensions, imageUrl);
	}, []);

	const commentID = v4();
	const [item, setItem] = useState("");
	const [items, setItems] = useState(
		JSON.parse(
			localStorage.getItem(`projectComments-${data.projectCheckID}`)
		) || []
		// TODO: Upload local storage to Firebase
	);

	const newitem = () => {
		if (item.trim() !== "") {
			const newitem = {
				id: commentID,
				item: item,
				defaultPos: { x: 100, y: 0 },
			};
			setItems((items) => [...items, newitem]);
			setItem("");
		} else {
			alert("Enter a item");
			setItem("");
		}

		// TODO: hier muss createComment hin
		const commentsCollectionRef = collection(
			db,
			`projects/${data.projectCheckID}/${commentID}`
		);

		const createComment = async () => {
			await addDoc(commentsCollectionRef, {
				projectCheckID: data.projectCheckID,
				content: item,
				xCoordinate: position.x.toFixed(0),
				yCoordinate: position.y.toFixed(0),
				commentID: commentID,
				timestamp: serverTimestamp(),
			});
			console.log("Comment");
		};
		createComment();
	};

	const keyPress = (event) => {
		var code = event.keyCode || event.which;
		if (code === 13) {
			newitem();
		}
	};

	useEffect(() => {
		localStorage.setItem(
			`projectComments-${data.projectCheckID}`,
			JSON.stringify(items)
		);
	}, [items]);

	const updatePos = (e, data, id) => {
		let elementPosition = { ...position };
		const elementID = e.target.id;
		elementPosition[elementID] = {};
		elementPosition[elementID]["x"] = data.x;
		elementPosition[elementID]["y"] = data.y;
		setPosition(elementPosition, elementID);

		const elementX = data.x;
		const elementY = data.y;
	};

	const deleteNote = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	return (
		<>
			<div className="flex">
				<div
					// links
					className="mt-10 flex w-3/4 flex-row items-center justify-center"
				>
					<div>
						<div id="new-item" className="flex justify-between">
							<div>
								<input
									className="text-m mr-2 mb-5 shrink rounded-2xl  border border-gray-300 p-10 py-2 px-4 text-black outline-none hover:bg-hover"
									value={item}
									onChange={(e) => setItem(e.target.value)}
									placeholder="Enter something..."
									onKeyPress={(e) => keyPress(e)}
								/>
								<button
									className="w-auto rounded-2xl bg-primary py-2 px-4 font-medium text-white hover:bg-primaryHover"
									onClick={newitem}
								>
									ENTER
								</button>
							</div>
							<button
								onClick={() => navigate("/project", { state: data.userID })}
								href="#_"
								class=" group relative inline-flex h-12 w-32 items-center justify-center overflow-hidden rounded-3xl border-2 border-primary bg-primary p-2 px-3 py-2 font-medium text-white shadow-md transition duration-300 ease-out"
							>
								<span class="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-primary text-white duration-300 group-hover:translate-x-0">
									<svg
										class="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14 5l7 7m0 0l-7 7m7-7H3"
										></path>
									</svg>
								</span>
								<span class=" font-m ease absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">
									All projects
								</span>
								<span class="invisible relative">Button Text</span>
							</button>
						</div>
						<div id="items">
							{items.map((item, index) => {
								return (
									<Draggable
										key={item.id}
										defaultPosition={item.defaultPos}
										onStop={updatePos}
										onDrag={trackPos}
									>
										<button
											id="delete"
											onDoubleClick={(e) => deleteNote(item.id)}
										>
											<div className="inline-block w-auto cursor-pointer flex-row rounded-xl p-5 text-white">
												<div className="speech-bubble">
													<p style={{ margin: 0 }}>{item.item} </p>
												</div>
											</div>
										</button>
									</Draggable>
								);
							})}
							<img
								className="h-screen max-h-[60vh] rounded-xl"
								src={url}
								onError={(event) => (event.target.style.display = "none")}
							/>
							<div className="">
								<iframe
									src={data.websiteURL}
									width={1000}
									height={10000}
									sandbox="allow-scripts allow-modal"
									loading="eager"
								></iframe>
							</div>
						</div>
					</div>
				</div>

				<div
					// rechts
					className="border-1.5 m-4 mr-20  w-1/4 border-solid"
				>
					<div className=" mb-10  flex w-96 flex-col justify-self-center">
						<Alert status="info" className="mb-5">
							<AlertIcon />
							Double click to delete a comment
						</Alert>
					</div>

					<h2 className="mb-6 text-3xl font-medium text-primary">
						Feed Design
					</h2>
					{items.map((item, index) => {
						return (
							<>
								<div className="md:flex-column mb-5 items-center justify-center rounded-2xl border border-primaryLight bg-primaryLight align-middle shadow ">
									<div className="m-3">
										<p>{item.item}</p>
									</div>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
};
export default CommentProject;

/*
ZUM DRAUF ZUGREIFEN:
	projectCheckID: projects.projectCheckID,
								title: projects.title,
								userID: userID.state,
								imageURL: projects.imageURL,
*/
