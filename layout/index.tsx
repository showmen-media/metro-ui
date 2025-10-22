
import AppBar from "./app-bar";

export default function MetroLayout({ children }) {
	return <div>
		{children}
		<AppBar />
	</div>;
}
