import { SignInButton, SignedOut} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
export default function Nav() {
    return(
        <>
        <nav className="flex justify-between fixed w-screen md:p-9 p-3">
        <SignedOut>
          <h1 className="text-2xl font-bold">Welcome to ChatApp</h1>
          </SignedOut>
          <div className=" flex gap-4 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <Button className=" cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
        
        </>
    )
}