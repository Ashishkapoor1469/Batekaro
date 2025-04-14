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
      throw new ConvexError("Not authenticated");
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
    if (!requestAlreadyRecevied) {
      throw new ConvexError("This user has already sent you request");
    }

    const friends1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
      .collect();
    const friends2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
      .collect();

    if (
      friends1.some((friends) => friends.user2 === receiver._id) ||
      friends2.some((friends) => friends.user1 === receiver._id)
    ) {
      throw new ConvexError("You are already friends with this user");
    }

    const request = await ctx.db.insert("requests", {
      sender: currentUser._id,
      receiver: receiver._id,
    });
    return request;
  },
});

export const deny = mutation({
  args: {
    id: v.id("requests"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const request = await ctx.db.get(args.id);

    if (!request || request.receiver !== currentUser._id) {
      throw new ConvexError("Request not found");
    }
    await ctx.db.delete(request._id);
  },
});

export const accept = mutation({
  args: {
    id: v.id("requests"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }
    const request = await ctx.db.get(args.id);
    if (!request || request.receiver !== currentUser._id) {
      throw new ConvexError("Error to accept Request not found");
    }
    const conversationId = await ctx.db.insert("conversations", {
      isGroup:false,
    });
    await ctx.db.insert("friends", {
      user1: currentUser._id,
      user2: request.sender,
      conversationId,
    });
    await ctx.db.insert("conversationMembers",{
      memberId: currentUser._id,
      conversationId,
    })
    await ctx.db.insert("conversationMembers",{
      memberId: request.sender,
      conversationId,
    })
    await ctx.db.delete(request._id);
  },
});
