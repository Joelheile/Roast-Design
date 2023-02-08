import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { useState, useEffect } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

import Navbar from "../components/navbar";
import supabase from "../components/supabaseClient";
import "../styles/newProject.css";
import "../App.css";

function NewProject() {
	return (
		<body>
			<div class="row">
				<div class="column">
					<h1>New Roast</h1>
					<div>
						<button class="button">Upload Files</button>
					</div>
					<button class="button">Let's roast!</button>
				</div>
				<div class="column">
					<h1>col2</h1>
				</div>
			</div>
		</body>
	);
}

export default NewProject;
