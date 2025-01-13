import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CHAT {
  message: string;
  reply: string;
  timeTaken: string;
}

interface ChatStore {
  chats: CHAT[];
  addChat: (chat: Omit<CHAT, "timeTaken"> & { timeTaken: string }) => void; // Proper type for adding a chat
  clearChats: () => void;
}

const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chats: [], // Initialize from local storage
      addChat: ({ timeTaken, message, reply }) => {
        // Add timeTaken, message, and reply to the state
        set((state) => {
          const updatedChats = [...state.chats, { message, reply, timeTaken }];
          return { chats: updatedChats };
        });
      },
      clearChats: () => {
        // Clears the chats state and syncs with local storage
        set({ chats: [] });
      },
    }),
    {
      name: "chat-storage", // Key used in local storage
    }
  )
);

export default useChatStore;
