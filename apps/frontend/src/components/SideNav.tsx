import { LuPanelLeft } from "react-icons/lu";
import { IoChatbox } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";

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
				<div className="flex flex-col items-center space-y-2 hover:cursor-pointer">
					<div className="flex flex-col items-center space-y-2 hover:cursor-pointer absolute bottom-0 mb-5">
						<FaCircleUser className="text-white text-3xl" />
					</div>
				</div>
			</div>
		</div>
	);
}
