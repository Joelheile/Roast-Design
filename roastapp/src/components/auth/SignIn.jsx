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

	const [passwordShown, setPasswordShown] = useState(false);

	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};

	return (
		// left and right split
		<div>
			<div
			// left
			></div>
			<div class="flex w-screen  items-center justify-center ">
				<form class="mb-4  rounded bg-white px-8 pt-6 pb-8">
					<div class="mb-4">
						<h1 className=" mb-5 text-xl font-semibold">Sign in</h1>

						<input
							class="focus:shadow-outline text-gr appearance-none  rounded-md  bg-primaryLight p-2 py-2  px-3 focus:outline-none "
							id="username"
							type="text"
							placeholder="Enter E-Mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div class="mb-6">
						<input
							class="focus:shadow-outline text-gr appearance-none  rounded-md  bg-primaryLight p-2 py-2  px-3 focus:outline-none "
							id="password"
							type="password"
							placeholder="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<a
							class="inline-block align-baseline text-sm font-bold text-primary hover:text-primaryMid"
							onClick={signUpNav}
						>
							No account?
						</a>
						<a>Forgot password?</a>
					</div>
					<div class="flex items-center justify-between">
						<button
							class="focus:shadow-outline mt-5 rounded bg-primary py-2 px-4 text-sm text-white hover:bg-primaryMid focus:outline-none"
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
