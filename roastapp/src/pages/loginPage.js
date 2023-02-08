import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";
import supabase from "../components/supabaseClient";

function Login() {
	const navigate = useNavigate(); // funcionality to send user around

	supabase.auth.onAuthStateChange(async (event) => {
		//if user logs out or signs in
		if (event !== "SIGNED_OUT") {
			//forward to success URL
			navigate("/home");
		} else {
			// forward to localhost:3000
			navigate("/");
		}
	});

	return (
		<div className="App">
			<header className="App-header">
				<Auth
					supabaseClient={supabase} // supabase variable of above
					appearance={{ theme: ThemeSupa }}
					theme="light"
					providers={["discord"]} // evtl. noch Google hinzufügen
				/>
			</header>
		</div>
	);
}

export default Login;
