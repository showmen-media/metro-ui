'use client';

import { useEffect, useRef, useState } from "react";
import { BehaviorSubject } from "rxjs";
import useEmblaCarousel from "embla-carousel-react";

import { nonNullObservable } from "lib/core/common/helpers";
import { useMetroInternalContext } from "../context";

export default function Panorama({ title, children }) {

		const [emblaRef, slider] = useEmblaCarousel({ inViewThreshold: .9 });
		const slidesContainerRef = useRef<null | HTMLDivElement>(null);
		const [effectRan, setEffectRan] = useState(false);
		const [h1Offset, setH1Offset] = useState(0);

		const metro = useMetroInternalContext();

		const updateH1Offset = () => {
			const progress = slider?.scrollProgress() || 0;
			setH1Offset((progress / 1.7) * -100);
		};

		useEffect(() => {
			if (!slider) return;
			const { slidesInView } = slider;
			const visibleIndices$ = new BehaviorSubject<number[] | null>(slidesInView());
			slider.on('scroll', () => visibleIndices$.value && visibleIndices$.next(null));
			slider.on('settle', () => visibleIndices$.next(slidesInView()));
			const getVisibleIndeces$ = () => nonNullObservable(visibleIndices$);

			if (!effectRan) {
				if (metro.publicContext.panorama)
					throw new Error("You cannot use multiple panoramas in the same page!");
				setEffectRan(true);
			}

			const headers = children.filter(Boolean).map(child => {
				child = child.props?.header;
				if (!child) throw new Error(
					"Immediate children of `Panorama` must be `PanoramaItem`s with `header` set."
				);
				return child;
			});

			// const getFocusAreaRect = () => {
			// 	const container = slidesContainerRef?.current;
			// 	if (!container) return null;
			// 	let result = getSimpleRectObj(container.getBoundingClientRect());
			// 	const computed = getComputedStyle(container);
			// 	const matrix = new WebKitCSSMatrix(computed.transform);
			// 	result.x = (result.x - matrix.m41);
			// 	return result;
			// };

			metro.setPanorama({
				title, headers, getVisibleIndeces$,
				// getFocusAreaRect,
				slider
			});

			slider.on("scroll", updateH1Offset);

			return () => {
				slider.off("scroll", updateH1Offset);
				metro.setPanorama(null);
			}

		}, [slider, children]);

		return (
			<div>
				{title && (
					<h1
						className="h-0 page-container"
						style={{ transform: `translateX(${h1Offset}%)` }}
					>{title}</h1>
				)}
				<div className="embla" ref={emblaRef}>
					<div className="embla__container page-container p-0" ref={slidesContainerRef}>
						{children}
					</div>
				</div>
			</div>
		);
}
