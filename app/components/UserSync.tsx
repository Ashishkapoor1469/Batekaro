"use client";

import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";

export default function UserSync() {
  const { user } = useUser();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (user) {
      createUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
      });
    }
  }, [user, createUser]);

  return null;
}