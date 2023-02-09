// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// eigentlich .env reinmachen
const firebaseConfig = {
	apiKey: "AIzaSyCd_8rAhN639jO_jfbsWMvGSF7UR9VPUYM",
	authDomain: "roastapp-b0ba0.firebaseapp.com",
	projectId: "roastapp-b0ba0",
	storageBucket: "roastapp-b0ba0.appspot.com",
	messagingSenderId: "819772824997",
	appId: "1:819772824997:web:005c308328ba6e4a029c4c",
	measurementId: "G-VXMRDFJCXC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
