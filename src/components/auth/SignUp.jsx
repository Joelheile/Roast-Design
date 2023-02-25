import { createUserWithEmailAndPassword } from "firebase/auth";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	setDoc,
	Timestamp,
} from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@chakra-ui/react";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	let navigate = useNavigate();

	const [showAlert, setShowAlert] = useState(false);

	const signUp = (e) => {
		e.preventDefault();
		if (password === passwordConfirm) {
			createUserWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					// const ref = doc(db, "projects", userCredential.user.uid)
					// const docRef = await setDoc(ref, {email}, Timestamp)
					console.log(userCredential);

					const user = userCredential.user;
					const docRef = doc(db, "users", user.uid);
					await setDoc(docRef, {
						email,
						userID: user.uid,
						username: username,
						timestamp: serverTimestamp(),
					}).then((re) => {
						console.log("yes the data has been enteres");
					});
					navigate("/project", { state: user.uid });
				})
				.catch((error) => {
					console.log(error);
					alert("There is already an account with this mail");
					navigate("/");
				});
		} else {
			setShowAlert(true);
			console.log(showAlert);
		}
	};

	return (
		<>
			<div className="flex w-screen flex-col justify-center align-middle">
				{/* left and right split */}

				<div className="mt-36 ml-24 flex w-screen flex-row justify-evenly ">
					<div
						// left
						className="mr-10 inline-flex  flex-col"
					>
						<div className="flex flex-col items-start justify-end">
							<h1 className="mb-3 text-3xl font-bold">Welcome dear roaster.</h1>
							<h3>We don't add comments. People do.</h3>
							<h3>Get better feedback directly on your media</h3>
						</div>
						<div></div>
					</div>
					<div class="mr-48  flex">
						<form class="mb-4 flex flex-col rounded bg-white ">
							<div class="mb-4">
								<h1 className=" mb-5 text-2xl font-semibold text-primary">
									Sign in
								</h1>
								<div class="mb-4">
									<input
										className="focus:shadow-outline w-72 rounded-md bg-primaryLight p-3 py-3  px-3 placeholder-primaryMid outline-none transition-all duration-300 ease-in-out hover:w-80"
										id="username"
										type="text"
										placeholder="Enter username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<input
									className="focus:shadow-outline w-72 rounded-md bg-primaryLight p-3 py-3  px-3 placeholder-primaryMid outline-none transition-all duration-300 ease-in-out hover:w-80"
									id="mail"
									type="text"
									placeholder="Enter E-Mail"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div class="mb-6">
								<input
									className="focus:shadow-outline w-72 rounded-md bg-primaryLight p-3 py-3  px-3 placeholder-primaryMid outline-none transition-all duration-300 ease-in-out hover:w-80"
									id="password"
									type="password"
									placeholder="Enter Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div class="mb-6">
								<input
									className="focus:shadow-outline w-72 rounded-md bg-primaryLight p-3 py-3  px-3 placeholder-primaryMid outline-none transition-all duration-300 ease-in-out hover:w-80"
									id="password"
									type="password"
									placeholder="Confirm Password"
									value={passwordConfirm}
									onChange={(e) => setPasswordConfirm(e.target.value)}
								/>
							</div>

							<div class="flex items-center justify-between">
								<button
									class="focus:shadow-outline mt-10 h-10 w-full rounded bg-primary py-2 px-4 text-sm text-white transition-all duration-300 hover:h-12  focus:outline-none"
									type="button"
									onClick={signUp}
								>
									Create Account
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="center fixed bottom-0 flex w-96 self-center ">
					{showAlert && (
						<Alert status="error">
							<AlertIcon />
							<AlertTitle>Error!</AlertTitle>
							<AlertDescription>
								Email/ Password Did Not Matched.
							</AlertDescription>
						</Alert>
					)}
				</div>
			</div>
		</>
	);
};
export default SignUp;
