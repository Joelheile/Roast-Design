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
        alert("There is already an account with this mail")
        navigate("/")
      });
  };

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
      <button class="bg-primary hover:bg-primaryLight text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={signUp}>
        Create Account
      </button>
      
    </div>
  </form>
  
</div>
    </div>
    
  );
};
export default SignUp;

/*
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
*/