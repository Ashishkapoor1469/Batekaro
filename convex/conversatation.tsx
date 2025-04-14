import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const getAll = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("user not authenticated");
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new ConvexError("user not found");
    }
    const converstaionMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId", (q) => q.eq("memberId", currentUser._id))
      .collect();

      const conversations = await Promise.all(converstaionMemberships?.map(async(membership)=>{
        const conversation = await ctx.db.get(membership.conversationId);

        if(!conversation){
            throw new ConvexError("conversation not found")
        }
        return conversation;
      }))


      const conversationWithDetails = await Promise.all(conversations.map(async(conversation)=>{
        const allconversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId",q=>q.eq("conversationId",conversation?._id)).collect();
        if(conversation.isGroup){
            return {conversation}
        }else{
            const otherMemberships = allconversationMemberships.filter((membership)=>membership.memberId !== currentUser._id)[0];

            const otherMembers = await ctx.db.get(otherMemberships.memberId);

            return {conversation,otherMembers}
        }

      }))

      return conversationWithDetails;
  },
});
