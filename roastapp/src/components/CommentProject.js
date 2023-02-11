/*
Update docs:
https://youtu.be/jCY6DH8F4oc?t=1920
*/
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Draggable from "react-draggable";
import firebase from "firebase/app";
import "firebase/storage";

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
				<Draggable onDrag={(e, data) => trackPos(data)}>
					<div className="box">
						<div>Here's my position...</div>
						<div>
							x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
						</div>
					</div>
				</Draggable>
				<img src={url} />
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
