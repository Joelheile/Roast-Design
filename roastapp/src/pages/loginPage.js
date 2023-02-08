import {createClient} from "@supabase/supabase-js";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react";
import {useNavigate} from "react-router-dom";

const supabase = createClient(
    "https://zvchclcaprpzykvfkoxr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y2hjbGNhcHJwenlrdmZrb3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU4MTA5ODIsImV4cCI6MTk5MTM4Njk4Mn0.Z4cu3-ZcqcAYvB17Wyy5qiiluymXCo_NuaXD4OZW3SA"
)

function Login() {
    const navigate = useNavigate(); // funcionality to send user around

    supabase.auth.onAuthStateChange(async (event) => { //if user logs out or signs in
        if (event !== "SIGNED_OUT"){
            //forward to success URL
            navigate("/success")

        }else{
            // forward to localhost:3000
            navigate("/")
        }
    }) 

  return (
    <div className="App">
      <header className="App-header">
        <Auth 
            supabaseClient={supabase} // supabase variable of above
            appearance={{theme: ThemeSupa}}
            theme="light"
            providers={["discord"]} // evtl. noch Google hinzufügen
        />
      </header>
    </div>
  );
}

export default Login;
