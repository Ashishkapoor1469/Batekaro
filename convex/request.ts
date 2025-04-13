import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getUserByClerkId } from "./_utils";
export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    if (args.email === identity.email) {
      throw new ConvexError("You cannot send a request to yourself");
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }
    const receiver = await ctx.db
      .query("users")
      .withIndex("by_clerk_id_email", (q) => q.eq("email", args.email))
      .unique();
    if (!receiver) {
      throw new ConvexError("user could not found");
    }
    const requestAlreadySent = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("sender", currentUser._id).eq("receiver", receiver._id)
      );

    if (!requestAlreadySent) {
      throw new ConvexError("Request already sent");
    }
    const requestAlreadyRecevied = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("sender", receiver._id).eq("receiver", currentUser._id)
      );
      if(!requestAlreadyRecevied){
        throw new  ConvexError("This user has already sent you request")
      }
    const request = await ctx.db.insert("requests",{
      sender:currentUser._id,
      receiver:receiver._id
    });
    return request;
  },
});
