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
	};

	const keyPress = (event) => {
		var code = event.keyCode || event.which;
		if (code === 13) {
			newitem();
		}
	};

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	}, [items]);

	const updatePos = (data, index) => {
		let newArr = [...items];
		newArr[index].defaultPos = { x: data.x, y: data.y };
		setItems(newArr);
	};

	const deleteNote = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const commentsCollectionRef = collection(db, "comments");

	const createComment = async () => {
		await addDoc(commentsCollectionRef, {
			projectCheckID: data.projectCheckID,
			content: "",
			xCoordinate: position.x.toFixed(0),
			yCoordinate: position.y.toFixed(0),
			commentID: commentID,
		});
		console.log("Comment");
	};

	return (
		<div>
			<h1>Project Edit {id}</h1>
			<p>User {data.userID}</p>
			<p>
				<b>Height:</b> {imageDimensions.height}{" "}
			</p>
			<p>
				<b>Width:</b> {imageDimensions.width}{" "}
			</p>

			<div>
				<div id="new-item">
					<input
						value={item}
						onChange={(e) => setItem(e.target.value)}
						placeholder="Enter something..."
						onKeyPress={(e) => keyPress(e)}
					/>
					<button onClick={newitem}>ENTER</button>
				</div>
				<div id="items">
					{items.map((item, index) => {
						return (
							<Draggable
								key={item.id}
								defaultPosition={item.defaultPos}
								onStop={(e, data) => {
									updatePos(data, index);
								}}
							>
								<div style={{ backgroundColor: item.color }} className="box">
									<p style={{ margin: 0 }}>{item.item}</p>
									<button id="delete" onClick={(e) => deleteNote(item.id)}>
										X
									</button>
								</div>
							</Draggable>
						);
					})}
					<img className="commentImage" src={url} />
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
