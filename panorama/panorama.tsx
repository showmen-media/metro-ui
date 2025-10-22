'use client';

import useEmblaCarousel from "embla-carousel-react";


export default function Panorama({ title, children }) {

		const [emblaRef] = useEmblaCarousel({ loop: true });

		return (
			<div>
				{title && <h1>
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
