import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/navbar.css";

import Login from "./pages/loginPage";
import Home from "./pages/homePage";
import NewProject from "./pages/newProject";
import Navbar from "./components/navbar";

function App() {
	return (
		<>
			<Navbar />
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<Home />} />
					<Route path="/new" element={<NewProject />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
