import { useMetroContextUpdater } from "./metro-context-updater";
import { useCustomVerticalScroller } from "./custom-vertical-scroller";
import { useH1OpacityAnimations } from "./h1-opacity-animations";
import { useH1ScrollAnimations } from "./h1-scroll-animations";


export const usePanoramaEffects = ({ title, children, h1Ref, slidesContainerRef, spacerRef, slider }) => {

	// Update Metro context
	useMetroContextUpdater({ title, children, slider });

	// vertical scroll setup
	useCustomVerticalScroller({ slider, spacerRef, slidesContainerRef });

	// vertical scroll animations
	useH1OpacityAnimations({ h1Ref });

	// h1 horizontal scroll animation
	useH1ScrollAnimations({ h1Ref, slider });


};
