import { FaArrowUp } from "react-icons/fa6";
import { useState } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatContainer() {
	const [message, setMessage] = useState("");
	const [hideGreeting, setHideGreeting] = useState(false);

	return (
		<div className="bg-slate-500/10 h-screen w-full">
			<div className="m-auto w-3/4 h-full">
				<div
					className={`relative flex flex-col ${!hideGreeting && "justify-center items-center"} m-auto h-full`}
				>
					<div className="flex flex-col justify-center items-center w-3/4">
						{!hideGreeting && (
							<div>
								<div className="flex flex-col justify-center items-center">
									<h1 className="text-4xl font-semibold text-blue-600">
										Hello, I'm Remi
									</h1>
									<h3 className="text-2xl font-semibold text-blue-800">
										What can I help you with today?
									</h3>
									<p className="text-sm text-gray-500 my-2 text-center">
										<strong>NOTE:</strong> this is a demo app and no messages
										are actually being stored in a database. Upon refresh, all
										messages will be lost.
									</p>
								</div>
								<div className="flex flex-col justify-center items-center w-full">
									<div className="flex flex-col gap-2 my-5"></div>
									<div className="flex gap-2">
										<div
											className="bg-gray-200 flex items-center w-3/4 p-2 rounded-md hover:bg-gray-300 cursor-pointer"
											onClick={() => {
												setHideGreeting(true);
											}}
										>
											<h2 className="text-center">
												What's a good way to learn a new programming language?
											</h2>
										</div>
										<div
											className="bg-gray-200 flex items-center w-3/4 p-2 rounded-md hover:bg-gray-300 cursor-pointer"
											onClick={() => setHideGreeting(true)}
										>
											<h2 className="text-center">
												What are some tips for improving my coding skills?
											</h2>
										</div>
										<div
											className="bg-gray-200 flex items-center w-3/4 p-2 rounded-md hover:bg-gray-300 cursor-pointer"
											onClick={() => setHideGreeting(true)}
										>
											<h2 className="text-center">
												How can I stay motivated while learning to code?
											</h2>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					{hideGreeting && (
						<div className="flex flex-col gap-2 w-full h-3/4 mt-5 items-center overflow-y-auto p-2">
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
							<MessageBubble />
						</div>
					)}
					<div className="w-full absolute bottom-0 mb-10 p-2">
						<div className="relative">
							<textarea
								className="w-full h-24 p-3 pr-12 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Type your message here..."
								value={message}
								onChange={e => setMessage(e.target.value)}
								onKeyDown={e => {
									if (e.key === "Enter" && !e.shiftKey) {
										if (!message.trim()) {
											alert("Please enter a message before sending.");
											return;
										}
										e.preventDefault();
										setHideGreeting(true);
										setMessage("");
									}
								}}
							></textarea>
							<button
								className="absolute bottom-3 right-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:cursor-pointer"
								onClick={() => {
									setHideGreeting(true);
									setMessage("");
								}}
							>
								<FaArrowUp />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
