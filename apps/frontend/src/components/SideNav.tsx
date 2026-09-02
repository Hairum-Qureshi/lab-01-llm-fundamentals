import { LuPanelLeft } from "react-icons/lu";
import { IoChatbox } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SideNav() {
	return (
		<div className="w-15 p-3 bg-blue-600 h-screen">
			<div className="flex flex-col items-center space-y-6">
				<div className="flex flex-col items-center space-y-2 hover:cursor-pointer">
					<LuPanelLeft className="text-white text-lg" />
				</div>
				<div className="flex flex-col items-center space-y-2 hover:cursor-pointer">
					<FaMagnifyingGlass className="text-white text-lg" />
				</div>
				<div className="flex flex-col items-center space-y-2 bg-blue-800 p-2 rounded-lg hover:cursor-pointer">
					<IoChatbox className="text-white text-lg" />
				</div>
			</div>
		</div>
	);
}
