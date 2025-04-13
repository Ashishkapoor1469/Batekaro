import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"])
  .index("by_clerk_id_email", ["email"])
  
  ,

  requests: defineTable({
    sender: v.id("users"),
   receiver: v.id("users"),
  }).index("by_receiver", ["receiver"])
  .index("by_receiver_sender", ["sender", "receiver"]),

});