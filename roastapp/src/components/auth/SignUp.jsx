import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // const ref = doc(db, "projects", userCredential.user.uid)
        // const docRef = await setDoc(ref, {email}, Timestamp)
        console.log(userCredential);
       
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid)
        await setDoc(docRef,{email, userID: user.uid, timestamp: serverTimestamp()})
        .then((re) => {console.log("yes the data has been enteres")})
        navigate("/project", {state: user.uid})
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry there is already an account with this mail")
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUp;
