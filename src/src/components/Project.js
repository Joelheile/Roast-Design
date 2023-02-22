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
	const [user, setUser] = useState([]);
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
		const getUser = async () => {
			const q = query(
				collection(db, "users"),
				where("userID", "==", userID.state)
			);
		};
		getProjects();
	}, []);

	// image dimensions
	const [state, setState] = useState([]);

	return (
		<div className="ml-10 flex flex-col">
			<div className="m-auto mt-5 mb-10">
				<div class="inline-flex h-80 w-80 flex-col items-center justify-start">
					<p class="font-dongle text-9xl text-gray-900">roast it!</p>
					<p class="mb-10 text-2xl text-gray-900">
						{/*HIER KOMMT USERNAME REIN, der eigentlich abgefragt wird*/}
					</p>

					{/*animated button*/}
					<button
						onClick={() => navigate("/project/new", { state: userID.state })}
						href="#_"
						class="group relative inline-flex w-48 items-center justify-center overflow-hidden rounded-full border-2 border-primaryMid bg-primaryLight p-4 px-6 py-3 font-medium text-primaryMid shadow-md transition duration-300 ease-out"
					>
						<span class="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-primaryMid text-white duration-300 group-hover:translate-x-0">
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
						<span class="ease absolute flex h-full w-full transform items-center justify-center text-primary transition-all duration-300 group-hover:translate-x-full">
							Need another roast?
						</span>
						<span class="invisible relative">Button Text</span>
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
