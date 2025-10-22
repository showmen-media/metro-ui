
export default function PanoramaItem({ header, children }) {
	return (
		<div className="embla__slide page-container mx-0 w-screen">
			<div className="">
				<h2>{header}</h2>
				{children}
			</div>
		</div>
	);
}
