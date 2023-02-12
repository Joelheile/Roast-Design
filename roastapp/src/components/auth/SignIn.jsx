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
    <div className="text-3xl font-bold underline">
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
  );
};
export default SignIn;
