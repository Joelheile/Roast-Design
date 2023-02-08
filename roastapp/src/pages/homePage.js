import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";
import "../styles/homePage.css";
import "../App.css";
import supabase from "../components/supabaseClient";

import React, { useEffect, useState } from "react";
import NewProject from "./newProject";

function Home() {
	const [user, setUser] = useState({}); // object
	const navigate = useNavigate();

	useEffect(() => {
		async function getUserData() {
			// ask for currently logged in user
			await supabase.auth.getUser().then((value) => {
				// value.data.user is user object
				if (value.data?.user) {
					// if value.data is undefined it shouldn't try to get user property
					console.log(value.data.user);
					setUser(value.data.user);
				}
			});
		}
		getUserData(); // call function
	}, []); // useEffect is only going to run once

	async function signOutUser() {
		const { error } = await supabase.auth.signOut();
		navigate("/");
	}

	const [projects, setProjects] = useState([]);
	const [project, setProject] = useState({
		userID: "",
		title: "",
		images_url: [],
	});
	const { userID, title, images_url } = project; // destructure it to easier use in component

	useEffect(() => {
		fetchProjects();
	}, []);

	async function fetchProjects() {
		const { data } = await supabase.from("projects").select(setProjects(data));
		console.log("data: ", data);
	}

	return (
		<div className="App">
			<header className="App-header">
				{Object.keys(user).length !== 0 ? ( // check if user object is emtpy or not
					// einfach ob er die success URL eingegeben hat und login umgehen möchte
					<>
						<div>
							<h1>Roast</h1>
							<button
								id="ButtonNewPage"
								className="button"
								onClick={() => navigate("/new")}
							>
								Need another roast?
							</button>
						</div>
						{projects.map((project) => (
							<div key={project.id}>
								<h3>{project.userID}</h3>
								<p> HIER MÜSSEN BILDER ALS ARRAY HIN</p>
							</div>
						))}
						<button
							id="signout"
							className="button"
							onClick={() => signOutUser()}
						>
							Sign out
						</button>
					</>
				) : (
					<>
						<h1>User is not logged in</h1>
						<button
							className="button"
							onClick={() => {
								navigate("/");
							}}
						>
							Go back home!
						</button>
					</>
				)}
			</header>
		</div>
	);
}
export default Home;
