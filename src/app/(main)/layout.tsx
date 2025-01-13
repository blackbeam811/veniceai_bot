import Sidebar from "@/components/Sidebar";

export default function mainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex overflow-hidden">
      <div className="h-full lg:w-[30%] xl:w-[20%]">
        <Sidebar />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[80%] h-full">{children}</div>
    </main>
  );
}
