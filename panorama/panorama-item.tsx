'use client';

import { useMetroContext } from "../context";


export default function PanoramaItem({ header, children }) {
	const title = useMetroContext()?.panorama?.title;

	// const slider = useMetroContext()?.panorama?.slider;
	// const getFocusAreaRect = useMetroContext()?.panorama?.getFocusAreaRect;
	// const thisSlideRef = useRef<null | HTMLDivElement>(null);
	// const h1Ref = useRef<null | HTMLSpanElement>(null);

	// useEffect(() => {
	// 	const thisSlide = thisSlideRef?.current;
	// 	const h1Node = h1Ref?.current;
	// 	if (!(thisSlide && slider && h1Node)) return;
	// 	let animation;

	// 	const resetH1 = () => {
	// 		const focusRect = getFocusAreaRect!()!;

	// 		const pageContainerPadd = Number(
	// 			getComputedStyle(thisSlide)
	// 			.getPropertyValue('padding-left')
	// 			.replace(/px$/, "")
	// 		);
	// 		const currentH1Margin = Number(
	// 			getComputedStyle(h1Node)
	// 			.getPropertyValue('margin-left')
	// 			.replace(/px$/, "")
	// 		);

	// 		const newMargin = (
	// 			focusRect.x
	// 			- h1Node.getBoundingClientRect().x
	// 			+ currentH1Margin
	// 			+ pageContainerPadd
	// 		);

	// 		h1Node.style.marginLeft = `${newMargin}px`;
	// 	};

	// 	const animatedResetH1 = () => {
	// 		cancelAnimationFrame(animation);
	// 		requestAnimationFrame(resetH1);
	// 	};

	// 	window.addEventListener("resize", animatedResetH1);
	// 	slider.on("scroll", resetH1);
	// 	resetH1();

	// 	return () => {
	// 		window.removeEventListener("resize", animatedResetH1);
	// 		slider.off("scroll", resetH1);
	// 	};

	// }, [slider, h1Ref]);

	return <div
		className="embla__slide page-container mx-0 w-screen"
		// ref={thisSlideRef}
	>
		<div>
			{title && <span
				className="h1 opacity-0 pointer-events-none"
				// ref={h1Ref}
				// style={{ opacity: 0, pointerEvents: "none" }}
				aria-hidden="true"
			>{title}</span>}
			<h2>{header}</h2>
			{children}
		</div>
	</div>;
}
