import React from "react";

export const useH1ScrollAnimations = ({ h1Ref, slider }) => {
	React.useEffect(() => {

		const h1 = h1Ref.current;
		if (!(slider && h1)) return;

		if (!h1.style.position) {
			const h1Rect = h1.getBoundingClientRect();
			h1.style.left = `${h1Rect.x}px`;
			const y = h1Rect.y - document.body.getBoundingClientRect().y;
			h1.style.top = `${y}px`;
			h1.style.position = "fixed";
		}

		const updateH1Offset = () => {
			const progress = slider?.scrollProgress() || 0;
			const offset = (progress / 1.7) * -100;
			h1.style.transform = `translateX(${offset}%)`;
		};

		slider.on("scroll", updateH1Offset);

		return () => {
			slider.off("scroll", updateH1Offset);
		};
	}, [slider, h1Ref]);
}
