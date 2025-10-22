
export default function Panorama({ title, children }) {
	return <div>
		{title && <h1>
			<span>{title}</span>
		</h1>}
		{children}
	</div>;
}
