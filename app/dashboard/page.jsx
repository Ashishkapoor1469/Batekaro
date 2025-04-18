"use client";

import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";

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
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

        {userData ? (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={userData.imageUrl || "/default-avatar.png"}
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-gray-700">
                Welcome, {userData.name || "User"}
              </h2>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>User ID:</strong> {userData._id}</p>
                <p><strong>Role:</strong> {userData.role || "Member"}</p>
                <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-lg bg-orange-50 border border-orange-200 text-orange-700">
            <h2 className="text-xl font-semibold mb-2">Welcome to your dashboard</h2>
            <p>
              {user
                ? `Logged in as: ${user.primaryEmailAddress?.emailAddress}`
                : "Loading user data..."}
            </p>
            <p className="mt-4 text-sm text-orange-600">
              We're having trouble connecting to your user data. Please try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
