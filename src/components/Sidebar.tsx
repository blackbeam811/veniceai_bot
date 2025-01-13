"use client";

import { useSidebarCtx } from "@/contexts/SidebarCtx";
import useUserStore from "@/states/userStore";
import { Add, CloseSquare, Flash, Logout } from "iconsax-react";
import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
import useChatStore from "@/states/chatStore";
// import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useSidebarCtx();
  // const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  // const router = useRouter();

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearChat = useChatStore((state) => state.clearChats);
  const chats = useChatStore((state) => state.chats);

  // useEffect(() => {
  //   if (!user?.token) {
  //     setLoginDialogOpen(true);
  //   }
  // }, []);

  const logout = () => {
    clearUser();
  };

  return (
    <>
      <div className="hidden lg:flex h-full bg-primary p-3 flex-col justify-between">
        <div>
          <div className="bg-black p-5 rounded-lg flex items-center gap-2">
            <Flash size="32" color="#FFF" variant="Bold" />
            <p className="text-white text-xl font-semibold">Polyglot</p>
          </div>
          {chats.length > 0 && (
            <button
              className="w-full flex items-center gap-3 bg-secondary p-3 rounded-lg mt-3"
              onClick={() => clearChat()}
            >
              <Add size="32" color="#FFF" />
              <p className="text-white text-lg font-medium">Clear all Chats</p>
            </button>
          )}
        </div>
        <div className="border-t-[1px] border-gray-600 p-3">
          {user?.token ? (
            <button
              className="flex items-center gap-1 text-[#F00000]"
              onClick={() => {
                logout();
              }}
            >
              <Logout size="32" color="#F00000" />
              <p className="text-lg">Log out</p>
            </button>
          ) : (
            <div>
              <Link href={"/login"}>
                <button className="flex items-center gap-1 text-white text-lg bg-secondary font-semibold w-full p-3 rounded-lg justify-center">
                  <p className="text-lg text-center">Log in</p>
                </button>
              </Link>
              <Link href={"/register"}>
                <button className="flex items-center gap-1 text-secondary bg-white text-lg font-semibold w-full p-3 rounded-lg justify-center mt-1">
                  <p className="text-lg">Register</p>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {sidebarOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-primary p-3 flex flex-col justify-between z-50">
          <div>
            <div className="bg-black p-5 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flash size="32" color="#FFF" variant="Bold" />
                <p className="text-white text-xl font-semibold">Polyglot</p>
              </div>
              <CloseSquare
                size="32"
                color="#FFF"
                onClick={() => {
                  toggleSidebar(!sidebarOpen);
                }}
              />
            </div>
            {chats.length > 0 && (
              <button
                className="w-full flex items-center gap-3 bg-secondary p-3 rounded-lg mt-3"
                onClick={() => clearChat()}
              >
                <Add size="32" color="#FFF" />
                <p className="text-white text-lg font-medium">
                  Clear all Chats
                </p>
              </button>
            )}
          </div>

          <div className="border-t-[1px] border-gray-600 p-3">
            {user?.token ? (
              <button
                className="flex items-center gap-1 text-[#F00000]"
                onClick={() => {
                  logout();
                }}
              >
                <Logout size="32" color="#F00000" />
                <p className="text-lg">Log out</p>
              </button>
            ) : (
              <div>
                <Link href={"/login"}>
                  <button className="flex items-center gap-1 text-white text-lg bg-secondary font-semibold w-full p-3 rounded-lg justify-center">
                    <p className="text-lg text-center">Log in</p>
                  </button>
                </Link>
                <Link href={"/register"}>
                  <button className="flex items-center gap-1 text-secondary bg-white text-lg font-semibold w-full p-3 rounded-lg justify-center mt-1">
                    <p className="text-lg">Register</p>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
