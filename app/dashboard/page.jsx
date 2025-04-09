"use client";
import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Loading from "../../components/shared/Loading"
export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  
  // Redirect if not authenticated
  if (!isLoading && !isAuthenticated) {
    redirect("/");
  }
  
  // Try-catch to handle potential errors with the query
  let userData;
  try {
    userData = useQuery(api.users.getUser, 
      user?.id ? { clerkId: user.id } : "skip"
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {userData ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl mb-4">Welcome, {userData.name || userData.email}</h2>
          <p className="text-gray-600">Your account details:</p>
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>User ID:</strong> {userData._id}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-lg shadow bg-orange-50 border border-orange-200">
          <h2 className="text-xl mb-4">Welcome to your dashboard</h2>
          <p className="text-orange-600">
            {user ? `Logged in as: ${user.primaryEmailAddress?.emailAddress}` : "Loading user data..."}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Note: We're having trouble connecting to the database. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}