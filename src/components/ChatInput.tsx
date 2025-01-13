import { Send } from "iconsax-react";
import React from "react";

interface ChatInputProps {
  chatInput: string;
  setChatInput: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  handleKeyDown: (event: React.KeyboardEvent) => void
}

const ChatInput: React.FC<ChatInputProps> = ({
  chatInput,
  setChatInput,
  onSend,
  loading,
  handleKeyDown
}) => {
  return (
    <div className="mt-3 flex items-center bg-primary w-full p-2 rounded-md gap-1 border-[1px]">
      <input
        type="text"
        name="prompt"
        id="prompt"
        className="bg-transparent p-2 w-[90%] outline-none text-white"
        placeholder="Type your message"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        disabled={loading}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-secondary flex justify-center rounded-lg p-2 w-[10%]"
        onClick={onSend}
        disabled={loading}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
        ) : (
          <Send size="26" color="#FFF" />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
