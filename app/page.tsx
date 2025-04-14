"use client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ItemList from "@/components/shared/item-list/ItemList";
import ConverstaionFallback from "@/components/shared/converstaion/ConverstaionFallback";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import DMConversation from "./_components/DMConversation";
export default function Home() {
  const conversations = useQuery(api.conversatation.get);
  return (
    <>
      <SignedOut>
        <main className="flex min-h-screen w-full justify-center items-center">
          <div className="w-full h-full flex justify-center items-center">
            <div className="shadow-sm p-8 w-96 h-96 border flex flex-col justify-center items-center rounded-3xl">
              <h2 className="text-xl font-semibold mb-4">
                CHAT WITH OTHER{"'"}S
              </h2>
              <p className="mb-4">Please sign in to start Chating...</p>
              <div className="flex mt-6 gap-4">
                <SignInButton mode="modal">
                  <Button className="cursor-pointer" size="lg">
                    Sign In
                  </Button>
                </SignInButton>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </main>
      </SignedOut>
      <SignedIn>
        <main className="py-4 w-full h-full flex gap-2 pe-2">
          <ItemList title="Conversations">
            {conversations ? (
              conversations.length === 0 ? (
                <p className="w-full h-full flex items-center justify-center">
                  No conversation found
                </p>
              ) : (
                conversations.map((conversation) => {
                  return conversation.conversation.isGroup ? null : (
                    <DMConversation
                      key={conversation.conversation._id}
                      id={conversation.conversation._id}
                      username={conversation.otherMembers?.name || ""}
                      imageUrl={conversation.otherMembers?.imageUrl || ""}
                    />
                  );
                })
              )
            ) : (
              <Loader2 />
            )}
          </ItemList>
          <ConverstaionFallback />
        </main>
      </SignedIn>
    </>
  );
}
