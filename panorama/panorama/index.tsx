'use client';

import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { usePanoramaEffects } from "./effects";


export default function Panorama({ title, children }) {

	const h1Ref = useRef<null | HTMLHeadingElement>(null);
	const slidesContainerRef = useRef<null | HTMLDivElement>(null);
	const spacerRef = useRef<null | HTMLDivElement>(null);
	const [emblaRef, slider] = useEmblaCarousel({ inViewThreshold: .9 });

	usePanoramaEffects({ title, children, h1Ref, slidesContainerRef, spacerRef, slider });

	return (
		<div>
			{title && (
				<h1 className="h-0 page-container" ref={h1Ref}>
					{title}
					<span className="animate-fadeout">{/*
						make sure tailwind includes the class styles
					*/}</span>
				</h1>
			)}
			<div ref={spacerRef}>{/* spacer for scrolling */}</div>
			<div className="embla" ref={emblaRef} style={{ top: 0, right: 0, left: 0 }}>
				<div
					className="embla__container page-container p-0"
					ref={slidesContainerRef}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
