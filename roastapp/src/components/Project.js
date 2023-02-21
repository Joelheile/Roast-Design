import {
	collection,
	deleteDoc,
	getDocs,
	doc,
	query,
	where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { db, storage } from "../firebase";

// import css
import CommentProject from "./CommentProject";

export default function Project(props) {
	const [projects, setProjects] = useState([]);
	const projectsCollectionRef = collection(db, "projects");

	const userID = useLocation(); // get userID from sign in / sign up
	let navigate = useNavigate();
	console.log(userID.state);

	const [url, setURL] = useState("");

	useEffect(() => {
		// called when page renders

		const getProjects = async () => {
			const q = query(
				collection(db, "projects"),
				where("userID", "==", userID.state)
			);

			const data = await getDocs(q);
			setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getProjects();
	}, []);

	// image dimensions
	const [state, setState] = useState([]);

	return (
		<div className="ml-10 flex flex-col">
			<div className="m-auto mt-5 mb-10">
				<div class="inline-flex h-80 w-80 flex-col items-center justify-start">
					<p class="font-dongle text-9xl text-gray-900">roast</p>
					<p class="mb-10 text-2xl text-gray-900">/maxmustermann</p>

					<button
						onClick={() => navigate("/project/new", { state: userID.state })}
						className="h-16 w-full rounded-full border-2 border-primary border-opacity-20 bg-primaryLight text-primary "
					>
						Need another roast?
					</button>
				</div>
			</div>
			<h2>Projects</h2>
			<div className="flex flex-wrap gap-5  ">
				{projects.map((projects) => {
					return (
						<>
							<Link
								to={{
									pathname: `/project/${projects.projectCheckID}`,
								}}
								state={{
									projectCheckID: projects.projectCheckID,
									title: projects.title,
									imageURL: projects.imageURL,
									userID: userID.state,
								}}
							>
								<div
									className="md:flex-column shrink  items-center justify-center rounded-2xl border border-gray-200 bg-white align-middle shadow  hover:bg-hover"
									key={projects.projectCheckID}
								>
									<div className="">
										<h1 className="text-m   text-black ">{projects.title}</h1>

										<img
											className="w-40 rounded-2xl"
											src={projects.localImageURL}
										/>
									</div>
								</div>
							</Link>
						</>
					);
				})}
			</div>
			<Routes>
				<Route path="/project/:id" element={<CommentProject />} />
			</Routes>
		</div>
	);
}
