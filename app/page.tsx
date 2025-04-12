import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="flex min-h-screen w-full justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <div className="shadow-sm p-8 w-96 h-96 border flex flex-col justify-center items-center rounded-3xl">
          {/* sign in */}
          <SignedIn>
            <h2 className="text-xl font-semibold mb-4">
              CHAT WITH OTHER{"'"}S
            </h2>
            <p className="mb-4">You are signed in as</p>
            <Link
              href="/Friends"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Go to Chat
            </Link>
          </SignedIn>
          {/* sign out */}
          <SignedOut>
            <h2 className="text-xl font-semibold mb-4">
              CHAT WITH OTHER{"'"}S
            </h2>
            <p className="mb-4">Please sign in to start Chating...</p>
            <div className="flex mt-6 gap-4">
              <SignInButton mode="modal">
                <Button className="cursor-pointer" size="lg">
                  Sign In
                </Button>
              </SignInButton>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
