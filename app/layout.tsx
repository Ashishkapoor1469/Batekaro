import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import UserSync from "./component/UserSync";
import SideBarLg from "@/components/shared/SideBar/SideBarLg";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import MoboNav from "@/components/shared/SideBar/Mobonav";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className="flex min-h-screen min-w-screen"
        cz-shortcut-listen="true"
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ConvexClientProvider>
            <UserSync />
            <TooltipProvider>
              <Toaster richColors/>
             <div className="flex lg:flex-row flex-col-reverse w-full">
            <div className="lg:h-full flex justify-center">
              <MoboNav/>
            <SideBarLg />
            </div>
            {children}
            </div>
              </TooltipProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
