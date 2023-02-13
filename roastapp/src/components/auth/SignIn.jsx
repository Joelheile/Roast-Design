import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../../firebase";
import styles from "../../index.css"



const SignIn = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        
        navigate("/project", {state: userCredential.user.uid})
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signUpNav = () => {
    navigate('/signup');
} 

  return (
    <div >
<div class="w-screen flex  justify-center items-center ">
  <form class="bg-white  rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4 ">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border  rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-primary hover:bg-primaryLight text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={signIn}>
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-primary hover:text-primaryLight"  onClick={signUpNav}>
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