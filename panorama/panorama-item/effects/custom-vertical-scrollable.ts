import React from "react";

export const useCustomVerticalScrollable = ({ panorama, thisSlideRef }) => {

	const slider = panorama?.slider;

	React.useEffect(() => {
		const thisSlide = thisSlideRef.current;
		if (!(slider && thisSlide)) return;
		const slideIndex = ([]).indexOf.call(thisSlide.parentNode!.children, thisSlide);
		const contentDiv = thisSlide.children[0] as HTMLDivElement;

		const positionUpdate = (scrollY) => {
			const isInView = slider.slidesInView().includes(slideIndex);
			contentDiv.style.transform = (
				isInView ? `translateY(${-1 * scrollY}px)` : ""
			);
		};
		const sub = panorama.getVerticalScroll$().subscribe(positionUpdate);

		thisSlide.style.opacity = "1";

		return () => sub.unsubscribe();

	}, [panorama, thisSlideRef]);
}
