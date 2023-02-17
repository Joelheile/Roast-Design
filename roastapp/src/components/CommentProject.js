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
import "../styles/speechbubble.css"

const CommentProject = (props) => {
	const location = useLocation(); // get userID from sign in / sign up
	const data = location.state;
	console.log(data);
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
		
		console.log("iteM" +  item)
		console.log("itemS:" + items);
		// Firebase update project => not comments => Array for comments inside of projects folder as json
		
	}, [items]);


	const updatePos = (e, data, id) => {
		console.log("event:" + e);
		console.log("data:" + data);
		console.log("ID: " + position)
		let elementPosition = {...position}
		const elementID = e.target.id;
		elementPosition[elementID] = {};
		elementPosition[elementID]["x"] = data.x;
		elementPosition[elementID]["y"] = data.y;
		setPosition(elementPosition)
		console.log("x" + data.x + ", y" + data.y + " ID" + elementID)
		const elementX = data.x;
		const elementY = data.y;




		// ! Commentare in subcollections und diese bei update löschen und neu hochladen?
		// ! Oder Array vom local storage direkt hochladen
		// ? außerdem project ID noch in local storage packen, damit nur die richtigen kommentare übernommen werden :)

		/*
		let newArr = [...items];
		newArr[index].defaultPos = { x: data.x, y: data.y };
		setItems(newArr);
		*/

		
	};

	const deleteNote = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	// end comment

	return (
		<div className="flex">
		<div 
		// links
		className="mt-10 flex flex-row items-center justify-center w-3/4">
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

								onDrag={trackPos}
							>
								<div className="inline-block w-auto cursor-pointer flex-row rounded-xl p-5 text-white">
									<div className="speech-bubble">
									<p style={{ margin: 0 }}>{item.item}</p>
								
									<button id="delete" onClick={(e) => deleteNote(item.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

									</button>
									</div>
								</div>
							</Draggable>
						);
					})}

					<img className="h-screen max-h-[60vh] rounded-xl" src={url} />
				</div>
			</div>
		</div>
		<div
		// rechts
		className="border-solid border-2  w-1/4">
					<div 
					// ganz oben
					className="flex flex-row border-2 ">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
<form className="bg-primaryLighter">
  <label >
    <input type="text" name="Search" placeholder="Search" />
  </label>
</form>


					</div>
					{items.map((item, index) => {
						return (
							<>
							<h1>
								
								</h1></>
							
						);
					})}



		</div>
		</div>
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
