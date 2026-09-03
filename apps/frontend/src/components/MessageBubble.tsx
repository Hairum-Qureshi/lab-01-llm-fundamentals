import Markdown from "react-markdown";

export default function MessageBubble({
	message,
	isAIResponse
}: {
	message: string;
	isAIResponse: boolean;
}) {
	return (
		<div
			className={`p-3 w-3/4 rounded-md h-auto wrap-break-word ${
				isAIResponse
					? `
            [&_h1]:text-2xl
			[&_h1]:font-bold
			[&_h1]:my-3
			[&_h2]:text-xl
			[&_h2]:font-bold
			[&_h2]:my-3
			[&_h3]:text-lg
			[&_h3]:font-bold
			[&_h3]:my-3
			[&_h4]:text-base
			[&_h4]:font-bold
			[&_h4]:my-3
			[&_h5]:text-sm
			[&_h5]:font-bold
			[&_h5]:my-3
			[&_h6]:text-xs
			[&_h6]:font-bold
			[&_h6]:my-3
			[&_p]:my-2
			[&_blockquote]:pl-4
			[&_blockquote]:border-l-4
			[&_blockquote]:border-sky-500
			[&_blockquote]:italic
			[&_blockquote]:text-slate-200
			[&_ul]:list-disc
			[&_ul]:pl-6
			[&_ol]:list-decimal
			[&_ol]:pl-6
			[&_li]:mb-1
			[&_hr]:my-3
          `
					: ""
			} ${
				isAIResponse
					? "bg-blue-600 text-white mr-auto"
					: "bg-gray-300 text-black ml-auto"
			}`}
		>
			{isAIResponse ? <Markdown>{message}</Markdown> : message}
		</div>
	);
}
