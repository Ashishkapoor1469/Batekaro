import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import UserSync from "./components/UserSync";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js with Clerk and Convex",
  description: "A Next.js app using Clerk for auth and Convex for backend",
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