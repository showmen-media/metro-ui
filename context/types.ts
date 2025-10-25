import { Observable } from "rxjs";

type Panorama = {
	headers: string[];
	getVisibleIndeces$: () => Observable<number[]>;
	scrollTo: (index: number, jump?: boolean | undefined) => void;
};

export type PublicContext = {
	panorama: null | Panorama;
};

export type InternalContext = {
	publicContext: PublicContext;
	setPanorama: (Panorama) => void;
};
