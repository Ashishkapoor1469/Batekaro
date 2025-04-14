"use client"
import ConverstaionContainer from "@/components/shared/converstaion/ConverstaionContainer"
import ItemList from "@/components/shared/item-list/ItemList"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Loader2 } from "lucide-react"
import DMConversation from "../_components/DMConversation"
import type { Id } from "@/convex/_generated/dataModel"
import Header from "./_components/Header"
import Body from "./_components/body/Body"
import ChatInput from "./_components/input/ChatInput"
import { useParams } from "next/navigation"
import { useMemo } from "react"

const Page = () => {
  const params = useParams()
  const conversationId = params.conversationId as string

  const conversationQuery = useMemo(() => {
    if (conversationId) {
      return {
        query: api.converstaion.get,
        args: { id: conversationId as Id<"conversations"> },
      }
    }
    return null
  }, [conversationId])

  const conversation = conversationQuery ? useQuery(conversationQuery.query, conversationQuery.args) :null

  const conversations = useQuery(api.conversations.getAll)

  return (
    <div className="py-4 flex w-full h-full lg:pe-4 gap-4">
      <div className="lg:block hidden">
        <ItemList title="Conversations">
          {conversations === undefined ? (
            <div className="w-full flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">No conversation found</p>
          ) : (
            conversations.map((conversation) => {
              return conversation.conversation.isGroup ? null : (
                <DMConversation
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  username={conversation.otherMembers?.name ||"" }
                  imageUrl={conversation.otherMembers?.imageUrl ||"" }
                />
              )
            })
          )}
        </ItemList>
      </div>
      {conversation === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : conversation === null ? (
        <p className="w-full h-full flex items-center justify-center">Conversation not found</p>
      ) : (
        <ConverstaionContainer>
          <Header
            name={(conversation.isGroup ? conversation.name : conversation.otherMember?.name) || ""}
            imageUrl={conversation.isGroup ? undefined : conversation.otherMember?.imageUrl}
          />
          <Body />
          <ChatInput />
        </ConverstaionContainer>
      )}
    </div>
  )
}

export default Page
