'use client';

import { useEffect, useRef } from "react";

import { useMetroContext } from "../../context";
import { usePanoramaItemEffects } from "./effects";


export default function PanoramaItem({ header, children }) {
	const { panorama } = useMetroContext();
	const thisSlideRef = useRef<null | HTMLDivElement>(null);

	usePanoramaItemEffects({ panorama, thisSlideRef });

	const titleSpacer = !panorama || panorama.title;

	return <div
		className="embla__slide page-container px-0 mx-0 w-screen"
		style={{ opacity: 0 }}
		ref={thisSlideRef}
	>
		<div className="page-container">
			{titleSpacer && <span
				className="h1 opacity-0 pointer-events-none"
				// ref={h1Ref}
				// aria-hidden="true"
			>&nbsp;</span>}
			<h3>{header}</h3>
			{children}
		</div>
	</div>;
}
