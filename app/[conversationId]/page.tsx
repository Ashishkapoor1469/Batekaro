"use client";
import ConverstaionContainer from "@/components/shared/converstaion/ConverstaionContainer";
import ItemList from "@/components/shared/item-list/ItemList";
import React, { use, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import DMConversation from "../_components/DMConversation";
import { Id } from "@/convex/_generated/dataModel";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";

type Props = {
  params: Promise<{
    conversationId: Id<"conversations">;
  }>;
};

const Page = ({ params}: Props) => {
  const { conversationId} = use(params);
  
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  const conversations = useQuery(api.conversations.getAll);

  const [removeFdo, setremoveFdo] = useState(false);
  // const [deleteFdo, setdeleteFdo] = useState(false);
  // const [leaveGroupFdo, setleaveGroupFdo] = useState(false);
  // const [callType, setcallType] = useState<"audio"|"vedio"|null>(null);
  return (
    <div className="py-4 flex w-full h-full lg:pe-4 gap-4">
      <div className="lg:block hidden">
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
                    lastMessageContet={conversation.lastMessage?.content}
                    lastMessageSender={conversation.lastMessage?.sender}
                  />
                );
              })
            )
          ) : (
            <Loader2 className="h-10 w-10 animate-spin" />
          )}
        </ItemList>
      </div>
      {conversation === undefined ? (
  <div className="w-full h-full flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
) : conversation === null ? (
  <p className="w-full h-full flex items-center justify-center">
    Conversation not found
  </p>
) : (
  <ConverstaionContainer>
    <RemoveFriendDialog conversationId={conversationId} open={removeFdo} setOpen={setremoveFdo}/>
    <Header
      name={
        (conversation.isGroup
          ? conversation.name
          : conversation.otherMember?.name) || "Unknown"
      }
      imageUrl={
        conversation.isGroup
          ? undefined
          : conversation.otherMember?.imageUrl
      }
      options={conversation.isGroup?[
        // {
        //   label:"Leave Group",
        //   distructive:false,
        //   onclick:()=>{
        //     setleaveGroupFdo(true)
        //   },
        // },
        // {
        //   label:"Delete Group",
        //   distructive:true,
        //   onclick:()=>{
        //     setdeleteFdo(true)
        //   },
        // },
        {
          label:"Remove friend",
          distructive:true,
          onclick:()=>{
            setremoveFdo(true)
          },
        }
      ]:[]}
    />
    <Body />
    <ChatInput />
  </ConverstaionContainer>
)}
    </div>
  );
};

export default Page;
