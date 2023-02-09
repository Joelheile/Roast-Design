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
        await addDoc(collection(db, "users", userCredential.user.uid), {email, userID: userCredential.user.uid, timestamp: serverTimestamp()}, ).then((re) => {alert("yes the data has been enteres")})
        navigate("/dashboard", {state: userCredential.user.uid})
      
      })
      .catch((error) => {
        console.log(error);
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
