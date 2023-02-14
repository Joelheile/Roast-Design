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
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Draggable from "react-draggable";
import firebase from "firebase/app";
import "firebase/storage";
import { v4 } from "uuid";

const CommentProject = (props) => {
	const location = useLocation(); // get userID from sign in / sign up
	const data = location.state;
	console.log(data);
	let navigate = useNavigate();

	const { id } = useParams();
	const [url, setURL] = useState();
	const [content, setContent] = useState([]);

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

	const [position, setPosition] = useState({ x: 0, y: 0 });
	const trackPos = (data) => {
		setPosition({ x: data.x, y: data.y });
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
		console.log(imageDimensions);
	}, []);

	// create comment
	const commentID = v4();
	const [item, setItem] = useState("");
	const [items, setItems] = useState(
		JSON.parse(localStorage.getItem("items")) || []
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
		const commentsCollectionRef = collection(db, "comments");

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
		localStorage.setItem("items", JSON.stringify(items))
		console.log(items);
		// Firebase update project => not comments => Array for comments inside of projects folder as json
		
	}, [items]);


	const updatePos = (e, data) => {
		let elementPosition = {...position}
		const elementID = e.target.id;
		elementPosition[elementID] = {};
		elementPosition[elementID]["x"] = data.x;
		elementPosition[elementID]["y"] = data.y;
		setPosition(elementPosition)
		console.log("x" + data.x + ", y" + data.y)
		const elementX = data.x;
		const elementY = data.y;
		/*
		let newArr = [...items];
		newArr[index].defaultPos = { x: data.x, y: data.y };
		setItems(newArr);
		*/

		// TODO: Fehler bei updatee
		const docUpdateRef = doc(db, "comments", elementID);
		// TODO: hier muss update funktion rein
		updateDoc(docUpdateRef, {
			xCoordinate: elementX,
			yCoordinate: elementY,
		}).then((docUpdateRef) => {
			console.log("it was updated");
		});
	};

	const deleteNote = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	// end comment

	return (
		<div className="mt-20 flex flex-row items-center justify-center">
			<div>
				<div id="new-item">
					<input
						className="text-m mr-2 mb-5 shrink  rounded-2xl border border-gray-300 p-10 py-2 px-4 text-black hover:bg-hover"
						value={item}
						onChange={(e) => setItem(e.target.value)}
						placeholder="Enter something..."
						onKeyPress={(e) => keyPress(e)}
					/>
					<button
						className="w-auto rounded-2xl bg-primary py-2 px-4 font-bold text-white hover:bg-primaryLight"
						onClick={newitem}
					>
						ENTER
					</button>
				</div>
				<div id="items">
					{items.map((item, index) => {
						return (
							<Draggable
								key={item.id}
								defaultPosition={item.defaultPos}
								onStop={updatePos}
								
								onDrag={(e, data) => trackPos(data)}
							>
								<div className="inline-block w-auto cursor-pointer flex-row rounded-xl bg-secondary p-2.5 text-white">
									<p style={{ margin: 0 }}>{item.item}</p>
								
									<button id="delete" onClick={(e) => deleteNote(item.id)}>
										X
									</button>
								</div>
							</Draggable>
						);
					})}

					<img className="w-1/2 rounded-xl" src={url} />
				</div>
			</div>
		</div>
	);
};
export default CommentProject;

/*
ZUM DRAUF ZUGREIFEN:
	projectCheckID: projects.projectCheckID,
								title: projects.title,
								imageURL: projects.imageURL,
								userID: userID.state,
*/
