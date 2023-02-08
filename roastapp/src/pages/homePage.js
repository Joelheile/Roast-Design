import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";
import "../styles/homePage.css";

import React, { useEffect, useState } from "react";
import NewProject from "./newProject";

const supabase = createClient(
	"https://zvchclcaprpzykvfkoxr.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y2hjbGNhcHJwenlrdmZrb3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU4MTA5ODIsImV4cCI6MTk5MTM4Njk4Mn0.Z4cu3-ZcqcAYvB17Wyy5qiiluymXCo_NuaXD4OZW3SA"
);

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

	return (
		<div className="App">
			<header className="App-header">
				{Object.keys(user).length !== 0 ? ( // check if user object is emtpy or not
					// einfach ob er die success URL eingegeben hat und login umgehen möchte
					<>
						<div>
							<h1>Roast</h1>
							<button id="newPage" onClick={() => navigate("/new")}>
								Need another roast?
							</button>
						</div>
						<button id="signout" onClick={() => signOutUser()}>
							Sign out
						</button>
					</>
				) : (
					<>
						<h1>User is not logged in</h1>
						<button
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
