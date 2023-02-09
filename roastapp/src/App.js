import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/AuthDetails";
import Project from "./components/Project";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles.css";
import NewProject from "./components/NewProject";
import SuccessAndCopy from "./components/SuccessAndCopy";
import CommentProject from "./components/CommentProject";

function App() {
	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route exact path="/" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signout" element={<AuthDetails />} />
				<Route path="/project" element={<Project />} />
				<Route path="/project/:id" element={<CommentProject />} />
				<Route path="/project/new" element={<NewProject />} />
				<Route path="/success" element={<SuccessAndCopy />} />
			</Routes>
		</div>
	);
}

export default App;

/*
<SignIn />
			<SignUp />
			<AuthDetails />


<Route path="/" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signout" element={<AuthDetails />} />
					<Route path="/project" element={<Project />} />
					<Route path="/project/:id" element={<CommentProject />} />
					<Route path="/project/new" element={<NewProject />} />
					<Route path="/success" element={<SuccessAndCopy />} />
            */
