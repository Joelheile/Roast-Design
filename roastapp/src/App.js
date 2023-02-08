import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/AuthDetails";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles.css";
import NewProject from "./components/NewProject";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signout" element={<AuthDetails />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/new" element={<NewProject />} />
			</Routes>
		</div>
	);
}

export default App;

/*
<SignIn />
			<SignUp />
			<AuthDetails />
            */
