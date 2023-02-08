// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
