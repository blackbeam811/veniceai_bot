import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarCtx } from "@/contexts/SidebarCtx";
import { Toaster } from "react-hot-toast";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  variable: "--font-space-grotesk",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Polyglot",
  description: "A multi-model Ai chatbot",
};

// const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Toaster />
        <SidebarCtx>{children}</SidebarCtx>
      </body>
    </html>
  );
}
