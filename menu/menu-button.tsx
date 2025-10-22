'use client';

import Link from "next/link";


function addClasses(obj, classes) {
	obj.className = [
		obj.className,
		classes
	].filter(Boolean).join(" ");
}

export default function MenuButton(
	{ icon: Icon, href, children, ...props }: MenuButtonProps
) {
	addClasses(props, "flex items-center gap-3 p-2 -mx-2");

	const disabled = props.disabled || !(href || props.onClick);

	const Container = ({ ...props }) => {
		addClasses(props, disabled ? "opacity-50" : "button");

		return (
			disabled || !href
			? <button disabled={disabled} {...props} />
			: Link({ ...props, href })
		);
	};

	return <Container {...props}>
		{
			Icon
			? <span className="p-2 bg-indigo-600 text-white">
				<Icon className="size-6" />
			</span>
			: null
		}
		<span className="text-lg">
			{children}
		</span>
	</Container>;
}

type MenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: React.FunctionComponent<React.HTMLAttributes<HTMLElement>>;
	href?: string;
}
