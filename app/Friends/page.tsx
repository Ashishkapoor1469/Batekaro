"use client";
import ConversationFallback from "@/components/shared/converstaion/ConverstaionFallback";
import ItemList from "@/components/shared/item-list/ItemList";
import React from "react";
import AddFriendDialog from "./_components/AddFriendDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import Request from "./_components/Request";

const Page = () => {
  const requests = useQuery(api.requests.get);

  return (
    <div className="py-4 w-full h-full flex gap-2 pe-2">
      <ItemList title="Friends" action={<AddFriendDialog />}>
        {requests === undefined ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : requests.length === 0 ? (
          <p className="w-full h-full flex justify-center items-center text-center">
            No Friends request Found
          </p>
        ) : (
          requests.map((request) => (
            <Request
              key={request.request._id}
              id={request.request._id}
              imageUrl={request.sender.imageUrl}
              username={request.sender.name}
              email={request.sender.email}
            />
          ))
        )}
      </ItemList>
      <ConversationFallback />
    </div>
  );
};

export default Page;
