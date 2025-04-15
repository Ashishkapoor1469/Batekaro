"use client";

import { ClerkProvider, SignedOut, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
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
         <AuthLoading><div className="min-w-screen min-h-screen flex justify-center items-center"><Loader2  className="h-12 w-12 animate-spin"/></div></AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
