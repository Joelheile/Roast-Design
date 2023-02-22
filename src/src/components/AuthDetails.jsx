// logout page

import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthDetails = () => {
	const navigate = useNavigate();
	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
		});

		return () => {
			listen();
		};
	}, []);

	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("sign out successful");
				navigate("/");
			})
			.catch((error) => console.log(error));
	};

	const homeHandler = () => {
		navigate("/");
	};
	return (
		<div className="flex w-screen flex-col justify-center align-middle">
			<div className="mt-48 self-center">
				{authUser ? (
					<>
						<p>{`Signed In as "${authUser.email}"`}</p>
						<button
							className="mt-3 w-auto rounded-2xl bg-primary py-2 px-4 font-bold text-white hover:bg-primaryHover"
							onClick={userSignOut}
						>
							Please sign me out
						</button>
					</>
				) : (
					<>
						<p>You're signed out.</p>
						<button
							className="mt-3 w-auto rounded-2xl bg-primary py-2 px-4 font-bold text-white hover:bg-primaryHover"
							onClick={homeHandler}
						>
							Go to homepage
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default AuthDetails;
