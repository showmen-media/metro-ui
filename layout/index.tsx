'use client';

import MetroContextProvider from "../context";
import AppBar from "./app-bar";


export function MetroLayout({ children }) {
	return (
		<MetroContextProvider>
			<div>
				{children}
				<AppBar />
			</div>
		</MetroContextProvider>
	);
}
