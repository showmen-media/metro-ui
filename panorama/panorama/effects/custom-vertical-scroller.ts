import React from "react";

export const useCustomVerticalScroller = ({ slider, spacerRef, slidesContainerRef }) => React.useEffect(
	() => {
		if (!slider) return;

		const sliderNode: HTMLDivElement = slider.rootNode() as any;
		const spacer = spacerRef.current!;
		const container = slidesContainerRef.current!;

		if (!sliderNode.style.position) {
			const rect = sliderNode.getBoundingClientRect();
			sliderNode.style.paddingTop = `${rect.y}px`;
			sliderNode.style.position = "fixed";
		}

		let frame;
		let lastInView;
		const updateSpacer = () => {
			cancelAnimationFrame(frame);
			requestAnimationFrame(() => {
				const inView = slider.slidesInView().join();;
				if (lastInView !== inView) window.scrollTo(0, 0);
				lastInView = inView;
				const { height } = container.getBoundingClientRect();
				spacer.style.height = `${height}px`;
			});
		};

		window.addEventListener("resize", updateSpacer);
		slider.on("settle", updateSpacer);

		return () => {
			window.removeEventListener("resize", updateSpacer);
			slider.off("settle", updateSpacer);
		};

	},
	[slider]
);
