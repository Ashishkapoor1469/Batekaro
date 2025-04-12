import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import UserSync from "./component/UserSync";
import SideBarLg from "@/components/shared/SideBar/SideBarLg";



export const metadata: Metadata = {
  title: "CHATING APP",
  description: "CHATING APP FEEL FREE TO CHAT WITH OTHERS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex" cz-shortcut-listen="true">
        <ConvexClientProvider>
          <UserSync />
         <SideBarLg/>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}