import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getUserByClerkId } from "./_utils";
export const create = mutation({
    args: {
        email: v.string(),
    },
    handler: async(ctx,args)=>{
       const identity = await ctx.auth.getUserIdentity()
       if(!identity){
        throw new Error("Not authenticated")
       }
       if(args.email === identity.email){
        throw new Error("You cannot send a request to yourself")
       }
       const currentUser = await getUserByClerkId({
        ctx,
        clerkId: identity.subject,
       })
       
       if(!currentUser){
        throw new ConvexError("User not found")
       }
       const receiver = await ctx.db.query("users").withIndex("by_clerk_id_email",q=>q.eq("email",args.email))
       .unique()
    }
})