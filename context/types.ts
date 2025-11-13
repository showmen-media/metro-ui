import { Observable } from "rxjs";
import { UseEmblaCarouselType } from "embla-carousel-react";

// import { SimpleRectObj } from "lib/core/common/helpers";


type Panorama = {
	title: string;
	headers: string[];
	getVisibleIndeces$: () => Observable<number[]>;
	// getFocusAreaRect: () => null | SimpleRectObj;
	slider: UseEmblaCarouselType[1];
};

export type PublicContext = {
	panorama: null | Panorama;
};

export type InternalContext = {
	publicContext: PublicContext;
	setPanorama: (panorama: Panorama | null) => void;
};
