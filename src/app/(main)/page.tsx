"use client";

import { useSidebarCtx } from "@/contexts/SidebarCtx";
import { ArrowDown2, Flash, HambergerMenu } from "iconsax-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { getModels } from "@/actions/models";
import { chat } from "@/actions/chat";
// import axios from "axios";
import ChatMessage from "@/components/ChatMessage"; // Extracted component
import ChatInput from "@/components/ChatInput"; // Extracted component
import useChatStore from "@/states/chatStore";
// import { venice } from "@/utils/venice.utils";

import { useRef } from "react";

const Page = () => {
  const { sidebarOpen, toggleSidebar } = useSidebarCtx();
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatInterface, setChatInterface] = useState(false);
  const [chooseModel, setChooseModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const { chats: allChats, addChat } = useChatStore();
  const lastMessageRef = useRef<HTMLDivElement | null>(null); // Ref for the last message

  useEffect(() => {
    (async () => {
      try {
        const res = await getModels();
        //@ts-expect-error error
        const textModels = res.filter((model) => model.type === "text");
        setModels(textModels);
        if (textModels.length > 0) setCurrentModel(textModels[0].id);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (allChats.length > 0) {
      setChatInterface(true);
      // Scroll to the last message
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [allChats]); // Trigger scroll when chats change

  const startChat = async (message: string) => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      const start = performance.now();

      // Simulate a server response for AI completion
      const completion = await chat(
        JSON.stringify(allChats),
        message,
        currentModel
      );

      const end = performance.now();
      const timeTaken = end - start;

      addChat({
        message,
        reply: completion.content as string,
        timeTaken: String(timeTaken),
      });

      console.log(`Time taken to fetch data: ${timeTaken} ms`);
    } catch (error) {
      console.error("Error sending chat:", error);
    } finally {
      setChatInput("");
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new line if Shift is not pressed
      startChat(chatInput); // Trigger the action (e.g., send chat)
      setChatInput(""); // Clear the input after sending
    }
  };

  return (
    <div className="bg-black h-full p-2">
      {/* Sidebar toggle for mobile */}
      <div className="lg:hidden bg-black p-5 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flash size="32" color="#FFF" variant="Bold" />
          <p className="text-white text-xl font-semibold">Polyglot</p>
        </div>
        <HambergerMenu
          size="32"
          color="#FFF"
          onClick={() => toggleSidebar(!sidebarOpen)}
        />
      </div>

      {/* Main chat UI */}
      <div className="relative bg-gradient-to-br from-primary/35 to-secondary/35 w-full h-full rounded-lg flex flex-col items-center justify-center">
        {/* Model Selection */}
        <div className="absolute top-3 left-5 z-10">
          <Popover open={chooseModel}>
            <PopoverTrigger
              className="bg-primary text-white p-3 flex items-center rounded-md gap-2"
              onClick={() => setChooseModel(!chooseModel)}
            >
              <p>{currentModel}</p>
              <ArrowDown2 size="26" color="#FFF" />
            </PopoverTrigger>
            <PopoverContent
              className="bg-primary border-black"
              onPointerDownOutside={() => setChooseModel(false)}
            >
              <ul>
                {models.map((model) => (
                  <li
                    className={`text-white p-3 rounded-md hover:bg-[#424242] cursor-pointer ${
                      //@ts-expect-error error
                      currentModel === model.id && "bg-black"
                    }`}
                    //@ts-expect-error error
                    key={model.id}
                    onClick={() => {
                      //@ts-expect-error error
                      setCurrentModel(model.id);
                      setChooseModel(false);
                    }}
                  >
                    {/* @ts-expect-error error */}
                    {model.id}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        {/* Chat Interface */}
        {!chatInterface ? (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl text-white font-semibold">
              Welcome to Polyglot
            </h1>
            <p className="text-white mt-3">
              The Power of AI at your service - Tame the knowledge
            </p>
            <ChatInput
              chatInput={chatInput}
              setChatInput={setChatInput}
              onSend={() => startChat(chatInput)}
              loading={loading}
              handleKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <div className="w-full h-full overflow-auto bg-black p-5 rounded-md relative">
            <div className="mt-24"></div>
            <div className="mb-36">
              {allChats.map((chat, index) => (
                <ChatMessage
                  key={index}
                  chat={chat}
                  ref={index === allChats.length - 1 ? lastMessageRef : null} // Set ref to the last message
                />
              ))}
            </div>
            <div className="fixed bottom-4 w-[90%] md:w-[95%] lg:w-[63%] xl:w-[73%] flex justify-center">
              <ChatInput
                chatInput={chatInput}
                setChatInput={setChatInput}
                onSend={() => startChat(chatInput)}
                loading={loading}
                handleKeyDown={handleKeyDown}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
