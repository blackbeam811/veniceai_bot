import { Dispatch, SetStateAction } from "react";

export interface SideBarContext {
    sidebarOpen: boolean;
    toggleSidebar: Dispatch<SetStateAction<boolean>>;
}