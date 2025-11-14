import { Observable } from "rxjs";
import { UseEmblaCarouselType } from "embla-carousel-react";


type Panorama = {
	title: string;
	headers: string[];
	slider: UseEmblaCarouselType[1];
	getVerticalScroll$: () => Observable<number>;
	getIsScrolling$: () => Observable<boolean>;
	getVisibleIndeces$: () => Observable<null | number[]>;
};

export type PublicContext = {
	panorama: null | Panorama;
};

export type InternalContext = {
	publicContext: PublicContext;
	setPanorama: (panorama: Panorama | null) => void;
};
