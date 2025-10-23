'use client';

import useEmblaCarousel from "embla-carousel-react";

import { useMetroInternalContext } from "../context";
import { useEffect } from "react";


export default function Panorama({ title, children }) {

		const [emblaRef] = useEmblaCarousel();

		const context = useMetroInternalContext();

		let effectRan;
		useEffect(() => {
			if (!effectRan) {
				if (context.publicContext.panoramaItems)
					throw new Error("You cannot use multiple panoramas in the same page!");
				effectRan = true;
			}

			context.setPanoramaItems(children);

			return () => context.setPanoramaItems(null);
		}, [children]);

		return (
			<div>
				{title && <h1 className="page-container">
					<span>{title}</span>
				</h1>}

				<div className="embla" ref={emblaRef}>
					<div className="embla__container page-container p-0">
						{children}
					</div>
				</div>
			</div>
		);
}
