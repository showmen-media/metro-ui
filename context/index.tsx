'use client';

import { Context, createContext, useContext, useState } from "react";

import { InternalContext, PublicContext } from "./types";


const MetroContext = createContext<null | PublicContext>(null);
const MetroInternalContext = createContext<null | InternalContext>(null);

export default function MetroContextProvider({ children }) {

	const stateItems = {
		panorama: useState(null)
	};

	let publicContext = {} as PublicContext;
	let internalContext = {
		publicContext
	} as InternalContext;

	Object.keys(stateItems).forEach(
		key => {
			publicContext[key] = stateItems[key][0];
			const setter = stateItems[key][1];
			key = `set${key[0].toUpperCase()}${key.slice(1)}`;
			internalContext[key] = setter.bind(this);
		}
	);

	return (
		<MetroContext.Provider value={publicContext}>
			<MetroInternalContext.Provider value={internalContext}>
				{children}
			</MetroInternalContext.Provider>
		</MetroContext.Provider>
	);
}

const createNonFalseyContextHook = <T,>(context: Context<T>) => () => {
	const result = useContext(context) as T;
	if (!result) throw new Error(`Context unavailable`);
	return result;
}

export const useMetroInternalContext = createNonFalseyContextHook(MetroInternalContext);
export const useMetroContext = createNonFalseyContextHook(MetroContext);
