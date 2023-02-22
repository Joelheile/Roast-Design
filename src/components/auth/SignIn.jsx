import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../../firebase";
import styles from "../../index.css";

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

	return (
		<div>
			<h1>Test</h1>

			<div className="flex w-screen  items-center justify-center ">
				<form className="mb-4  rounded bg-white px-8 pt-6 pb-8">
					<h1>Test</h1>
					<div className="mb-4 ">
						<label
							className="mb-2 block text-sm font-bold text-gray-700"
							for="username"
						>
							Username
						</label>
						<input
							className="focus:shadow-outline appearance-none rounded border  py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
							id="username"
							type="text"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label
							className="mb-2 block text-sm font-bold text-gray-700"
							for="password"
						>
							Password
						</label>
						<input
							className="focus:shadow-outline mb-3 appearance-none  rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
							id="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="focus:shadow-outline rounded bg-primary py-2 px-4 font-bold text-white hover:bg-primaryLight focus:outline-none"
							type="button"
							onClick={signIn}
						>
							Sign In
						</button>
						<a
							className="inline-block align-baseline text-sm font-bold text-primary hover:text-primaryLight"
							onClick={signUpNav}
						>
							No account?
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignIn;

/*
<div classNameName="">
      <form onSubmit={signIn}>
      <h1 classNameName="text-primary">
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
