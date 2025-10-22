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
			<div className="flex -mx-1">
				<div className="flex-1 flex">
					<button
						className="flex-1 relative text-xs text-left"
					>
						Previous
					</button>
				</div>
				<div className="flex-3 flex justify-center">
					<AppBarButton icon={EllipsisHorizontalIcon} text="Menu" />
					<AppBarButton icon={EllipsisHorizontalIcon} text="Menu" />
					<AppBarButton icon={EllipsisHorizontalIcon} text="Menu" />
					<AppBarButton icon={EllipsisHorizontalIcon} text="Menu" />
				</div>
				<div className="flex-1 flex">
					<button
						className="flex-1 relative text-xs text-right"
					>
						Previous
					</button>
				</div>
			</div>
			<AppBarMenu />
		</div>
	</div>;
}
