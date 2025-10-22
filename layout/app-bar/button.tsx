
export default function AppBarButton({ icon: Icon, text }) {
	return <button className="text-center px-1">
		<div className="
			border-2 border-white rounded-full mx-auto size-10
			flex items-center justify-center
		">
			<Icon
				className="size-6"
			/>
		</div>
		<div className="mt-1 opacity-0 -mb-7">
			{text}
		</div>
	</button>
}
