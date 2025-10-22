import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import AppBarButton from "./button";
import AppBarMenu from "./menu";

export default function AppBar(props) {
	return <div
		style={{
			position: "fixed",
			bottom: 0,
			left: 0,
			width: "100%",
			padding: "12px 0",
			background: "#242424"
		}}
	>
		<div
			className="page-container"
		>
			<div className="flex justify-center">
				<AppBarButton icon={EllipsisHorizontalIcon} text="Menu" />
				<AppBarButton icon={EllipsisHorizontalIcon} text="Menu" />
				<AppBarButton icon={EllipsisHorizontalIcon} text="Menu" />
				<AppBarButton icon={EllipsisHorizontalIcon} text="Menu" />
			</div>
			<AppBarMenu />
		</div>
	</div>;
}
