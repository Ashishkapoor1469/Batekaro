import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { clerkId: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
    
    if (!existingUser) {
      await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
      });
    }
  },
});