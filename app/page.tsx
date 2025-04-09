import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import UserSync from "./components/UserSync";

export default function Home() {
  return (
    <>
    <main className="min-w-screen min-h-screen">
    <div className="flex w-full justify-between items-center px-20">
    <div>
      
    </div>
    <UserSync />
      <SignedIn>
        Welcome! <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
   
    </main>
     
    </>
  );
}