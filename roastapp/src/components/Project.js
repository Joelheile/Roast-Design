import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import "firebase/storage";
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

	const [url, setURL] = useState();

	useEffect(() => {
		// called when page renders

		const getProjects = async () => {
			const data = await getDocs(projectsCollectionRef);
			setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // we only want name and id
		};
		const funcImages = async () => {
			const reference = ref(storage, projects.imageURL);
			await getDownloadURL(reference).then((x) => {
				// x is just parameter
				console.log(url);
				setURL(x);
			});
		};

		getProjects();
		funcImages();
	}, []);

	// image dimensions

	return (
		<div className="flex flex-col ">
			<div className="m-auto mt-5 mb-10">
				<button
					onClick={() => navigate("/project/new", { state: userID.state })}
					className=" text-m rounded-2xl  border border-gray-300 p-10 py-2 px-4 text-black hover:bg-hover "
				>
					Need another roast?
				</button>
			</div>
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
									className="shrink items-center  justify-center rounded-lg border border-gray-200 bg-white align-middle shadow hover:bg-hover  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row"
									key={projects.projectCheckID}
								>
									<div className="m-1">
										<img
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
											className="h-20 rounded-t-lg  border md:rounded-lg"
										/>
										<h1 className="text-m   text-black dark:text-white">
											{projects.title}
										</h1>
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
