"use client"

import { Card } from "@/components/ui/card"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvresation } from "@/hooks/useConversation"
import { useQuery } from "convex/react";
import Message from "./Message";

const Body = () => {
  const {conversationId} =useConvresation();
  const messages = useQuery(api.messages.get,{
    id:conversationId as Id<"conversations">,

  })
  return (
    <Card className="flex-1 w-full flex-col-reverse overflow-y-auto gap-2 p-4">
     {messages?.map(({message,senderImage,senderName,isCurrentUser},index)=>{
      const lastByUser = messages[index-1]?.message.senderId === messages[index].message.senderId
     
      return <Message key={message._id} fromCurrentUser={isCurrentUser} senderImage={senderImage} senderName={senderName} lastByUser={lastByUser} content={message.content}  createdAt={message._creationTime} type={message.type}/>
     })}
    </Card>
  )
}

export default Body
