import SideNav from "../components/SideNav";
import ChatContainer from "../components/ChatContainer";

export default function Home() {
	return (
		<div className="flex">
			<SideNav />
			<ChatContainer />
		</div>
	);
}
