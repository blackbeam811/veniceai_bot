import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { forwardRef } from "react";

interface ChatMessageProps {
  chat: {
    message: string;
    reply: string;
    timeTaken: string;
  };
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ chat }, ref) => {
    return (
      <div
        className="p-3 rounded-md text-white mt-12 flex flex-col items-end"
        ref={ref}
      >
        {/* User message */}
        <div className="bg-secondary p-3 rounded-md w-[80%] self-start">
          <p className="text-lg font-bold">User:</p>
          <p>{chat.message}</p>
        </div>

        {/* AI reply */}
        <div className="bg-primary mt-6 p-3 rounded-md w-[90%] overflow-hidden md:w-[70%] self-end">
          <p className="text-lg font-bold">Polyglot:</p>
          <div className="w-full overflow-auto">
            <Markdown
              remarkPlugins={[remarkGfm]}
              className="w-full"
            >
              {chat.reply}
            </Markdown>
            <p className="mt-3 text-xs text-gray-600">
              Response Time: {chat.timeTaken} ms
            </p>
          </div>
        </div>
      </div>
    );
  }
);

// Set display name for better debugging (optional)
ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
