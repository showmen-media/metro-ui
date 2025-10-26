'use client';

import { useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import useEmblaCarousel from "embla-carousel-react";

import { useMetroInternalContext } from "../context";


export default function Panorama({ title, children }) {

		const [emblaRef, emblaApi] = useEmblaCarousel({ inViewThreshold: .9 });

		const metro = useMetroInternalContext();

		let effectRan;
		useEffect(() => {
			if (!emblaApi) return;
			const { slidesInView, scrollTo } = emblaApi;
			const visibleIndices$ = new BehaviorSubject<number[] | null>(slidesInView());
			emblaApi.on('scroll', () => visibleIndices$.value && visibleIndices$.next(null));
			emblaApi.on('settle', () => visibleIndices$.next(slidesInView()));
			const getVisibleIndeces$ = () => visibleIndices$.asObservable();

			if (!effectRan) {
				if (metro.publicContext.panorama)
					throw new Error("You cannot use multiple panoramas in the same page!");
				effectRan = true;
			}

			const headers = children.map(child => {
				child = child.props?.header;
				if (!child) throw new Error(
					"Immediate children of `Panorama` must be `PanoramaItem`s with `header` set."
				);
				return child;
			});

			metro.setPanorama({
				headers, getVisibleIndeces$, scrollTo
			});

			return () => metro.setPanorama(null);
		}, [emblaApi, children]);


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
