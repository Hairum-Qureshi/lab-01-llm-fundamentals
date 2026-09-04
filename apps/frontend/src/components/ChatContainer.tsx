import { FaArrowUp } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

export default function ChatContainer() {
	const [message, setMessage] = useState("");
	const [hideGreeting, setHideGreeting] = useState(false);
	const [isAIResponding, setIsAIResponding] = useState(false);
	const messagesContainer = useRef<HTMLDivElement | null>(null);

	const [messages, setMessages] = useState<
		{ message: string; isAIResponse: boolean; isError: boolean }[]
	>([]);
	const isWaitingForAIResponse =
		messages.length > 0 &&
		messages[messages.length - 1].isAIResponse &&
		!messages[messages.length - 1].message;

	function processMessage(suggestedQuestion?: string) {
		const question = encodeURIComponent(suggestedQuestion ?? message);

		if (!question.trim()) return;

		setIsAIResponding(true);

		const source = new EventSource(
			`${import.meta.env.VITE_BACKEND_URL}/llm/ask?query=${question}`
		);

		source.onmessage = event => {
			if (event.data === "[DONE]") {
				source.close();
				setIsAIResponding(false);
				return;
			}

			setMessages(prev => {
				if (prev.length === 0) return prev;

				const updated = [...prev];
				const lastMessage = updated[updated.length - 1];

				updated[updated.length - 1] = {
					...lastMessage,
					message: lastMessage.message + event.data,
					isAIResponse: true,
					isError: false
				};

				return updated;
			});
		};

		source.onerror = error => {
			let errorMessage =
				"There was a problem generating a response. Please try again later.";

			try {
				const parsedError = JSON.parse(
					JSON.parse((error as MessageEvent).data).error.message
				);
				errorMessage = parsedError.error.message ?? errorMessage;
			} catch {

				// Keep the default fallback message when error payload is missing or malformed.
			}

			setMessages(prev => {
				if (prev.length === 0) return prev;

				const updated = [...prev];
				const lastMessage = updated[updated.length - 1];

				if (lastMessage.isAIResponse && !lastMessage.message) {
					updated[updated.length - 1] = {
						...lastMessage,
						message: errorMessage,
						isError: true
					};
				}

				return updated;
			});

			// alert(errorMessage);
			source.close();
			setIsAIResponding(false);
		};
	}

	useEffect(() => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	}, [messages]);

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
									<div className="flex gap-2">
										<div
											className="bg-gray-200 flex items-center justify-center w-3/4 p-4 rounded-md hover:bg-gray-300 cursor-pointer"
											onClick={() => {
												setHideGreeting(true);
												setMessages(prevMessages => [
													...prevMessages,
													{
														message:
															"What's a good way to learn a new programming language?",
														isAIResponse: false,
														isError: false
													},
													{
														message: "",
														isAIResponse: true,
														isError: false
													}
												]);
												processMessage(
													"What's a good way to learn a new programming language?"
												);
											}}
										>
											<h2>
												What's a good way to learn a new programming language?
											</h2>
										</div>
										<div
											className="bg-gray-200 flex items-center justify-center w-3/4 p-4 rounded-md hover:bg-gray-300 cursor-pointer"
											onClick={() => {
												setHideGreeting(true);
												setMessages(prevMessages => [
													...prevMessages,
													{
														message:
															"What are some tips for improving my coding skills?",
														isAIResponse: false,
														isError: false
													},
													{
														message: "",
														isAIResponse: true,
														isError: false
													}
												]);
												processMessage(
													"What are some tips for improving my coding skills?"
												);
											}}
										>
											<h2>
												What are some tips for improving my coding skills?
											</h2>
										</div>
										<div
											className="bg-gray-200 flex items-center justify-center w-3/4 p-4 rounded-md hover:bg-gray-300 cursor-pointer"
											onClick={() => {
												setHideGreeting(true);
												setMessages(prevMessages => [
													...prevMessages,
													{
														message:
															"How can I stay motivated while learning to code?",
														isAIResponse: false,
														isError: false
													},
													{
														message: "",
														isAIResponse: true,
														isError: false
													}
												]);
												processMessage(
													"How can I stay motivated while learning to code?"
												);
											}}
										>
											<h2>How can I stay motivated while learning to code?</h2>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					{hideGreeting && (
						<div
							className="flex flex-col gap-2 w-full h-3/4 mt-5 items-center overflow-y-auto p-2"
							ref={messagesContainer}
						>
							{messages.length > 0 &&
								messages.map((msg, index) => {
									return msg.message ? (
										<MessageBubble
											key={index}
											message={msg.message}
											isAIResponse={msg.isAIResponse}
                                            isError={msg.isError}
										/>
									) : (
										<div className="flex bg-blue-600 mr-auto p-3 rounded-md h-auto items-center">
											<DotWave size="30" speed="1" color="white" />
										</div>
									);
								})}
						</div>
					)}
					<div className="w-full absolute bottom-0 mb-4 p-2">
						<div className="relative">
							<textarea
								className="w-full h-24 p-3 pr-12 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Type your message here..."
								value={message}
								disabled={isAIResponding || isWaitingForAIResponse}
								onChange={e => setMessage(e.target.value)}
								onKeyDown={e => {
									if (isAIResponding || isWaitingForAIResponse) {
										e.preventDefault();
										return;
									}

									if (e.key === "Enter" && !e.shiftKey) {
										if (!message.trim()) {
											alert("Please enter a message before sending.");
											return;
										}
										e.preventDefault();

										setMessages(prevMessages => [
											...prevMessages,
											{ message, isAIResponse: false, isError: false },
											{
												message: "",
												isAIResponse: true,
												isError: false
											}
										]);

										processMessage();

										setHideGreeting(true);
										setMessage("");
									}
								}}
							></textarea>
							<button
								className="absolute bottom-3 right-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
								onClick={() => {
									if (!message.trim()) {
										alert("Please enter a message before sending.");
										return;
									}

									setHideGreeting(true);
									setMessages(prevMessages => [
										...prevMessages,
										{ message, isAIResponse: false, isError: false },
										{
											message: "",
											isAIResponse: true,
											isError: false
										}
									]);
									processMessage();
									setMessage("");
								}}
								disabled={
									isAIResponding || isWaitingForAIResponse || !message.trim()
								}
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
