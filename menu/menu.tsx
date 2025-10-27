import { ReactNode } from "react";

export default function Menu({ className, children }: MenuProps) {
	return <div className={["flex flex-col", className].filter(Boolean).join(' ')}>
		{children}
	</div>;
}

type MenuProps = {
	className?: string;
	children?: ReactNode;
}
