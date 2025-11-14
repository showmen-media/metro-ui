import React from "react";
import { BehaviorSubject, map, Observable } from "rxjs";

import { nonNullObservable } from "lib/core/common/helpers";
import { useMetroInternalContext } from "metro-ui/context";


export const useMetroContextUpdater = ({ title, slider, children }) => {

	const metroInternal = useMetroInternalContext();
	const [effectRan, setEffectRan] = React.useState(false);

	React.useEffect(
		() => {
			if (!slider) return;

			if (!effectRan) {
				if (metroInternal.publicContext.panorama)
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

			const scrollFrames = new BehaviorSubject<null | number>(null);
			const sliderIsScrolling = new BehaviorSubject(false);

			let frameRq;
			const handleWindowScroll = () => {
				cancelAnimationFrame(frameRq);
				frameRq = requestAnimationFrame(
					() => scrollFrames.next(window.scrollY)
				);
			};

			document.addEventListener("scroll", handleWindowScroll);
			handleWindowScroll();

			let scrollEndTimeout, lastPosition;
			const handleSliderScroll = () => {
				const position = slider.scrollProgress().toFixed(2);
				if (position === lastPosition) return;
				lastPosition = position;
				sliderIsScrolling.value || sliderIsScrolling.next(true);
				clearTimeout(scrollEndTimeout);
				scrollEndTimeout = setTimeout(
					() => sliderIsScrolling.next(false),
					300
				);
			};

			slider.on('scroll', handleSliderScroll);

			const visibleIndices$ = sliderIsScrolling.pipe(
				map((isScrolling) => {
					if (isScrolling) return null;
					const inView = slider.slidesInView();
					return inView.length ? inView : null;
				})
			) as Observable<null | number[]>;

			metroInternal.setPanorama({
				title, headers, slider,
				getVerticalScroll$: () => nonNullObservable(scrollFrames),
				getIsScrolling$: () => sliderIsScrolling.asObservable(),
				getVisibleIndeces$: () => visibleIndices$
			});

			return () => {
				scrollFrames.complete();
				document.removeEventListener("scroll", handleWindowScroll);
				slider.off('scroll', handleSliderScroll);
				metroInternal.setPanorama(null);
			};

		},
		[slider, children]
	);
}
