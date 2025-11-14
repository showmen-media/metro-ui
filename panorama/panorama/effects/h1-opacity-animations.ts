import { useMetroContext } from "metro-ui/context";
import React from "react";

export const useH1OpacityAnimations = ({ h1Ref }) => {
	const { panorama } = useMetroContext();

	React.useEffect(() => {
		const slider = panorama?.slider;
		const h1 = h1Ref.current;

		if (!(slider && h1)) return;

		const updateH1OpacityFromVertical = async (scrollY) => {
			const current = h1.style.opacity || "1";
			const next = Math.max(
				0, 1 - Math.sqrt(scrollY / 50)
			).toString();

			let animation: boolean | "add" | "remove";
			const change = `${current},${next}`;

			animation = (change === "1,0");
			animation = animation ? "add" : "remove";
			h1.classList[animation]("animate-fadeout");

			animation = (change === "0,1");
			animation = animation ? "add" : "remove";
			h1.classList[animation]("animate-fadein");

			h1.style.opacity = next;
		};

		const sub = panorama.getVerticalScroll$().subscribe(updateH1OpacityFromVertical);

		return () => {
			sub.unsubscribe();
		};

	}, [h1Ref, panorama]);
};
