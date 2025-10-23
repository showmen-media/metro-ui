'use client';

import { createContext, useContext, useState } from "react";


const MetroContext = createContext<null | {}>(null);
const MetroInternalContext = createContext<null | {}>(null);

export default function MetroContextProvider({ children }) {

	const stateItems = {
		panoramaItems: useState(null)
	};

	let publicContext = {};
	let internalContext = {
		publicContext
	};

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

const createNonFalseyContextHook = (context) => () => {
	const result = useContext(context);
	if (!result) throw new Error(`Context unavailable`);
	return result;
}

export const useMetroInternalContext = createNonFalseyContextHook(MetroInternalContext);
export const useMetroContext = createNonFalseyContextHook(MetroContext);
