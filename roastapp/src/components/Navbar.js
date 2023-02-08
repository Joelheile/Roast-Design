import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="nav">
			<Link to="/" className="Roast.design">
				Site Name
			</Link>
			<ul>
				<CustomLink to="/new">New</CustomLink>
				<CustomLink to="/signout">SignOut</CustomLink>
			</ul>
		</nav>
	);
}

function CustomLink({ to, children, ...props }) {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<li className={isActive ? "active" : ""}>
			<Link to={to} {...props}>
				{children}
			</Link>
		</li>
	);
}
