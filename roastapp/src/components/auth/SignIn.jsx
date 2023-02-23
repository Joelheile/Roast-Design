import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../../firebase";
import styles from "../../index.css";
import Team from "../../assets/Team.svg";

const SignIn = () => {
	let navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential);

				navigate("/project", { state: userCredential.user.uid });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const signUpNav = () => {
		navigate("/signup");
	};

	const [passwordShown, setPasswordShown] = useState(false);

	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};

	return (
		// left and right split
		<div className="mt-36 ml-24 flex w-screen flex-row justify-evenly ">
			<div
				// left
				className="mr-10 inline-flex  flex-col "
			>
				<div className="flex flex-col items-start justify-end">
					<h1 className="mb-3 text-3xl font-bold">Welcome dear roaster.</h1>
					<h3>We don't add comments. People do.</h3>
					<h3>Get better feedback directly on your media</h3>
				</div>
				<div></div>
			</div>
			<div class="mr-48 flex">
				<form class="mb-4 flex flex-col rounded bg-white ">
					<div class="mb-4">
						<h1 className=" mb-5 text-2xl font-semibold text-primary">
							Sign in
						</h1>

						<input
							className="focus:shadow-outline w-72 rounded-md bg-primaryLight p-3 py-3  px-3 placeholder-primaryMid outline-none transition-all duration-300 ease-in-out hover:w-80"
							id="username"
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
					<div className="flex flex-row justify-between">
						<a
							class="inline-block align-baseline text-sm text-primary hover:text-primaryHover"
							onClick={signUpNav}
						>
							No account?
						</a>
						<a class="inline-block align-baseline text-sm text-darkgrey hover:text-primaryHover">
							Forgot password?
						</a>
					</div>
					<div class="flex items-center justify-between">
						<button
							class="focus:shadow-outline mt-10 h-10 w-full rounded bg-primary py-2 px-4 text-sm text-white transition-all duration-300 hover:h-12  focus:outline-none"
							type="button"
							onClick={signIn}
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignIn;

/*
<div className="">
      <form onSubmit={signIn}>
      <h1 className="text-primary">
      Hello world!
    </h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>

      <button onClick={signUpNav}>Not signed in yet?</button>

    </div>

    */
