import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-4xl">
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">My App</h1>
          <div>
            <SignedIn>
              <UserButton  />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
        
        <div className="p-8 border rounded-lg shadow-sm">
          <SignedIn>
            <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard!</h2>
            <p className="mb-4">You are signed in. This content is only visible to authenticated users.</p>
          </SignedIn>
          <SignedOut>
            <h2 className="text-xl font-semibold mb-4">Welcome to My App</h2>
            <p className="mb-4">Please sign in to access your dashboard.</p>
            <div className="flex gap-4">
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Sign In
                </button>
              </SignInButton>
              <Link href="/sign-up" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}