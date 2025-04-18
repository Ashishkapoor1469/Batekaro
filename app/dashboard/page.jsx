"use client";

import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  if (!isLoading && !isAuthenticated) {
    redirect("/");
  }

  const userData = useQuery(
    api.user.getUser,
    user?.id ? { clerkId: user.id } : "skip"
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-start p-6 bg-muted transition-colors">
      <Card className="w-full max-w-4xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {userData ? (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={userData.imageUrl || "/default-avatar.png"} alt="User Avatar" />
                <AvatarFallback>{userData.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">
                  Welcome, {userData.name || "User"}
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>User ID:</strong> {userData._id}</p>
                  <p><strong>Role:</strong> {userData.role || "Member"}</p>
                  <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Welcome to your dashboard</h2>
              <p>
                {user
                  ? `Logged in as: ${user.primaryEmailAddress?.emailAddress}`
                  : "Loading user data..."}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                We're having trouble connecting to your user data. Please try again later.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
