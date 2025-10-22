
export default function Menu({ className, children }) {
	return <div className={["flex flex-col", className].filter(Boolean).join(' ')}>
		{children}
	</div>;
}
