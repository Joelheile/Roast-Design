import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
	"https://zvchclcaprpzykvfkoxr.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y2hjbGNhcHJwenlrdmZrb3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU4MTA5ODIsImV4cCI6MTk5MTM4Njk4Mn0.Z4cu3-ZcqcAYvB17Wyy5qiiluymXCo_NuaXD4OZW3SA"
);

export default supabase;
