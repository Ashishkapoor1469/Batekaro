"use client";

import { ClerkProvider, SignedOut, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { RiLoader3Line } from "react-icons/ri";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <SignedOut>
          <div className="min-w-screen min-h-screen flex justify-center items-center"><SignIn/></div>
        </SignedOut>
        <Authenticated>{children}</Authenticated>
         <AuthLoading><div className="min-w-screen min-h-screen flex flex-col justify-center items-center gap-2.5"><p className="font-bold text-4xl">Please Wait...</p><RiLoader3Line className="h-11 w-11 animate-spin"/></div></AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
