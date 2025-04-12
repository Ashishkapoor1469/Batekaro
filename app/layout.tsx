import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import UserSync from "./component/UserSync";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}  cz-shortcut-listen="true">
        <ConvexClientProvider>
          <UserSync />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}